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
        related_name="blogs",
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
        null=True,
    )

    short_description = models.TextField()

    content = models.TextField()

    # db_index=True: ORDER BY views DESC is used for "popular posts".
    # Without an index, every popularity sort is a full table scan.
    views = models.PositiveIntegerField(default=0, db_index=True)

    featured = models.BooleanField(default=False)

    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            # Composite index for the most common query:
            # Blog.objects.filter(status=True).order_by('-created_at')
            models.Index(fields=['status', '-created_at'], name='blog_status_created_idx'),
            # Index for featured+status filter
            models.Index(fields=['status', 'featured'], name='blog_status_featured_idx'),
        ]

    def save(self, *args, **kwargs):
        """
        Generate a unique slug from the title on first save.

        FIXED: previously only checked `if not self.slug`, but if a blog is
        deleted and a new one with the same title is created, slugify() would
        produce the same slug, causing an IntegrityError crash.

        Now appends a counter suffix until a unique slug is found.
        """
        if not self.slug:
            base = slugify(self.title) or 'post'
            slug = base
            counter = 1
            # Keep trying slug-1, slug-2, slug-3... until unique
            while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def read_time(self):
        words = len(self.content.split())
        return max(1, math.ceil(words / 200))

    def __str__(self):
        return self.title