document.addEventListener('DOMContentLoaded', () => {
    // Select Elements
    const track = document.getElementById('pricingTrack');
    const cards = track ? track.querySelectorAll('.pricing-card') : [];
    
    // Top Arrows
    const prevArrow = document.querySelector('.arrow.prev');
    const nextArrow = document.querySelector('.arrow.next');
    
    // Bottom Buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const gap = 26; // This must match the gap: 26px in the CSS

    // Function to check how many cards are visible based on screen size
    function getVisibleCards() {
        if (window.innerWidth <= 768) return 1; // Mobile
        if (window.innerWidth <= 1024) return 2; // Tablet
        return 3; // Desktop
    }

    // Core logic to move the slider
    function updateSlider() {
        const visibleCards = getVisibleCards();
        const maxIndex = cards.length - visibleCards;

        // Prevent sliding out of bounds on resize
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        // Calculate translation amount
        const cardWidth = cards[0].offsetWidth;
        const moveAmount = currentIndex * (cardWidth + gap);

        // Apply translation
        track.style.transform = `translateX(-${moveAmount}px)`;

        // Disable/Enable buttons based on position
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex === maxIndex;

        if (prevArrow) prevArrow.disabled = isAtStart;
        if (prevBtn) prevBtn.disabled = isAtStart;
        
        if (nextArrow) nextArrow.disabled = isAtEnd;
        if (nextBtn) nextBtn.disabled = isAtEnd;
    }

    // Movement Triggers
    function moveNext() {
        const maxIndex = cards.length - getVisibleCards();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }

    function movePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    // Attach Event Listeners
    if (nextArrow) nextArrow.addEventListener('click', moveNext);
    if (nextBtn) nextBtn.addEventListener('click', moveNext);
    
    if (prevArrow) prevArrow.addEventListener('click', movePrev);
    if (prevBtn) prevBtn.addEventListener('click', movePrev);

    // Recalculate if the user resizes their browser window
    window.addEventListener('resize', updateSlider);

    // Initialize layout on load
    updateSlider();
});