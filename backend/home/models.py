from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Profile"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Contact(models.Model):

    SERVICE_CHOICES = [
        ("Web Development", "Web Development"),
        ("Mobile App Development", "Mobile App Development"),
        ("AI Development", "AI Development"),
        ("UI/UX Design", "UI/UX Design"),
        ("Digital Marketing", "Digital Marketing"),
        ("SEO Optimization", "SEO Optimization"),
        ("Cloud Solutions", "Cloud Solutions"),
        ("Cyber Security", "Cyber Security"),
        ("Another Service", "Another Service"),
    ]

    BUDGET_CHOICES = [
    ("Under ₹25,000", "Under ₹25,000"),   
    ("10k-20k", "₹10,000 - ₹20,000"),
    ("20k-50k", "₹20,000 - ₹50,000"),
    ("50k-1L", "₹50,000 - ₹1,00,000"),
    ("1L-5L", "₹1L - ₹5L"),
    ("5L+", "₹5L+"),
]
    STATUS_CHOICES = [

        ("Pending", "Pending"),
        ("Contacted", "Contacted"),
        ("Meeting Scheduled", "Meeting Scheduled"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),

    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company = models.CharField(max_length=200, blank=True)
    service = models.CharField(max_length=100, choices=SERVICE_CHOICES)
    budget = models.CharField(max_length=50, choices=BUDGET_CHOICES)
    # FIXED: blank=True, default='' — the BookingForm uses 'project_details'
    # instead of 'message'. Without this, every booking form.save() raises
    # IntegrityError in MySQL strict mode (empty string on required column).
    message = models.TextField(blank=True, default='')
    # FIXED: blank=True, default='' — the ContactForm uses 'message' not
    # 'project_details'. Without this, contact form.save() (Contact.objects.create)
    # would fail to set project_details, violating NOT NULL on MySQL.
    project_details = models.TextField(blank=True, default='')
    preferred_date = models.DateField(null=True,
    blank=True)
    preferred_time = models.TimeField(null=True,
    blank=True)
    status = models.CharField(max_length=30,choices=STATUS_CHOICES,default="Pending")
    updated_at = models.DateTimeField(
        auto_now=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return self.full_name


class ContactSubmissionLock(models.Model):
    submission_fingerprint = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
    )
    last_submitted_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-last_submitted_at"]

    def __str__(self):
        return self.submission_fingerprint