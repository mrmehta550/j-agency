from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include
from django.views.generic import TemplateView

from blog.sitemaps import BlogSitemap, StaticViewSitemap

# ── Admin Customisation ───────────────────────────────────────────────────────
admin.site.site_header = "M Agency Admin"
admin.site.site_title = "M Agency"
admin.site.index_title = "Dashboard"

# ── Sitemap Registry ──────────────────────────────────────────────────────────
sitemaps = {
    'blog': BlogSitemap,
    'static': StaticViewSitemap,
}

urlpatterns = [
    # Admin at configurable path (set DJANGO_ADMIN_URL in environment)
    # Default: admin/ — change to a secret path in production
    path(settings.ADMIN_URL, admin.site.urls),

    # Core apps
    path('', include('home.urls')),
    path('services/', include('services.urls')),
    path('casestudy/', include('casestudy.urls')),

    # SEO
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path('robots.txt', TemplateView.as_view(
        template_name='robots.txt',
        content_type='text/plain',
    )),
]

# Serve media & static files during development (DEBUG=True only)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
