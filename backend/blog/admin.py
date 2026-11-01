from django.contrib import admin
from .models import Category, Blog


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "slug",
    )

    search_fields = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "author",
        "category",
        "featured",
        "status",
        "views",
        "created_at",
    )

    list_filter = (
        "category",
        "featured",
        "status",
    )

    search_fields = (
        "title",
        "short_description",
        "content",
    )

    list_editable = (
        "featured",
        "status",
    )

    readonly_fields = (
        "views",
        "created_at",
        "updated_at",
        "read_time",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    ordering = (
        "-created_at",
    )

    list_per_page = 10