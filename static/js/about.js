document.addEventListener("DOMContentLoaded", () => {
    // Exit if not on the about page
    const isAboutPage = document.querySelector(".about-hero, .about-section");
    if (!isAboutPage) return;

    /* ==========================================
       1. ABOUT IMAGE HOVER EFFECT
       ========================================== */
    const image = document.querySelector(".about-image-wrapper");
    if (image) {
        image.addEventListener("mousemove", (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / 30;
            const rotateX = -(y - rect.height / 2) / 30;
            image.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        image.addEventListener("mouseleave", () => {
            image.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    }

    /* ==========================================
       2. MISSION CARD EFFECT
       ========================================== */
    const valueCards = document.querySelectorAll(".about-value-card");
    valueCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / 25;
            const rotateX = -(y - rect.height / 2) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    });

    /* ==========================================
       3. ABOUT STATS COUNTER
       ========================================== */
    const aboutCounters = document.querySelectorAll(".counter");
    if (aboutCounters.length > 0) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.dataset.target || 0;
                    let current = 0;
                    const speed = target / 80;

                    function update() {
                        current += speed;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target + "+";
                        }
                    }

                    update();
                    aboutObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.1 });

        aboutCounters.forEach(counter => {
            aboutObserver.observe(counter);
        });
    }

    /* ==========================================
       4. WHY CARD HOVER EFFECT
       ========================================== */
    const whyCards = document.querySelectorAll(".about-why-card");
    whyCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = (x - rect.width / 2) / 20;
            const rotateX = -(y - rect.height / 2) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        });
    });

    /* ==========================================
       5. SCROLL REVEAL ANIMATIONS
       ========================================== */
    const revealItems = document.querySelectorAll(".about-process-card, .about-team-card, .about-why-card, .about-value-card");
    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        revealItems.forEach(item => {
            item.classList.add("hidden");
            revealObserver.observe(item);
        });
    }

    /* ==========================================
       6. TECHNOLOGY SLIDER
       ========================================== */
    const technologyTrack = document.querySelector(".technology-track");
    if (technologyTrack) {
        technologyTrack.addEventListener("mouseenter", () => {
            technologyTrack.style.animationPlayState = "paused";
        });

        technologyTrack.addEventListener("mouseleave", () => {
            technologyTrack.style.animationPlayState = "running";
        });
    }

    /* ==========================================
       7. TESTIMONIAL SLIDER
       ========================================== */
    const aboutTestimonialTrack = document.getElementById("testimonialTrack");
    if (aboutTestimonialTrack) {
        const cards = document.querySelectorAll(".testimonial-card");
        const next = document.querySelector(".next-btn");
        const prev = document.querySelector(".prev-btn");
        let index = 0;

        function getCardWidth() {
            return cards[0] ? cards[0].offsetWidth + 30 : 0;
        }

        function moveSlider() {
            const width = getCardWidth();
            aboutTestimonialTrack.style.transform = `translateX(-${index * width}px)`;
        }

        function nextSlide() {
            index++;
            if (index > cards.length - 1) {
                index = 0;
            }
            moveSlider();
        }

        function prevSlide() {
            index--;
            if (index < 0) {
                index = cards.length - 1;
            }
            moveSlider();
        }

        let auto = setInterval(nextSlide, 3500);

        if (next) {
            next.onclick = () => {
                clearInterval(auto);
                nextSlide();
                auto = setInterval(nextSlide, 3500);
            };
        }

        if (prev) {
            prev.onclick = () => {
                clearInterval(auto);
                prevSlide();
                auto = setInterval(nextSlide, 3500);
            };
        }

        aboutTestimonialTrack.addEventListener("mouseenter", () => {
            clearInterval(auto);
        });

        aboutTestimonialTrack.addEventListener("mouseleave", () => {
            auto = setInterval(nextSlide, 3500);
        });

        window.addEventListener("resize", moveSlider);
    }
});
