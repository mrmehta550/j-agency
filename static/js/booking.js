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

    const calendarGrid = document.querySelector(".booking-calendar-grid");
    const calendarMonth = document.querySelector(".booking-calendar-month");
    const dateInput = document.querySelector('input[name="date"]');

    let selectedDate = new Date();
    let midnightTimer = null;

    function formatDateValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function renderCalendar(referenceDate) {
        if (!calendarGrid) return;

        const year = referenceDate.getFullYear();
        const month = referenceDate.getMonth();
        const today = new Date();

        if (calendarMonth) {
            calendarMonth.textContent = referenceDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            });
        }

        calendarGrid.innerHTML = "";

        ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach(label => {
            const weekday = document.createElement("span");
            weekday.textContent = label;
            calendarGrid.appendChild(weekday);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const spacer = document.createElement("span");
            spacer.setAttribute("aria-hidden", "true");
            calendarGrid.appendChild(spacer);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = String(day);

            const buttonDate = new Date(year, month, day);
            const isToday =
                buttonDate.getDate() === today.getDate() &&
                buttonDate.getMonth() === today.getMonth() &&
                buttonDate.getFullYear() === today.getFullYear();
            const isSelected =
                buttonDate.getDate() === selectedDate.getDate() &&
                buttonDate.getMonth() === selectedDate.getMonth() &&
                buttonDate.getFullYear() === selectedDate.getFullYear();

            if (isToday || isSelected) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                selectedDate = new Date(buttonDate);
                renderCalendar(selectedDate);

                if (dateInput) {
                    dateInput.value = formatDateValue(selectedDate);
                }
            });

            calendarGrid.appendChild(button);
        }

        if (dateInput) {
            dateInput.value = formatDateValue(selectedDate);
        }

        if (midnightTimer) {
            clearTimeout(midnightTimer);
        }

        const nextMidnight = new Date();
        nextMidnight.setHours(24, 0, 0, 0);

        midnightTimer = setTimeout(() => {
            selectedDate = new Date();
            renderCalendar(selectedDate);
        }, nextMidnight.getTime() - Date.now());
    }

    renderCalendar(selectedDate);


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