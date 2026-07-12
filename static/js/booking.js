/*==================================================
BOOKING PAGE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    SERVICE CARD SELECTION
    =========================================*/

    const serviceCards = document.querySelectorAll(".booking-service-card");
    const serviceSelect = document.getElementById("selectedService");

    serviceCards.forEach(card => {

        card.addEventListener("click", () => {

            serviceCards.forEach(item => {
                item.classList.remove("active");
            });

            card.classList.add("active");

            const service = card.dataset.service;

            if (serviceSelect) {
                serviceSelect.value = service;
            }

            document.querySelector("#bookingForm")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    /*=========================================
    FAQ ACCORDION
    =========================================*/

    const faqItems = document.querySelectorAll(".booking-faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".booking-faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {
                    faq.classList.remove("active");
                }

            });

            item.classList.toggle("active");

        });

    });


    /*=========================================
    CALENDAR DATE
    =========================================*/

    const dates = document.querySelectorAll(".booking-calendar-grid button");

    dates.forEach(button => {

        button.addEventListener("click", () => {

            dates.forEach(date => {

                date.classList.remove("active");

            });

            button.classList.add("active");

            const dateInput = document.querySelector(
                'input[name="date"]'
            );

            if (dateInput) {

                const today = new Date();

                const month = today.getMonth();

                const year = today.getFullYear();

                const day = button.innerText.padStart(2, "0");

                const value =
                    `${year}-${String(month + 1).padStart(2, "0")}-${day}`;

                dateInput.value = value;

            }

        });

    });


    /*=========================================
    TIME SLOT
    =========================================*/

    const slots = document.querySelectorAll(".booking-time-slots button");

    slots.forEach(slot => {

        slot.addEventListener("click", () => {

            slots.forEach(btn => {

                btn.classList.remove("active");

            });

            slot.classList.add("active");

            const timeInput = document.querySelector(
                'input[name="time"]'
            );

            if (timeInput) {

                let value = slot.innerText.trim();

                if (value === "10:00 AM") {

                    timeInput.value = "10:00";

                } else if (value === "02:00 PM") {

                    timeInput.value = "14:00";

                } else if (value === "05:00 PM") {

                    timeInput.value = "17:00";

                }

            }

        });

    });


    /*=========================================
    SMOOTH SCROLL BUTTONS
    =========================================*/

    const buttons = document.querySelectorAll(
        'a[href^="#"]'
    );

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });


    /*=========================================
    FORM VALIDATION
    =========================================*/

    const bookingForm = document.querySelector(
        ".booking-form-card form"
    );

    if (bookingForm) {

        bookingForm.addEventListener("submit", (e) => {

            const name = bookingForm.name.value.trim();

            const email = bookingForm.email.value.trim();

            const phone = bookingForm.phone.value.trim();

            if (
                name === "" ||
                email === "" ||
                phone === ""
            ) {

                e.preventDefault();

                alert(
                    "Please fill all required fields."
                );

                return;

            }

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                e.preventDefault();

                alert("Enter a valid email address.");

                return;

            }

            const phoneRegex =
                /^[0-9+\-\s]{10,15}$/;

            if (!phoneRegex.test(phone)) {

                e.preventDefault();

                alert("Enter a valid phone number.");

            }

        });

    }


    /*=========================================
    ACTIVE MENU ON SCROLL
    =========================================*/

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 150;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

});