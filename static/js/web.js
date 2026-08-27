/**
 * Web Development Service Page Specific JavaScript
 * Isolated to prevent global namespace pollution.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Only execute if we are on the Web Development page
    const webHero = document.querySelector(".web-service-hero");
    if (!webHero) return;

    /* ==========================================================================
       1. FAQ ACCORDION SYSTEM
       ========================================================================== */
    const faqItems = document.querySelectorAll(".web-faq-item");

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".web-faq-question");
            const answer = item.querySelector(".web-faq-answer");

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
                            const otherAnswer = otherItem.querySelector(".web-faq-answer");
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
    const webCounters = document.querySelectorAll(".web-counter");

    if (webCounters.length > 0) {
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

        webCounters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /* ==========================================================================
       3. SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const webRevealElements = document.querySelectorAll(".web-reveal");

    if (webRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("web-revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.02 });

        webRevealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});