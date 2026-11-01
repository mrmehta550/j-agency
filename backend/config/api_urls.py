from django.urls import path
from . import api_views

urlpatterns = [
    path('categories/', api_views.get_categories, name='api_categories'),
    path('blogs/', api_views.get_blogs, name='api_blogs'),
    path('blogs/<slug:slug>/', api_views.get_blog_detail, name='api_blog_detail'),
    path('case-studies/', api_views.get_case_studies, name='api_case_studies'),
    path('case-studies/<slug:slug>/', api_views.get_case_study_detail, name='api_case_study_detail'),
    path('contact/', api_views.submit_contact, name='api_contact'),
    path('booking/', api_views.submit_booking, name='api_booking'),
]
