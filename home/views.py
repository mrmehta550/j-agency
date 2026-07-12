from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.db.models import Q, Sum
from django.core.paginator import Paginator
from datetime import timedelta
from .models import Contact
from blog.models import Blog, Category

from openpyxl import Workbook, load_workbook
import os


def home(request):
    return render(request, "home/index.html")


def price(request):
    return render(request, "home/pricing.html")


def about(request):
    return render(request, "home/about.html")


def contact(request):

    if request.method == "POST":

        full_name = request.POST.get("full_name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        company = request.POST.get("company")
        service = request.POST.get("service")
        budget = request.POST.get("budget")
        message = request.POST.get("message")

        # ==========================
        # PREVENT DUPLICATE REQUEST
        # ==========================

        duplicate = Contact.objects.filter(
            email=email,
            message=message,
            created_at__gte=timezone.now() - timedelta(seconds=30)
        ).exists()

        if duplicate:
            messages.warning(
                request,
                "Your previous request is already being processed. Please wait 30 seconds before submitting again."
            )
            return redirect("contact")

        # ==========================
        # SAVE TO MYSQL
        # ==========================

        contact = Contact.objects.create(
            full_name=full_name,
            email=email,
            phone=phone,
            company=company,
            service=service,
            budget=budget,
            message=message,
        )

        # ==========================
        # SAVE TO EXCEL
        # ==========================

        if not os.path.exists(settings.MEDIA_ROOT):
            os.makedirs(settings.MEDIA_ROOT)

        excel_file = os.path.join(settings.MEDIA_ROOT, "contacts.xlsx")

        if os.path.exists(excel_file):
            wb = load_workbook(excel_file)
            ws = wb.active
        else:
            wb = Workbook()
            ws = wb.active

            ws.append([
                "Name",
                "Email",
                "Phone",
                "Company",
                "Service",
                "Budget",
                "Message",
                "Created At",
            ])

        ws.append([
            contact.full_name,
            contact.email,
            contact.phone,
            contact.company,
            contact.service,
            contact.budget,
            contact.message,
            contact.created_at.strftime("%d-%m-%Y %H:%M:%S"),
        ])

        wb.save(excel_file)

        # ==========================
        # ADMIN EMAIL
        # ==========================

        admin_subject = f"🚀 New Contact Request - {full_name}"

        admin_message = f"""
🚀 NEW CONTACT REQUEST

━━━━━━━━━━━━━━━━━━━━━━

👤 Name : {full_name}

📧 Email : {email}

📱 Phone : {phone if phone else "Not Provided"}

🏢 Company : {company if company else "Not Provided"}

💼 Service : {service}

💰 Budget : {budget}

📝 Project Details

{message if message else "No message provided"}

━━━━━━━━━━━━━━━━━━━━━━
"""

        send_mail(
            subject=admin_subject,
            message=admin_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        # ==========================
        # CLIENT EMAIL
        # ==========================

        client_subject = "✅ We Received Your Request | M Agency"

        client_message = f"""
Hi {full_name},

Thank you for contacting M Agency.

We have successfully received your request.

━━━━━━━━━━━━━━━━━━━━━━

YOUR SUBMISSION

👤 Name : {full_name}

📧 Email : {email}

📱 Phone : {phone if phone else "Not Provided"}

🏢 Company : {company if company else "Not Provided"}

💼 Service : {service}

💰 Budget : {budget}

📝 Project Details

{message if message else "No message provided"}

━━━━━━━━━━━━━━━━━━━━━━

Our team will review your project and contact you within 24 hours.

Thank you for choosing M Agency.

Regards,

M Agency
📧 magency550@gmail.com
"""

        send_mail(
            subject=client_subject,
            message=client_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )

        messages.success(
            request,
            "Thank you! Your request has been submitted successfully."
        )

        return redirect("contact")

    return render(request, "home/contact.html")


def booking(request):

    if request.method == "POST":

        Contact.objects.create(

            full_name=request.POST.get("full_name"),

            company=request.POST.get("company"),

            email=request.POST.get("email"),

            phone=request.POST.get("phone"),

            service=request.POST.get("service"),

            budget=request.POST.get("budget"),

            message=request.POST.get("project_details"),

            project_details=request.POST.get("project_details"),

            preferred_date=request.POST.get("preferred_date"),

            preferred_time=request.POST.get("preferred_time"),

        )

        messages.success(
            request,
            "Booking submitted successfully."
        )

        return redirect("booking")

    return render(
        request,
        "home/booking.html"
    )


def blog(request):
    # Base Query
    blogs = Blog.objects.filter(status=True).order_by("-created_at")

    # Search
    query = request.GET.get("search")
    if query:
        blogs = blogs.filter(
            Q(title__icontains=query) |
            Q(short_description__icontains=query) |
            Q(content__icontains=query)
        )

    # Category Filter
    category = request.GET.get("category")
    if category:
        blogs = blogs.filter(category__slug=category)

    # Pagination
    paginator = Paginator(blogs, 6)
    page = request.GET.get("page")
    blogs = paginator.get_page(page)

    # Sidebar Data
    featured_blog = Blog.objects.filter(
        status=True,
        featured=True
    ).first()

    latest_posts = Blog.objects.filter(
        status=True
    ).order_by("-created_at")[:5]

    popular_posts = Blog.objects.filter(
        status=True
    ).order_by("-views")[:5]

    top_blogs = Blog.objects.filter(status=True).order_by("-views")[:3]

    categories = Category.objects.all()

    total_views = Blog.objects.filter(status=True).aggregate(total=Sum("views"))["total"] or 0

    # Context
    context = {
        "blogs": blogs,
        "featured_blog": featured_blog,
        "latest_posts": latest_posts,
        "popular_posts": popular_posts,
        "top_blogs": top_blogs,
        "categories": categories,
        "total_blogs": Blog.objects.filter(status=True).count(),
        "total_views": total_views,
        "total_categories": categories.count(),
    }

    return render(request, "home/blog.html", context)


def blog_detail(request, slug):
    from django.shortcuts import get_object_or_404
    
    blog = get_object_or_404(Blog, slug=slug)

    blog.views += 1
    blog.save()

    latest_posts = Blog.objects.filter(
        status=True
    ).order_by("-created_at")[:5]

    previous_blog = Blog.objects.filter(
        status=True,
        created_at__gt=blog.created_at,
    ).order_by("created_at").first()

    next_blog = Blog.objects.filter(
        status=True,
        created_at__lt=blog.created_at,
    ).order_by("-created_at").first()

    related = Blog.objects.filter(
        category=blog.category,
        status=True
    ).exclude(id=blog.id)[:3]

    context = {
        "blog": blog,
        "latest": latest_posts,
        "previous_blog": previous_blog,
        "next_blog": next_blog,
        "related": related,
        "categories": Category.objects.all(),
    }

    return render(request, "blog/blog_detail.html", context)


def tech(request):
    return render(request, "home/tech.html")


def privacy(request):
    return render(request, "home/privacy.html")


def term(request):
    return render(request, "home/terms.html")