"""
blog/sitemaps.py

Django sitemaps for SEO — tells Google which pages exist and when they changed.
Both BlogSitemap and StaticViewSitemap are imported by config/urls.py.
"""

from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import Blog


class BlogSitemap(Sitemap):
    """
    One sitemap entry per published blog post.
    Google uses lastmod to know when to re-crawl.
    """
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return Blog.objects.filter(status=True).order_by('-updated_at')

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        # Matches the home/urls.py pattern: blog/<slug:slug>/
        return f'/blog/{obj.slug}/'


class StaticViewSitemap(Sitemap):
    """
    Sitemap entries for static pages (home, about, contact, etc.)
    """
    changefreq = 'monthly'
    priority = 0.6

    def items(self):
        return [
            'home', 'about', 'contact', 'booking',
            'blog', 'price', 'tech', 'privacy', 'term',
        ]

    def location(self, item):
        return reverse(item)
