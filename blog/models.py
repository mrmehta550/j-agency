from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
import math


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    icon = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Blog(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="blogs"
    )

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="blogs",
        null=True,
        blank=True,
    )

    title = models.CharField(max_length=300)

    slug = models.SlugField(unique=True, blank=True)

    image = models.ImageField(
        upload_to="blogs/",
        blank=True,
        null=True
    )

    short_description = models.TextField()

    content = models.TextField()

    views = models.PositiveIntegerField(default=0)

    featured = models.BooleanField(default=False)

    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    @property
    def read_time(self):
        words = len(self.content.split())
        return max(1, math.ceil(words / 200))

    def __str__(self):
        return self.title