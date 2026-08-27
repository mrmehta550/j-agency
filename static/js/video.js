/**
 * Video Editing Service Page Specific JavaScript
 * Isolated to prevent global namespace pollution.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Only execute if we are on the Video Editing page
    const videoHero = document.querySelector(".video-service-hero");
    if (!videoHero) return;

    /* ==========================================================================
       1. FAQ ACCORDION SYSTEM
       ========================================================================== */
    const faqItems = document.querySelectorAll(".video-faq-item");

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".video-faq-question");
            const answer = item.querySelector(".video-faq-answer");

            if (question && answer) {
                // Initialize default state
                if (item.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = "0px";
                }

                question.addEventListener("click", (e) => {
                    e.preventDefault();
                    const isActive = item.classList.contains("active");

                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove("active");
                            const otherAnswer = otherItem.querySelector(".video-faq-answer");
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = "0px";
                            }
                        }
                    });

                    // Toggle current FAQ item
                    if (isActive) {
                        item.classList.remove("active");
                        answer.style.maxHeight = "0px";
                    } else {
                        item.classList.add("active");
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            }
        });
    }

    /* ==========================================================================
       2. INTERSECTION OBSERVER STATS COUNTER
       ========================================================================== */
    const videoCounters = document.querySelectorAll(".video-counter");

    if (videoCounters.length > 0) {
        const animateCounter = (counter) => {
            if (counter.dataset.countStarted === "true") return;
            counter.dataset.countStarted = "true";

            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 1500; // Animation duration in ms
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const currentVal = Math.floor(easeProgress * target);

                counter.textContent = currentVal.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(updateCount);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        videoCounters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /* ==========================================================================
       3. SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const videoRevealElements = document.querySelectorAll(".video-reveal");

    if (videoRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("video-revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.02 });

        videoRevealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       4. PORTFOLIO FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".video-portfolio-filter button");
    const portfolioCards = document.querySelectorAll(".video-portfolio-card");

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter") || "all";

                portfolioCards.forEach(card => {
                    const cardCategory = card.getAttribute("data-category") || "";

                    if (filterValue === "all" || cardCategory === filterValue) {
                        card.style.display = "block";
                        void card.offsetHeight;
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0) scale(1)";
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(15px) scale(0.95)";
                        setTimeout(() => {
                            if (card.style.opacity === "0") {
                                card.style.display = "none";
                            }
                        }, 300);
                    }
                });
            });
        });
    }
});