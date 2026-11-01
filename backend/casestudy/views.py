from django.shortcuts import render,get_object_or_404

from .models import CaseStudy


def case_study(request):

    case_studies = CaseStudy.objects.all()

    return render(

        request,

        "home/case_study.html",

        {

            "case_studies":case_studies

        }

    )


def case_study_detail(request,slug):

    case_study = get_object_or_404(

        CaseStudy,

        slug=slug

    )

    related = CaseStudy.objects.exclude(

        id=case_study.id

    )[:3]

    return render(

        request,

        "home/case_study_detail.html",

        {

            "case_study":case_study,

            "related":related

        }

    )