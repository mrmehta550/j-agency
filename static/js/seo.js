/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const seoProgress = document.querySelector(".seo-progress");

window.addEventListener("scroll", () => {

    if(!seoProgress) return;

    const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progress =
    (window.pageYOffset / totalHeight) * 100;

    seoProgress.style.width = progress + "%";

});

/*=========================================
        BACK TO TOP
=========================================*/

const seoBackTop = document.querySelector(".seo-back-top");

window.addEventListener("scroll", () => {

    if(!seoBackTop) return;

    if(window.scrollY > 500){

        seoBackTop.classList.add("show");

    }else{

        seoBackTop.classList.remove("show");

    }

});

seoBackTop?.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
        SCROLL REVEAL
=========================================*/

const seoReveal = document.querySelectorAll(

".seo-service-card,\
.seo-benefit-card,\
.seo-process-card,\
.seo-tool-card,\
.seo-case-study-card,\
.seo-price-card,\
.seo-testimonial-card"

);

const seoObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("seo-show");

}

});

},

{

threshold:.15

}

);

seoReveal.forEach(item=>{

item.classList.add("seo-hidden");

seoObserver.observe(item);

});

/*=========================================
        FAQ
=========================================*/

const seoFaq = document.querySelectorAll(

".seo-faq-wrapper details"

);

seoFaq.forEach(item=>{

item.addEventListener("toggle",()=>{

if(item.open){

seoFaq.forEach(other=>{

if(other!==item){

other.removeAttribute("open");

}

});

}

});

});

/*=========================================
        HERO PARALLAX
=========================================*/

const seoHeroImage = document.querySelector(

".seo-hero-visual"

);

window.addEventListener("mousemove",(e)=>{

if(!seoHeroImage) return;

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

seoHeroImage.style.transform=

`translate(${x}px,${y}px)`;

});

/*=========================================
        COUNTER
=========================================*/

const counters = document.querySelectorAll(

".seo-stat-box h3"

);

const counterObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter = entry.target;

const target = parseInt(counter.innerText);

let count = 0;

const speed = target / 60;

const update=()=>{

count += speed;

if(count < target){

counter.innerText=Math.ceil(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

counterObserver.unobserve(counter);

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});