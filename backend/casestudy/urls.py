from django.urls import path

from . import views

urlpatterns=[

    path(

        "case-study/",

        views.case_study,

        name="case_study"

    ),

    path(

        "case-study/<slug:slug>/",

        views.case_study_detail,

        name="case_study_detail"

    ),

]