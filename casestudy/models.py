from django.db import models
from django.utils.text import slugify

class CaseStudy(models.Model):

    CATEGORY_CHOICES = (

        ("UI/UX Design","UI/UX Design"),

        ("Web Design","Web Design"),
        
        ("SEO","SEO"),

        ("Mobile App","Mobile App"),

        ("Branding","Branding"),

    )

    title = models.CharField(max_length=250)

    slug = models.SlugField(unique=True, blank=True)

    category = models.CharField(

        max_length=100,

        choices=CATEGORY_CHOICES

    )

    image = models.ImageField(

        upload_to="case_study/"

    )
    tags = models.CharField(max_length=250,blank=True,help_text="Comma separated tags")

    short_description = models.TextField()

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    is_featured = models.BooleanField(default=False)

    class Meta:

        ordering = ["-created_at"]

    def save(self,*args,**kwargs):

        if not self.slug:

            self.slug = slugify(self.title)

        super().save(*args,**kwargs)

    def __str__(self):

        return self.title

    @property
    def tag_list(self):

        return [

            tag.strip()

            for tag in self.tags.split(",")

            if tag.strip()

        ]