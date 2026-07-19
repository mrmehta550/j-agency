from django.urls import path
from . import views

urlpatterns = [
    # FIXED: added trailing slashes (consistent with Django APPEND_SLASH=True,
    # avoids extra redirect round-trips).
    path("web-dev/", views.webdev, name="webdev"),

    # FIXED: was "ui/ux" — the literal slash inside the path can confuse
    # Django's URL resolver. Renamed to "ui-ux/" (hyphen, SEO-friendly).
    path("ui-ux/", views.uiux, name="uiux"),

    path("ecommerce/", views.ecom, name="ecom"),
    path("ai-solution/", views.ai, name="ai"),
    path("seo-optimization/", views.seo, name="seo"),
    path("digital-marketing/", views.digital, name="dm"),
    path("maintenance/", views.maintenance, name="maint"),
    path("logo-design/", views.logo, name="logo"),
    path("video-editing/", views.video, name="video"),
]