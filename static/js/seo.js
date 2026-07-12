/*=========================================
SEO FAQ ACCORDION
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const seoFaqItems = document.querySelectorAll(".seo-faq-item");

    seoFaqItems.forEach(function (item) {

        const question = item.querySelector(".seo-faq-question");
        const answer = item.querySelector(".seo-faq-answer");

        // Open the default active FAQ
        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close all FAQs
            seoFaqItems.forEach(function (faq) {

                faq.classList.remove("active");

                faq.querySelector(".seo-faq-answer").style.maxHeight = null;

            });

            // Open clicked FAQ
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

});