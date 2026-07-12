/*=========================================
UI/UX FAQ
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".uiux-faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".uiux-faq-question");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });

            // Open clicked FAQ
            if (!isActive) {

                item.classList.add("active");

            }

        });

    });

});
/*=========================================
UI/UX FAQ ACCORDION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".uiux-faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".uiux-faq-question");
        const answer = item.querySelector(".uiux-faq-answer");

        // Open default active item
        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all
            faqItems.forEach(faq => {

                faq.classList.remove("active");

                faq.querySelector(".uiux-faq-answer").style.maxHeight = null;

            });

            // Open clicked
            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });

});