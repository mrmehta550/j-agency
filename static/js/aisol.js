/*=========================================
AI FAQ ACCORDION
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".ai-faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".ai-faq-question");

        const answer = item.querySelector(".ai-faq-answer");

        question.addEventListener("click", function () {

            // Close all other FAQs

            faqItems.forEach(function (faq) {

                if (faq !== item) {

                    faq.classList.remove("active");

                    faq.querySelector(".ai-faq-answer").style.maxHeight = null;

                }

            });

            // Toggle current FAQ

            item.classList.toggle("active");

            if (item.classList.contains("active")) {

                answer.style.maxHeight = answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

    // Open first FAQ automatically

    const firstFaq = document.querySelector(".ai-faq-item.active");

    if (firstFaq) {

        const firstAnswer = firstFaq.querySelector(".ai-faq-answer");

        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";

    }

});