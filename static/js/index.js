/*=========================================
HOME PAGE JAVASCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    LOGO SLIDER (Infinite)
    =========================================*/

    const logoTrack = document.querySelector(".home-logo-track");

    if (logoTrack) {

        logoTrack.innerHTML += logoTrack.innerHTML;

    }

    /*=========================================
    STICKY HEADER
    =========================================*/

    const header = document.querySelector(".home-header");

    const scrollHeader = () => {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    scrollHeader();

    window.addEventListener("scroll", scrollHeader);

    /*=========================================
    MOBILE MENU
    =========================================*/

    const menuBtn = document.querySelector(".home-menu-toggle");

    const mobileMenu = document.querySelector(".home-mobile-menu");

    const overlay = document.querySelector(".home-menu-overlay");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            menuBtn.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            if (overlay) {

                overlay.classList.toggle("active");

            }

            document.body.classList.toggle("menu-open");

        });

    }

    if (overlay) {

        overlay.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuBtn.classList.remove("active");

            overlay.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    }

    /*=========================================
    MOBILE DROPDOWN
    =========================================*/

    document.querySelectorAll(".home-mobile-dropdown > a").forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            this.parentElement.classList.toggle("open");

        });

    });

    /*=========================================
    SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 90,

                behavior: "smooth"

            });

            if (mobileMenu) {

                mobileMenu.classList.remove("active");

                menuBtn.classList.remove("active");

                document.body.classList.remove("menu-open");

                if (overlay) {

                    overlay.classList.remove("active");

                }

            }

        });

    });

    /*=========================================
    ACTIVE NAVIGATION
    =========================================*/

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".home-navbar a");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    activeMenu();

    /*=========================================
    CLOSE MENU ON RESIZE
    =========================================*/

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            if (mobileMenu) {

                mobileMenu.classList.remove("active");

            }

            if (menuBtn) {

                menuBtn.classList.remove("active");

            }

            if (overlay) {

                overlay.classList.remove("active");

            }

            document.body.classList.remove("menu-open");

        }

    });

});
/*=========================================
PART 2
SCROLL REVEAL + COUNTER + HERO ANIMATION
=========================================*/

/*=========================================
SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(

".home-section-header,\
.home-reveal,\
.home-hero-content,\
.home-hero-image,\
.home-service-card,\
.home-tech-card,\
.home-featured-project,\
.home-project-card,\
.home-portfolio-stat,\
.home-process-card,\
.home-testimonial-card,\
.home-blog-card,\
.home-why-content,\
.home-why-image,\
.home-cta-wrapper,\
.home-footer,\
.home-stat-card,\
.section-header,\
.reveal,\
.service-card,\
.service-hero,\
.service-image,\
.service-content,\
.service-features,\
.service-icon,\
.why-item,\
.process-card,\
.process-icon,\
.tech-card,\
.project-card,\
.testimonial-card,\
.related-card,\
.quote-icon"

);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    revealElements.forEach(item=>{

        item.classList.add("reveal");

        revealObserver.observe(item);

    });

}

/*=========================================
COUNTER
=========================================*/

const counters=document.querySelectorAll("[data-count], .counter");

if(counters.length){

const animateCounter = (counter)=>{

    if(counter.dataset.countStarted === "true") return;

    counter.dataset.countStarted = "true";

    const target = parseInt(counter.dataset.count || counter.dataset.target, 10) || 0;

    const suffix = counter.textContent.replace(/[0-9\s.,]/g, "").trim();

    const duration = 2200;
    const increment = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {

        current += increment;

        if (current >= target) {

            counter.innerText = target.toLocaleString() + suffix;

            return;

        }

        counter.innerText = Math.floor(current).toLocaleString() + suffix;

        requestAnimationFrame(updateCounter);

    };

    updateCounter();

};

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        animateCounter(entry.target);

        counterObserver.unobserve(entry.target);

    });

},{

    threshold:.15,
    rootMargin:"0px 0px -10% 0px"

});

counters.forEach(counter=>{

    const rect = counter.getBoundingClientRect();

    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {

        animateCounter(counter);

    } else {

        counterObserver.observe(counter);

    }

});

}

/*=========================================
HERO FLOATING CARDS
=========================================*/

const floatingObjects=document.querySelectorAll(

".home-floating-card,\
.home-floating-icon,\
.home-hero-shape"

);

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*25;

const y=(e.clientY/window.innerHeight-.5)*25;

floatingObjects.forEach((item,index)=>{

const speed=(index+1)*0.25;

item.style.transform=

`translate(${x*speed}px,${y*speed}px)`;

});

});

/*=========================================
HERO PARALLAX
=========================================*/

const hero=document.querySelector(".home-hero");

const heroImage=document.querySelector(".home-hero-image");

window.addEventListener("scroll",()=>{

if(!hero||!heroImage) return;

const scroll=window.pageYOffset;

heroImage.style.transform=

`translateY(${scroll*.18}px)`;

});

