/*=========================================
   TECHNOLOGY PAGE JAVASCRIPT
   tech.js
   -----------------------------------------
   Handles:
   1. Logo track duplication (infinite scroll)
   2. Category filter (show/hide tech cards)
   3. No floating animations on tech icons
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    LOGO SLIDER — Infinite Duplicate
    -----------------------------------------
    Both .technology-logo-track and
    .technology-client-track use CSS animation
    to scroll horizontally. We double the HTML
    content so the loop is seamless.
    =========================================*/

    const logoTrack = document.querySelector(".technology-logo-track");
    if (logoTrack) {
        logoTrack.innerHTML += logoTrack.innerHTML;
    }

    const clientTrack = document.querySelector(".technology-client-track");
    if (clientTrack) {
        clientTrack.innerHTML += clientTrack.innerHTML;
    }

    /*=========================================
    CATEGORY FILTER
    -----------------------------------------
    Clicking a category button shows only the
    matching stack cards and hides others.
    No rotation or transform on tech icons.
    =========================================*/

    const categoryBtns = document.querySelectorAll(".technology-category-btn");
    const stackCards   = document.querySelectorAll(".technology-stack-card");

    categoryBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            // Update active button state
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter || "all";

            stackCards.forEach(card => {

                const match = filter === "all" || card.dataset.category === filter;

                if (match) {
                    card.style.display = "";
                    // Defer opacity so display takes effect first
                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "";
                    });
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 280);
                }

            });

        });

    });

});
