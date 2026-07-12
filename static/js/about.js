document.addEventListener("DOMContentLoaded",()=>{

const image=document.querySelector(".about-image");

image.addEventListener("mousemove",(e)=>{

const rect=image.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/30;

const rotateX=-(y-rect.height/2)/30;

image.style.transform=
`perspective(1000px)
rotateY(${rotateY}deg)
rotateX(${rotateX}deg)`;

});

image.addEventListener("mouseleave",()=>{

image.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});

/*===========================
MISSION CARD EFFECT
============================*/

document.querySelectorAll(".mission-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/25;

const rotateX=-(y-rect.height/2)/25;

card.style.transform=
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});


/*=================================
        COUNTER
==================================*/

const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

let current=0;

const speed=target/80;

function update(){

current+=speed;

if(current<target){

counter.innerText=Math.ceil(current);

requestAnimationFrame(update);

}
else{

counter.innerText=target+"+";

}

}

update();

observer.unobserve(counter);

}

});

});

counters.forEach(counter=>{

observer.observe(counter);

});



/*=================================
        WHY CARD HOVER
==================================*/

document.querySelectorAll(".why-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/20;

const rotateX=-(y-rect.height/2)/20;

card.style.transform=

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-12px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});


/*=========================
SCROLL REVEAL
=========================*/

const revealItems = document.querySelectorAll(
".step,.team-card"
);

const revealObserver = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.2
});

revealItems.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});

/*==========================
Technology Slider
===========================*/

const technologyTrack =
document.querySelector(".technology-track");

if(technologyTrack){

technologyTrack.addEventListener("mouseenter",()=>{

technologyTrack.style.animationPlayState="paused";

});

technologyTrack.addEventListener("mouseleave",()=>{

technologyTrack.style.animationPlayState="running";

});

}

/*===========================
    TESTIMONIAL SLIDER
============================*/

const testimonialTrack = document.getElementById("testimonialTrack");

if(testimonialTrack){

    const cards = document.querySelectorAll(".testimonial-card");

    const next = document.querySelector(".next-btn");

    const prev = document.querySelector(".prev-btn");

    let index = 0;

    function getCardWidth(){

        return cards[0].offsetWidth + 30;

    }

    function moveSlider(){

        testimonialTrack.style.transform =
        `translateX(-${index * getCardWidth()}px)`;

    }

    function nextSlide(){

        index++;

        if(index > cards.length - 1){

            index = 0;

        }

        moveSlider();

    }

    function prevSlide(){

        index--;

        if(index < 0){

            index = cards.length - 1;

        }

        moveSlider();

    }

    let auto = setInterval(nextSlide,3500);

    next.onclick = ()=>{

        clearInterval(auto);

        nextSlide();

        auto = setInterval(nextSlide,3500);

    }

    prev.onclick = ()=>{

        clearInterval(auto);

        prevSlide();

        auto = setInterval(nextSlide,3500);

    }

    testimonialTrack.addEventListener("mouseenter",()=>{

        clearInterval(auto);

    });

    testimonialTrack.addEventListener("mouseleave",()=>{

        auto = setInterval(nextSlide,3500);

    });

    window.addEventListener("resize",moveSlider);

}
