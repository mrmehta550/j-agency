from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.core.paginator import Paginator

from .models import Blog, Category


def blogs(request):

    # Base Query
    blogs = Blog.objects.filter(status=True).order_by("-created_at")

    # Search
    query = request.GET.get("q")
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

    latest = Blog.objects.filter(
        status=True
    ).order_by("-created_at")[:5]

    popular = Blog.objects.filter(
        status=True
    ).order_by("-views")[:5]
    top_blogs = Blog.objects.filter(status=True).order_by('-views')[:3]
    categories = Category.objects.all()

    # Context
    context = {
        "blogs": blogs,
        "featured_blog": featured_blog,
        "latest": latest,
        "popular": popular,
        "top_blogs": top_blogs,
        "categories": categories,
        "total_blogs": Blog.objects.filter(status=True).count(),
        "total_readers": "20K+",
    }

    return render(request, "home/blog.html", context)


def blog_detail(request, slug):

    blog = get_object_or_404(Blog, slug=slug)

    blog.views += 1
    blog.save()

    related = Blog.objects.filter(
        category=blog.category,
        status=True
    ).exclude(id=blog.id)[:3]

    context = {
        "blog": blog,
        "related": related,
        "categories": Category.objects.all(),
    }

    return render(request, "blog/blog_detail.html", context)
