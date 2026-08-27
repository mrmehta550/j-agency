/**
 * Technology Stack Page Functionality
 * Handles infinite logo scrolling and category filter section transitions.
 */
document.addEventListener("DOMContentLoaded", () => {
    /* ── Logo Slider Duplication ── */
    const logoTrack = document.querySelector(".technology-logo-track");
    if (logoTrack) {
        logoTrack.innerHTML += logoTrack.innerHTML;
    }

    /* ── Category Filter Sections Switcher ── */
    const categoryBtns = document.querySelectorAll(".technology-category-btn");
    
    const sections = {
        frontend: document.querySelector(".technology-stack-section"),
        backend: document.querySelector(".technology-backend-section"),
        ai: document.querySelector(".technology-ai-section"),
        database: document.querySelector(".technology-database-section"),
        cloud: document.querySelector(".technology-cloud-section"),
        devops: document.querySelector(".technology-cloud-section")
    };

    // Initialize: Only Frontend section is visible, others hidden
    Object.keys(sections).forEach(key => {
        const sec = sections[key];
        if (sec) {
            if (key === "frontend") {
                sec.style.display = "block";
                sec.style.opacity = "1";
                sec.classList.add("section-fade-in");
            } else {
                sec.style.display = "none";
                sec.style.opacity = "0";
            }
        }
    });

    // Handle category button clicks
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active class on buttons
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            if (!filter) return;

            // Hide all sections first
            Object.keys(sections).forEach(key => {
                const sec = sections[key];
                if (sec) {
                    sec.style.display = "none";
                    sec.style.opacity = "0";
                    sec.classList.remove("section-fade-in");
                }
            });

            // Show target section
            const targetSec = sections[filter];
            if (targetSec) {
                targetSec.style.display = "block";
                // Trigger layout reflow for animation to take effect
                targetSec.offsetHeight; 
                targetSec.style.opacity = "1";
                targetSec.classList.add("section-fade-in");
                
                // Scroll to filter nav bar smoothly so the user sees the cards directly
                const navBar = document.getElementById("technology-stack");
                if (navBar) {
                    const offset = 100; // offset for sticky navigation header
                    const elementPosition = navBar.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});
