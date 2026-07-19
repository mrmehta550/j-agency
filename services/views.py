from django.shortcuts import render
from casestudy.models import CaseStudy

def webdev(request):
    return render(request, "services/web.html")

def uiux(request):
    case_studies = CaseStudy.objects.filter(category="UI/UX Design").order_by("-created_at")[:3]
    context = {"case_studies": case_studies,}
    return render(request, "services/uiux.html",context)

def ecom(request):
    return render(request, "services/ecom.html")

def seo(request):
    case_studies = CaseStudy.objects.filter(category="SEO").order_by("-created_at")[:3]
    context = {"seo_case_studies": case_studies,}
    return render(request, "services/seo.html",context)

def ai(request):
    return render(request, "services/aisol.html")

def digital(request):
    return render(request, "services/dm.html")

def maintenance(request):
    return render(request, "services/maint.html")

def logo(request):
    return render(request, "services/logo.html")

def video(request):
    return render(request, "services/video.html")
