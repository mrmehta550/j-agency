/*====================================
        HERO FLOAT EFFECT
====================================*/

const portfolioImage = document.querySelector(".portfolio-image");

if(portfolioImage){

portfolioImage.addEventListener("mousemove",(e)=>{

const rect = portfolioImage.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateY = (x - rect.width/2)/30;

const rotateX = -(y - rect.height/2)/30;

portfolioImage.style.transform =

`perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

});

portfolioImage.addEventListener("mouseleave",()=>{

portfolioImage.style.transform="perspective(1200px) rotateX(0deg) rotateY(0deg)";

});

}


/*====================================
        ACTIVE FILTER BUTTON
====================================*/

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});


/*====================================
        SCROLL REVEAL
====================================*/

const revealElements = document.querySelectorAll(

".portfolio-content,.portfolio-image,.category-bar"

);

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.2
});

revealElements.forEach(item=>{

item.classList.add("hidden");

observer.observe(item);

});
/*==========================
OFFICE CARD ANIMATION
==========================*/

const officeCards = document.querySelectorAll(".office-card");

officeCards.forEach((card)=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateX(12px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateX(0)";

});

});

/*==========================
Feature Animation
==========================*/

const featureCards =
document.querySelectorAll(".feature-card");

const featureObserver =
new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show-card");

}

});

},{
threshold:.2
});

featureCards.forEach(card=>{

card.classList.add("hide-card");

featureObserver.observe(card);

});

/*==============================
CTA Animation
===============================*/

const ctaCards=document.querySelectorAll(".cta-card");

ctaCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateX(15px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateX(0)";

});

});


/*==============================
Newsletter Validation
===============================*/

const newsletter=document.querySelector(".newsletter-form");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

const email=newsletter.querySelector("input");

if(email.value===""){

alert("Please enter your email");

return;

}

alert("Thank you for subscribing!");

newsletter.reset();

});

}
/*====================================
        CONTACT FORM
====================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const btn = document.getElementById("submitBtn");

    if (!form || !btn) return;

    let isSubmitting = false;

    form.addEventListener("submit", function (e) {

        if (isSubmitting) {
            e.preventDefault();
            return;
        }

        isSubmitting = true;

        btn.disabled = true;

        btn.style.pointerEvents = "none";

        btn.innerHTML = `
            <span class="spinner"></span>
            Sending...
        `;

    });

});
