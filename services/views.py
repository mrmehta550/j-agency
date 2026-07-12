from django.shortcuts import render

def webdev(request):
    return render(request, "services/web.html")

def uiux(request):
    return render(request, "services/uiux.html")

def ecom(request):
    return render(request, "services/ecom.html")

def seo(request):
    return render(request, "services/seo.html")

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