/*=========================================
SERVICE CARD HOVER
=========================================*/

document.querySelectorAll(".home-service-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

/*=========================================
TECH CARD TILT
=========================================*/

document.querySelectorAll(".home-tech-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=((y/rect.height)-.5)*12;

const rotateY=((x/rect.width)-.5)*-12;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";

});

});

/*=========================================
SECTION PARALLAX SHAPES
=========================================*/

const shapes=document.querySelectorAll(

".shape,.home-shape,.floating-shape"

);

window.addEventListener("scroll",()=>{

const scrollY=window.scrollY;

shapes.forEach((shape,index)=>{

const speed=(index+1)*0.12;

shape.style.transform=

`translateY(${scrollY*speed}px)`;

});

});

/*=========================================
IMAGE FADE-IN
=========================================*/

const images=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("loaded");

imageObserver.unobserve(entry.target);

}

});

});

images.forEach(img=>{

imageObserver.observe(img);

});

/*=========================================
NUMBER STAGGER ANIMATION
=========================================*/

const statCards=document.querySelectorAll(".home-stat-card");

statCards.forEach((card,index)=>{

card.style.transitionDelay=`${index*120}ms`;

});

/*=========================================
PAGE LOADED
=========================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});
/*=========================================
PART 3
TESTIMONIALS + PORTFOLIO + FAQ + TECHNOLOGY
=========================================*/

/*=========================================
CUSTOM TESTIMONIAL SLIDER
=========================================*/

const testimonialTrack = document.querySelector(".home-testimonial-track");
const testimonialCards = document.querySelectorAll(".home-testimonial-card");
const nextBtn = document.querySelector(".home-next-testimonial");
const prevBtn = document.querySelector(".home-prev-testimonial");

let testimonialIndex = 0;

if (testimonialTrack && testimonialCards.length) {

    function cardsPerView() {

        if (window.innerWidth < 768) return 1;

        if (window.innerWidth < 1200) return 2;

        return 3;

    }

    function updateSlider() {

        const perView = cardsPerView();

        const gap = 30;

        const cardWidth = testimonialCards[0].offsetWidth + gap;

        testimonialTrack.style.transform =
            `translateX(-${testimonialIndex * cardWidth}px)`;

        testimonialCards.forEach(card => {

            card.classList.remove("active");

        });

        if (testimonialCards[testimonialIndex]) {

            testimonialCards[testimonialIndex].classList.add("active");

        }

    }

    nextBtn?.addEventListener("click", () => {

        const max = testimonialCards.length - cardsPerView();

        testimonialIndex++;

        if (testimonialIndex > max) {

            testimonialIndex = 0;

        }

        updateSlider();

    });

    prevBtn?.addEventListener("click", () => {

        const max = testimonialCards.length - cardsPerView();

        testimonialIndex--;

        if (testimonialIndex < 0) {

            testimonialIndex = max;

        }

        updateSlider();

    });

    let autoSlide = setInterval(() => {

        nextBtn?.click();

    }, 4000);

    testimonialTrack.addEventListener("mouseenter", () => {

        clearInterval(autoSlide);

    });

    testimonialTrack.addEventListener("mouseleave", () => {

        autoSlide = setInterval(() => {

            nextBtn?.click();

        }, 4000);

    });

    window.addEventListener("resize", updateSlider);

    updateSlider();

}

/*=========================================
PORTFOLIO FILTER
=========================================*/

const filterButtons = document.querySelectorAll(".home-filter-btn");
const portfolioItems = document.querySelectorAll(".home-portfolio-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {

            if (filter === "all") {

                item.style.display = "block";

                setTimeout(() => {

                    item.style.opacity = "1";

                }, 100);

            }

            else if (item.dataset.category === filter) {

                item.style.display = "block";

                setTimeout(() => {

                    item.style.opacity = "1";

                }, 100);

            }

            else {

                item.style.opacity = "0";

                setTimeout(() => {

                    item.style.display = "none";

                }, 300);

            }

        });

    });

});

/*=========================================
FAQ ACCORDION
=========================================*/

const faqItems = document.querySelectorAll(".home-faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".home-faq-question");

    question?.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*=========================================
TECH CARD HOVER EFFECT
=========================================*/

document.querySelectorAll(".home-tech-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("active");

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("active");

    });

});

/*=========================================
TECH ICON FLOAT
=========================================*/

document.querySelectorAll(".home-tech-card i").forEach(icon => {

    let direction = 1;

    setInterval(() => {

        icon.style.transform =
            `translateY(${direction * 6}px)`;

        direction *= -1;

    }, 1200);

});

/*=========================================
PORTFOLIO IMAGE ZOOM
=========================================*/

document.querySelectorAll(".home-portfolio-image").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.06)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});

/*=========================================
BLOG CARD HOVER
=========================================*/

