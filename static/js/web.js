document.addEventListener("DOMContentLoaded", function() {

    const faqQuestions = document.querySelectorAll(".faq-question");

    

    faqQuestions.forEach(question => {

        question.addEventListener("click", function(e) {

            e.preventDefault();

            const faqItem = this.closest(".faq-item");

            const isActive = faqItem.classList.contains("active");

            

            // Close all other items

            document.querySelectorAll(".faq-item").forEach(item => {

                if (item !== faqItem) {

                    item.classList.remove("active");

                }

            });

            

            // Toggle current item

            faqItem.classList.toggle("active");

        });

    });

    

    // Keyboard support

    faqQuestions.forEach(question => {

        question.addEventListener("keydown", function(e) {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                this.click();

            }

        });

    });

});