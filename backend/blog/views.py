from django.db.models import F, Q
from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404

from .models import Blog, Category


def blogs(request):
    blogs_qs = Blog.objects.filter(status=True).order_by("-created_at")

    # Search
    query = request.GET.get("q")
    if query:
        blogs_qs = blogs_qs.filter(
            Q(title__icontains=query) |
            Q(short_description__icontains=query) |
            Q(content__icontains=query)
        )

    # Category filter
    category = request.GET.get("category")
    if category:
        blogs_qs = blogs_qs.filter(category__slug=category)

    # Pagination
    paginator = Paginator(blogs_qs, 6)
    page = request.GET.get("page")
    blogs_page = paginator.get_page(page)

    # Sidebar — select_related() avoids N+1 on category FK
    featured_blog = Blog.objects.filter(status=True, featured=True).select_related('category').first()
    latest  = Blog.objects.filter(status=True).order_by("-created_at").select_related('category')[:5]
    popular = Blog.objects.filter(status=True).order_by("-views").select_related('category')[:5]
    top_blogs = Blog.objects.filter(status=True).order_by('-views').select_related('category')[:3]
    categories = Category.objects.all()

    context = {
        "blogs":         blogs_page,
        "featured_blog": featured_blog,
        "latest":        latest,
        "popular":       popular,
        "top_blogs":     top_blogs,
        "categories":    categories,
        "total_blogs":   paginator.count,   # reuse already-computed count
        "total_readers": "20K+",
    }

    return render(request, "home/blog.html", context)


def blog_detail(request, slug):
    """
    View counter fix: use atomic F() expression instead of blog.save().

    BEFORE (buggy):
        blog.views += 1
        blog.save()   ← race condition + updates ALL columns + sets updated_at

    AFTER (fixed):
        Blog.objects.filter(pk=blog.pk).update(views=F('views') + 1)
        ← one atomic SQL UPDATE, no race condition, doesn't touch updated_at
    """
    blog = get_object_or_404(
        Blog.objects.select_related('author', 'category'),
        slug=slug,
        status=True,
    )

    # Atomic view increment — no race condition
    Blog.objects.filter(pk=blog.pk).update(views=F('views') + 1)
    blog.views += 1   # keep local object in sync for template rendering

    related = Blog.objects.filter(
        category=blog.category,
        status=True,
    ).exclude(id=blog.id).select_related('category')[:3]

    context = {
        "blog":       blog,
        "related":    related,
        "categories": Category.objects.all(),
    }

    return render(request, "blog/blog_detail.html", context)
