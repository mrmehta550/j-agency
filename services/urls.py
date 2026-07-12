from django.urls import path
from . import views

urlpatterns = [
    path("web-dev", views.webdev, name="webdev"),
    path("ui/ux", views.uiux, name="uiux"),
    path("ecommerce/", views.ecom, name="ecom"),
    path("ai-solution/", views.ai, name="ai"),
    path("seo-optimization/", views.seo, name="seo"),
    path("digital-marketing/", views.digital, name="dm"),
    path("maintenance/", views.maintenance, name="maint"),
    path("logo-design/", views.logo, name="logo"),
    path("video-editing/", views.video, name="video"),
]