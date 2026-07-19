/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const progressBar = document.querySelector(".ecommerce-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.pageYOffset;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";

});


/*=========================================
        BACK TO TOP
=========================================*/

const backTop = document.querySelector(".ecommerce-back-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=========================================
        SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(

".ecommerce-service-card,\
.ecommerce-feature-large,\
.ecommerce-feature-small,\
.ecommerce-process-card,\
.ecommerce-tech-card,\
.ecommerce-portfolio-card,\
.ecommerce-price-card,\
.ecommerce-testimonial-card"

);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealElements.forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});


/*=========================================
        FAQ
=========================================*/

const faqItems = document.querySelectorAll(

".ecommerce-faq-wrapper details"

);

faqItems.forEach(item=>{

item.addEventListener("toggle",()=>{

if(item.open){

faqItems.forEach(other=>{

if(other!==item){

other.removeAttribute("open");

}

});

}

});

});


/*=========================================
        PARALLAX HERO
=========================================*/

const heroImage = document.querySelector(

".ecommerce-hero-image"

);

window.addEventListener("mousemove",(e)=>{

if(!heroImage) return;

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

heroImage.style.transform=

`translate(${x}px,${y}px)`;

});


/*=========================================
        BUTTON RIPPLE
=========================================*/

document.querySelectorAll(

".ecommerce-primary-btn"

).forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transition=".35s";

});

});