import logging
from datetime import timedelta
from django.conf import settings
from django.core.paginator import Paginator
from django.db import transaction, IntegrityError
from django.db.models import F, Q, Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from blog.models import Blog, Category
from casestudy.models import CaseStudy
from home.forms import ContactForm, BookingForm
from home.models import Contact, ContactSubmissionLock
from home.views import (
    CONTACT_DUPLICATE_WINDOW,
    BOOKING_DUPLICATE_WINDOW,
    _build_contact_fingerprint,
    _build_booking_fingerprint,
    _cleanup_old_submission_locks,
    _save_contact_to_excel,
    _send_contact_emails,
    _send_booking_emails,
)
from .serializers import (
    CategorySerializer,
    BlogListSerializer,
    BlogDetailSerializer,
    CaseStudySerializer,
)

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_categories(request):
    categories = Category.objects.annotate(
        blog_count=Count('blogs', filter=Q(blogs__status=True))
    ).order_by('name')
    serializer = CategorySerializer(categories, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_blogs(request):
    blogs_qs = (
        Blog.objects
        .filter(status=True)
        .select_related('category', 'author')
        .order_by('-created_at')
    )

    query = request.GET.get('q') or request.GET.get('search')
    if query:
        blogs_qs = blogs_qs.filter(
            Q(title__icontains=query) |
            Q(short_description__icontains=query) |
            Q(content__icontains=query)
        )

    category_slug = request.GET.get('category')
    if category_slug and category_slug != 'all':
        blogs_qs = blogs_qs.filter(category__slug=category_slug)

    page_number = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 6)
    try:
        page_size = int(page_size)
    except (ValueError, TypeError):
        page_size = 6

    paginator = Paginator(blogs_qs, page_size)
    page_obj = paginator.get_page(page_number)

    # Extra sidebar/showcase data
    featured_blog = (
        Blog.objects
        .filter(status=True, featured=True)
        .select_related('category', 'author')
        .first()
    )
    latest_posts = (
        Blog.objects
        .filter(status=True)
        .select_related('category', 'author')
        .order_by('-created_at')[:5]
    )
    popular_posts = (
        Blog.objects
        .filter(status=True)
        .select_related('category', 'author')
        .order_by('-views')[:5]
    )
    top_blogs = (
        Blog.objects
        .filter(status=True)
        .select_related('category', 'author')
        .order_by('-views', '-created_at')[:3]
    )

    return Response({
        'count': paginator.count,
        'num_pages': paginator.num_pages,
        'current_page': page_obj.number,
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'results': BlogListSerializer(page_obj.object_list, many=True, context={'request': request}).data,
        'featured_blog': BlogListSerializer(featured_blog, context={'request': request}).data if featured_blog else None,
        'latest_posts': BlogListSerializer(latest_posts, many=True, context={'request': request}).data,
        'popular_posts': BlogListSerializer(popular_posts, many=True, context={'request': request}).data,
        'top_blogs': BlogListSerializer(top_blogs, many=True, context={'request': request}).data,
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_blog_detail(request, slug):
    blog = get_object_or_404(
        Blog.objects.select_related('author', 'category'),
        slug=slug,
        status=True,
    )

    # Atomic view count increment
    Blog.objects.filter(pk=blog.pk).update(views=F('views') + 1)
    blog.refresh_from_db(fields=['views'])

    latest_posts = (
        Blog.objects
        .filter(status=True)
        .select_related('category', 'author')
        .order_by('-created_at')[:5]
    )

    previous_blog = (
        Blog.objects
        .filter(status=True, created_at__gt=blog.created_at)
        .order_by('created_at')
        .first()
    )

    next_blog = (
        Blog.objects
        .filter(status=True, created_at__lt=blog.created_at)
        .order_by('-created_at')
        .first()
    )

    related = (
        Blog.objects
        .filter(category=blog.category, status=True)
        .exclude(id=blog.id)
        .select_related('category', 'author')[:3]
    )

    return Response({
        'blog': BlogDetailSerializer(blog, context={'request': request}).data,
        'latest_posts': BlogListSerializer(latest_posts, many=True, context={'request': request}).data,
        'previous_blog': {
            'title': previous_blog.title,
            'slug': previous_blog.slug,
        } if previous_blog else None,
        'next_blog': {
            'title': next_blog.title,
            'slug': next_blog.slug,
        } if next_blog else None,
        'related': BlogListSerializer(related, many=True, context={'request': request}).data,
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_case_studies(request):
    case_studies = CaseStudy.objects.all()
    category = request.GET.get('category')
    if category:
        case_studies = case_studies.filter(category__iexact=category)

    featured_only = request.GET.get('featured')
    if featured_only == 'true':
        case_studies = case_studies.filter(is_featured=True)

    limit = request.GET.get('limit')
    if limit:
        try:
            case_studies = case_studies[:int(limit)]
        except (ValueError, TypeError):
            pass

    serializer = CaseStudySerializer(case_studies, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_case_study_detail(request, slug):
    case_study = get_object_or_404(CaseStudy, slug=slug)
    related = CaseStudy.objects.exclude(id=case_study.id)[:3]

    return Response({
        'case_study': CaseStudySerializer(case_study, context={'request': request}).data,
        'related': CaseStudySerializer(related, many=True, context={'request': request}).data,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    form = ContactForm(request.data)

    if not form.is_valid():
        return Response({
            'success': False,
            'errors': form.errors,
            'message': 'Please correct the highlighted errors.',
        }, status=status.HTTP_400_BAD_REQUEST)

    cd = form.cleaned_data
    full_name = cd['full_name']
    email     = cd['email']
    phone     = cd['phone']
    company   = cd.get('company', '')
    service   = cd['service']
    budget    = cd['budget']
    message   = cd['message']

    submission_fingerprint = _build_contact_fingerprint(
        email=email,
        phone=phone,
        service=service,
        message=message,
    )

    try:
        with transaction.atomic():
            duplicate_cutoff = timezone.now() - CONTACT_DUPLICATE_WINDOW

            is_duplicate = (
                ContactSubmissionLock.objects
                .select_for_update()
                .filter(
                    submission_fingerprint=submission_fingerprint,
                    last_submitted_at__gte=duplicate_cutoff,
                )
                .exists()
            )

            if is_duplicate:
                return Response({
                    'success': False,
                    'message': 'You have already submitted this request recently. Please wait a couple of minutes before trying again.',
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)

            ContactSubmissionLock.objects.update_or_create(
                submission_fingerprint=submission_fingerprint,
                defaults={'last_submitted_at': timezone.now()},
            )

            contact = Contact.objects.create(
                full_name=full_name,
                email=email,
                phone=phone,
                company=company,
                service=service,
                budget=budget,
                message=message,
                status='Pending',
            )

    except IntegrityError:
        logger.warning(
            'Concurrent duplicate contact detected for fingerprint %s',
            submission_fingerprint,
        )
        return Response({
            'success': False,
            'message': 'You have already submitted this request recently. Please wait a couple of minutes.',
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)
    except Exception as exc:
        logger.error('Failed to save contact submission: %s', exc, exc_info=True)
        return Response({
            'success': False,
            'message': 'A server error occurred while processing your request. Please try again later.',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Background / side-effect tasks
    try:
        _save_contact_to_excel(contact)
    except Exception as exc:
        logger.error('Excel write error: %s', exc, exc_info=True)

    try:
        _send_contact_emails(contact)
    except Exception as exc:
        logger.error('Email sending error: %s', exc, exc_info=True)

    try:
        _cleanup_old_submission_locks()
    except Exception:
        pass

    return Response({
        'success': True,
        'message': 'Thank you! Your message has been sent successfully. Our team will contact you shortly.',
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_booking(request):
    form = BookingForm(request.data)

    if not form.is_valid():
        return Response({
            'success': False,
            'errors': form.errors,
            'message': 'Please correct the highlighted errors.',
        }, status=status.HTTP_400_BAD_REQUEST)

    cd = form.cleaned_data
    email          = cd['email']
    phone          = cd['phone']
    service        = cd['service']
    preferred_date = cd.get('preferred_date')
    preferred_time = cd.get('preferred_time')

    booking_fingerprint = _build_booking_fingerprint(
        email=email,
        phone=phone,
        service=service,
        preferred_date=preferred_date,
        preferred_time=preferred_time,
    )

    try:
        with transaction.atomic():
            duplicate_cutoff = timezone.now() - BOOKING_DUPLICATE_WINDOW

            is_duplicate = (
                ContactSubmissionLock.objects
                .select_for_update()
                .filter(
                    submission_fingerprint=booking_fingerprint,
                    last_submitted_at__gte=duplicate_cutoff,
                )
                .exists()
            )

            if is_duplicate:
                return Response({
                    'success': False,
                    'message': 'You already have an identical booking request pending. Please allow 5 minutes before submitting again.',
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)

            ContactSubmissionLock.objects.update_or_create(
                submission_fingerprint=booking_fingerprint,
                defaults={'last_submitted_at': timezone.now()},
            )

            booking = form.save()

    except IntegrityError:
        logger.warning(
            'Concurrent duplicate booking detected for fingerprint %s',
            booking_fingerprint,
        )
        return Response({
            'success': False,
            'message': 'You already have an identical booking request pending.',
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)
    except Exception as exc:
        logger.error('Failed to save booking submission: %s', exc, exc_info=True)
        return Response({
            'success': False,
            'message': 'A server error occurred while processing your booking. Please try again later.',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        _save_contact_to_excel(booking)
    except Exception as exc:
        logger.error('Excel write error: %s', exc, exc_info=True)

    try:
        _send_booking_emails(booking)
    except Exception as exc:
        logger.error('Email sending error: %s', exc, exc_info=True)

    try:
        _cleanup_old_submission_locks()
    except Exception:
        pass

    return Response({
        'success': True,
        'message': 'Your consultation booking has been scheduled successfully! We will reach out shortly.',
    }, status=status.HTTP_201_CREATED)
