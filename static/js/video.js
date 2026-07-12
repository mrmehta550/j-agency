/*=========================================================
                VIDEO SERVICE JS
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

/*=========================================================
                    FAQ
=========================================================*/

const faqItems=document.querySelectorAll(".video-faq-item");

faqItems.forEach(item=>{

const btn=item.querySelector(".video-faq-question");

btn.addEventListener("click",()=>{

faqItems.forEach(f=>{

if(f!==item){

f.classList.remove("active");

}

});

item.classList.toggle("active");

});

});

/*=========================================================
                PORTFOLIO FILTER
=========================================================*/

const filterButtons=document.querySelectorAll(".video-portfolio-filter button");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

});

});

/*=========================================================
            SCROLL ANIMATION
=========================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

document.querySelectorAll(

".video-service-card,\
.video-process-card,\
.video-portfolio-card,\
.video-testimonial-card,\
.video-why-card"

).forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

/*=========================================================
            FLOATING IMAGE EFFECT
=========================================================*/

const heroImage=document.querySelector(".video-image-card");

window.addEventListener("mousemove",(e)=>{

if(!heroImage) return;

const x=(window.innerWidth/2-e.clientX)/45;

const y=(window.innerHeight/2-e.clientY)/45;

heroImage.style.transform=

`rotateY(${x}deg) rotateX(${-y}deg)`;

});

window.addEventListener("mouseleave",()=>{

if(heroImage){

heroImage.style.transform="rotateY(0deg) rotateX(0deg)";

}

});

});