from django.contrib import admin
from .models import CaseStudy

@admin.register(CaseStudy)

class CaseStudyAdmin(admin.ModelAdmin):

    list_display = (

        "title",

        "category",

        "created_at"

    )

    prepopulated_fields = {

        "slug":("title",)

    }

    search_fields = (

        "title",

        "category"

    )

    list_filter = (

        "category",

    )