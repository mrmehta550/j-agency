from django.urls import path
from . import views

urlpatterns = [
    path("blogs/",views.blogs,name="blogs"),
    path("blogs/<slug:slug>/",views.blog_detail,name="blog_detail"),
]