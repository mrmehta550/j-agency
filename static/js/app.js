/**
 * MOBILE APP DEVELOPMENT PAGE - INTERACTION SCRIPT
 */
document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the App Development page by verifying key elements
    const calcWrapper = document.querySelector(".calculator-wrapper");
    const playground = document.querySelector(".mockup-playground");
    if (!calcWrapper && !playground) return;

    // ==========================================
    // 1. INTERACTIVE MOCKUP TABS
    // ==========================================
    const tabs = document.querySelectorAll(".selector-tab");
    const screens = document.querySelectorAll(".sim-screen");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetScreenId = `screen-${tab.dataset.screen}`;

            // Remove active classes
            tabs.forEach(t => t.classList.remove("active"));
            screens.forEach(s => s.classList.remove("active"));

            // Add active class to clicked tab
            tab.classList.add("active");

            // Add active class to corresponding screen with opacity fade
            const targetScreen = document.getElementById(targetScreenId);
            if (targetScreen) {
                targetScreen.classList.add("active");
            }
        });
    });

    // ==========================================
    // 2. APP COST & TIMELINE CALCULATOR
    // ==========================================
    const platformInputs = document.querySelectorAll('input[name="platform"]');
    const featureInputs = document.querySelectorAll('input[name="feature"]');
    
    const minPriceEl = document.getElementById("price-min");
    const maxPriceEl = document.getElementById("price-max");
    const timelineEl = document.getElementById("timeline-text");

    // Prices mapping
    const basePlatformCost = 2500; // per platform (iOS or Android)
    const hybridDiscount = 1200; // discount if both iOS and Android are selected (e.g. Flutter dev)
    
    const featureCosts = {
        auth: 800,
        push: 500,
        payment: 1200,
        database: 1000,
        admin: 1500
    };

    function calculateEstimate() {
        let selectedPlatforms = [];
        platformInputs.forEach(input => {
            if (input.checked) selectedPlatforms.push(input.value);
        });

        // If no platform is checked, price is $0
        if (selectedPlatforms.length === 0) {
            minPriceEl.textContent = "$0";
            maxPriceEl.textContent = "$0";
            timelineEl.textContent = "0 Weeks";
            return;
        }

        // Calculate platform cost
        let platformCost = selectedPlatforms.length * basePlatformCost;
        if (selectedPlatforms.length === 2) {
            platformCost -= hybridDiscount; // Discount for Flutter hybrid setup
        }

        // Calculate features cost
        let featuresCost = 0;
        let complexFeaturesCount = 0;
        
        featureInputs.forEach(input => {
            if (input.checked) {
                featuresCost += featureCosts[input.value] || 0;
                if (["payment", "database", "admin"].includes(input.value)) {
                    complexFeaturesCount++;
                }
            }
        });

        // Totals
        const totalBase = platformCost + featuresCost;
        const totalMin = Math.round(totalBase * 0.95);
        const totalMax = Math.round(totalBase * 1.25);

        // Timeline Calculation
        let minWeeks = 4;
        let maxWeeks = 6;

        if (selectedPlatforms.length === 1) {
            minWeeks = 3;
            maxWeeks = 5;
        }

        // Add padding for complex features
        minWeeks += complexFeaturesCount;
        maxWeeks += Math.round(complexFeaturesCount * 1.5);

        // Format formatting with helper
        animateNumberValue(minPriceEl, totalMin);
        animateNumberValue(maxPriceEl, totalMax);
        timelineEl.textContent = `${minWeeks} - ${maxWeeks} Weeks`;
    }

    // Dynamic number counting animation
    function animateNumberValue(element, targetValue) {
        const startValue = parseInt(element.textContent.replace(/[^0-9]/g, "")) || 0;
        const duration = 400; // ms
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
            
            element.textContent = `$${currentValue.toLocaleString()}`;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        requestAnimationFrame(updateNumber);
    }

    // Attach event listeners
    platformInputs.forEach(input => input.addEventListener("change", calculateEstimate));
    featureInputs.forEach(input => input.addEventListener("change", calculateEstimate));

    // Run initial calculations on page load
    calculateEstimate();
});
