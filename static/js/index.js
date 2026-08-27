/**
 * Magencyinfo — Home (Index) Page Specific JavaScript
 * Cleanly scoped to prevent namespace collisions.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Only execute if on home page
    const homeHero = document.querySelector(".home-hero");
    if (!homeHero) return;

    /* ==========================================================================
       1. STATS COUNTER ANIMATION
       ========================================================================== */
    const homeCounters = document.querySelectorAll(".home-counter");

    if (homeCounters.length > 0) {
        const animateCounter = (counter) => {
            if (counter.dataset.countStarted === "true") return;
            counter.dataset.countStarted = "true";

            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 1600;
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

        homeCounters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /* ==========================================================================
       2. SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll(".home-reveal");

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("home-revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.02 });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       3. SMOOTH ANCHOR SCROLL
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#" || !href.startsWith("#")) return;
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            } catch (err) {
                // Ignore invalid selectors
            }
        });
    });
});
