from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("price/", views.price, name="price"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("booking/", views.booking, name="booking"),
    path("blogs/", views.blog, name="blog"),
    path("blog/<slug:slug>/", views.blog_detail, name="blog_detail"),
    path("technology/", views.tech, name="tech"),
    path("privacy/", views.privacy, name="privacy"),

    # FIXED: was "terms & conditions/" — space + & are not valid URL characters.
    # Browsers URL-encode them as %20 and %26, causing a permanent 404.
    # All {% url 'term' %} template tags will automatically use the new path.
    path("terms-and-conditions/", views.term, name="term"),

    path("cloud/", views.cloud, name="cloud"),
    path("app/", views.app, name="app"),
]