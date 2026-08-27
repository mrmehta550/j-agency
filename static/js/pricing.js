/**
 * Pricing Page Functionality
 * Handles Monthly/Annual toggle, FAQ Accordion, Scroll-reveal, and Card Slider Carousel.
 */
document.addEventListener('DOMContentLoaded', () => {
    /* ── Billing Toggle ── */
    const toggle = document.getElementById('billingToggle');
    const amounts = document.querySelectorAll('.pr-amount');
    const saveBadge = document.querySelector('.pr-save-badge');
    const labelAnnual = document.getElementById('labelAnnual');
    const labelMonthly = document.getElementById('labelMonthly');
    let isAnnual = false;

    if (toggle) {
        if (labelMonthly) labelMonthly.classList.add('pr-label-active');

        toggle.addEventListener('click', function () {
            isAnnual = !isAnnual;
            this.classList.toggle('active', isAnnual);
            
            if (saveBadge) saveBadge.classList.toggle('visible', isAnnual);
            if (labelAnnual) labelAnnual.classList.toggle('pr-label-active', isAnnual);
            if (labelMonthly) labelMonthly.classList.toggle('pr-label-active', !isAnnual);

            amounts.forEach(el => {
                const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
                el.textContent = val;
                el.classList.add('pr-amount-flash');
                setTimeout(() => el.classList.remove('pr-amount-flash'), 400);
            });
        });
    }

    /* ── FAQ Accordion ── */
    document.querySelectorAll('.pr-faq-q').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.pr-faq-item');
            const answer = item.querySelector('.pr-faq-a');
            const isOpen = item.classList.contains('open');

            // Close all open FAQ items
            document.querySelectorAll('.pr-faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
                openItem.querySelector('.pr-faq-q').setAttribute('aria-expanded', 'false');
                const openAnswer = openItem.querySelector('.pr-faq-a');
                if (openAnswer) openAnswer.style.maxHeight = '0';
            });

            // Open clicked (if it was closed)
            if (!isOpen) {
                item.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ── Slider / Carousel Logic ── */
    const track = document.getElementById('pricingTrack');
    const cards = track ? track.querySelectorAll('.pr-card') : [];
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('sliderDots');

    let currentIndex = 0;

    if (track && cards.length > 0) {
        // Gap in px (should match pricing.css layout)
        const gap = 24;

        function getVisibleCards() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 960) return 2;
            return 3; // Desktop displays 3 cards professionally
        }

        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const visibleCards = getVisibleCards();
            const totalDots = Math.max(1, cards.length - visibleCards + 1);

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('pr-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, cards.length - visibleCards);

            // Bounds check
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            // Calculate card width dynamically
            const containerWidth = track.parentElement.getBoundingClientRect().width;
            // Width = (ContainerWidth - gaps) / visibleCards
            const cardWidth = (containerWidth - (gap * (visibleCards - 1))) / visibleCards;

            cards.forEach(card => {
                card.style.flex = `0 0 ${cardWidth}px`;
            });

            const moveAmount = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Update arrow state
            if (prevSlide) prevSlide.disabled = (currentIndex === 0);
            if (nextSlide) nextSlide.disabled = (currentIndex === maxIndex);

            // Update active dot
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.pr-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }

        // Action Triggers
        if (nextSlide) {
            nextSlide.addEventListener('click', () => {
                const visibleCards = getVisibleCards();
                if (currentIndex < cards.length - visibleCards) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }

        if (prevSlide) {
            prevSlide.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }

        // Swipe support for mobile
        let startX = 0;
        let isSwiping = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const diffX = e.touches[0].clientX - startX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                    isSwiping = false;
                } else if (diffX < 0 && currentIndex < cards.length - getVisibleCards()) {
                    currentIndex++;
                    updateSlider();
                    isSwiping = false;
                }
            }
        }, { passive: true });

        track.addEventListener('touchend', () => {
            isSwiping = false;
        });

        // Initialize Slider
        createDots();
        updateSlider();

        // Update on resize
        window.addEventListener('resize', () => {
            createDots();
            updateSlider();
        });
    }

    /* ── Scroll Reveal Animations ── */
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('pr-visible');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that are outside the slider track
        document.querySelectorAll('.pr-faq-item, .pr-trust-item').forEach(el => {
            observer.observe(el);
        });
        
        // Make slider cards visible
        document.querySelectorAll('.pr-card').forEach(el => {
            el.classList.add('pr-visible');
        });
    } else {
        document.querySelectorAll('.pr-card, .pr-faq-item, .pr-trust-item').forEach(el => {
            el.classList.add('pr-visible');
        });
    }
});