/*==================================================
TERMS & CONDITIONS PAGE
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

/*==================================================
HERO PARALLAX
==================================================*/

const hero=document.querySelector(".terms-image");

if(hero){

hero.addEventListener("mousemove",(e)=>{

const rect=hero.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/30;

const rotateX=-(y-rect.height/2)/30;

hero.style.transform=

`perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)`;

});

hero.addEventListener("mouseleave",()=>{

hero.style.transform="";

});

}

/*==================================================
SCROLL REVEAL
==================================================*/

const revealItems=document.querySelectorAll(

".terms-card,.feature-card,.service-card,.payment-card,.property-card,.refund-card,.liability-card,.third-party-card,.contact-card,.cta-box"

);

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

revealItems.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});

/*==================================================
SIDEBAR SMOOTH SCROLL
==================================================*/

const links=document.querySelectorAll(".sidebar-card a");

links.forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(

link.getAttribute("href")

);

if(target){

window.scrollTo({

top:target.offsetTop-100,

behavior:"smooth"

});

}

});

});

/*==================================================
ACTIVE SIDEBAR
==================================================*/

const sections=document.querySelectorAll(".terms-card");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-180;

if(window.scrollY>=top){

current=section.id;

}

});

links.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*==================================================
READING PROGRESS
==================================================*/

const progress=document.getElementById("progressBar");

if(progress){

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-

document.documentElement.clientHeight;

const percent=(scrollTop/height)*100;

progress.style.width=percent+"%";

});

}

/*==================================================
SCROLL TO TOP
==================================================*/

const scrollBtn=document.getElementById("scrollTop");

if(scrollBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollBtn.classList.add("show");

}else{

scrollBtn.classList.remove("show");

}

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*==================================================
FEATURE CARD GLOW
==================================================*/

document.querySelectorAll(".feature-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,
rgba(37,99,235,.08),
white 45%)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="#fff";

});

});

/*==================================================
SERVICE CARD TILT
==================================================*/

document.querySelectorAll(".service-card").forEach(card=>{

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
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==================================================
RIPPLE BUTTON
==================================================*/

document.querySelectorAll(".cta-btn").forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

ripple.className="ripple";

const rect=button.getBoundingClientRect();

ripple.style.left=e.clientX-rect.left+"px";

ripple.style.top=e.clientY-rect.top+"px";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*==================================================
COUNT REVISION NUMBERS
==================================================*/

document.querySelectorAll(".revision-card h1").forEach(counter=>{

const target=parseInt(counter.innerText);

if(isNaN(target)) return;

let count=0;

const timer=setInterval(()=>{

count++;

counter.innerText=count;

if(count>=target){

clearInterval(timer);

}

},35);

});

/*==================================================
TIMELINE HOVER
==================================================*/

document.querySelectorAll(".timeline-item").forEach(item=>{

item.addEventListener("mouseenter",()=>{

item.style.transform="translateX(10px)";

});

item.addEventListener("mouseleave",()=>{

item.style.transform="translateX(0px)";

});

});

/*==================================================
PAGE LOADER
==================================================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.classList.add("hide");

setTimeout(()=>{

loader.remove();

},500);

}

});

});