document.querySelectorAll(".home-blog-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});

/*=========================================
CTA CARD HOVER
=========================================*/

document.querySelectorAll(".home-cta-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});

/*=========================================
SERVICE CARD ICON ROTATION
=========================================*/

document.querySelectorAll(".home-service-card").forEach(card => {

    const icon = card.querySelector("i");

    // Use pointer events and only animate for mouse pointers
    const onPointerEnter = (e) => {
        if (e && e.pointerType && e.pointerType !== 'mouse') return;
        if (icon) icon.style.transform = "rotate(15deg) scale(1.15)";
    };

    const onPointerLeave = (e) => {
        if (e && e.pointerType && e.pointerType !== 'mouse') return;
        if (icon) icon.style.transform = "rotate(0deg) scale(1)";
    };

    // Preferred: pointer events (works for mouse, pen, touch). We restrict to mouse above.
    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);

    // Fallback for environments that may not support pointer events: keep mouse handlers
    card.addEventListener("mouseenter", onPointerEnter);
    card.addEventListener("mouseleave", onPointerLeave);

});

/*=========================================
SECTION TITLE UNDERLINE
=========================================*/

document.querySelectorAll(".home-section-header h2").forEach(title => {

    title.addEventListener("mouseenter", () => {

        title.classList.add("active");

    });

    title.addEventListener("mouseleave", () => {

        title.classList.remove("active");

    });

});
/*=========================================
PART 4
UTILITY FEATURES
=========================================*/

/*=========================================
BACK TO TOP
=========================================*/

const backToTop=document.querySelector(".home-back-to-top");

if(backToTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backToTop.classList.add("active");

}else{

backToTop.classList.remove("active");

}

});

backToTop.addEventListener("click",(e)=>{

e.preventDefault();

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*=========================================
WHATSAPP BUTTON
=========================================*/

const waButton=document.querySelector(".home-wa-float");

if(waButton){

window.addEventListener("scroll",()=>{

if(window.scrollY>250){

waButton.classList.add("show");

}else{

waButton.classList.remove("show");

}

});

waButton.addEventListener("mouseenter",()=>{

waButton.style.animationPlayState="paused";

});

waButton.addEventListener("mouseleave",()=>{

waButton.style.animationPlayState="running";

});

}

/*=========================================
BUTTON RIPPLE
=========================================*/

document.querySelectorAll(

".home-btn-primary,.home-btn-outline"

).forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.className="ripple";

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=========================================
CUSTOM CURSOR
=========================================*/

const cursor=document.querySelector(".home-cursor");

if(cursor){

window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

document.querySelectorAll(

"a,button,.home-service-card,.home-tech-card,.home-blog-card"

).forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursor.classList.add("active");

});

item.addEventListener("mouseleave",()=>{

cursor.classList.remove("active");

});

});

}

/*=========================================
PRELOADER
=========================================*/

const preloader=document.querySelector(".home-preloader");

window.addEventListener("load",()=>{

if(preloader){

preloader.classList.add("hide");

setTimeout(()=>{

preloader.remove();

},600);

}

});

/*=========================================
IMAGE LAZY LOAD
=========================================*/

const lazyImages=document.querySelectorAll("img[data-src]");

if("IntersectionObserver" in window){

const lazyObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

lazyObserver.unobserve(img);

});

});

lazyImages.forEach(img=>{

lazyObserver.observe(img);

});

}

/*=========================================
ACTIVE LINK
=========================================*/

const currentPage=window.location.pathname;

document.querySelectorAll(".home-navbar a").forEach(link=>{

if(link.getAttribute("href")===currentPage){

link.classList.add("active");

}

});

/*=========================================
SCROLL PROGRESS BAR
=========================================*/

const progress=document.querySelector(".home-progress");

if(progress){

window.addEventListener("scroll",()=>{

const totalHeight=

document.documentElement.scrollHeight-

window.innerHeight;

const percentage=

(window.pageYOffset/totalHeight)*100;

progress.style.width=percentage+"%";

});

}

/*=========================================
COPYRIGHT YEAR
=========================================*/

const year=document.querySelector(".home-current-year");

if(year){

year.textContent=new Date().getFullYear();

}

/*=========================================
KEYBOARD ACCESSIBILITY
=========================================*/

document.addEventListener("keyup",(e)=>{

if(e.key==="Escape"){

document.body.classList.remove("menu-open");

document.querySelector(".home-mobile-menu")

?.classList.remove("active");

document.querySelector(".home-menu-overlay")

?.classList.remove("active");

document.querySelector(".home-menu-toggle")

?.classList.remove("active");

}

});

/*=========================================
WINDOW RESIZE
=========================================*/

window.addEventListener("resize",()=>{

document.documentElement.style.setProperty(

"--window-width",

window.innerWidth+"px"

);

});

/*=========================================
CONSOLE MESSAGE
=========================================*/

console.log(

"%cM Agency",

"color:#2563eb;font-size:22px;font-weight:bold;"

);

console.log(

"%cWebsite developed with ❤️",

"color:#64748b;font-size:14px;"

);
