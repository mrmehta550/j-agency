/*==================================================
PRIVACY PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
    HERO IMAGE PARALLAX
    ==========================================*/

    const heroImage = document.querySelector(".privacy-image");

    if(heroImage){

        heroImage.addEventListener("mousemove",(e)=>{

            const rect = heroImage.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width/2)/30;

            const rotateX = -(y - rect.height/2)/30;

            heroImage.style.transform =

            `perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)`;

        });

        heroImage.addEventListener("mouseleave",()=>{

            heroImage.style.transform="";

        });

    }

    /*==========================================
    SCROLL REVEAL
    ==========================================*/

    const revealItems = document.querySelectorAll(

        ".policy-card,.feature-card,.info-box,.usage-card,.cookie-card,.third-card,.right-card,.contact-card,.cta-box"

    );

    const revealObserver = new IntersectionObserver((entries)=>{

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

    /*==========================================
    SMOOTH SIDEBAR LINKS
    ==========================================*/

    const sidebarLinks = document.querySelectorAll(

        ".sidebar-card a"

    );

    sidebarLinks.forEach(link=>{

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            const target = document.querySelector(

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

    /*==========================================
    ACTIVE SIDEBAR LINK
    ==========================================*/

    const sections = document.querySelectorAll(

        ".policy-card"

    );

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top = section.offsetTop-180;

            if(window.scrollY>=top){

                current = section.getAttribute("id");

            }

        });

        sidebarLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

    /*==========================================
    READING PROGRESS
    ==========================================*/

    const progressBar=document.getElementById("progressBar");

    if(progressBar){

        window.addEventListener("scroll",()=>{

            const scrollTop=document.documentElement.scrollTop;

            const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

            const progress=(scrollTop/height)*100;

            progressBar.style.width=progress+"%";

        });

    }

    /*==========================================
    SCROLL TO TOP
    ==========================================*/

    const scrollBtn=document.getElementById("scrollTop");

    if(scrollBtn){

        window.addEventListener("scroll",()=>{

            if(window.scrollY>500){

                scrollBtn.classList.add("show");

            }

            else{

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

    /*==========================================
    FEATURE CARD HOVER
    ==========================================*/

    document.querySelectorAll(".feature-card").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.background=

            `radial-gradient(circle at ${x}px ${y}px,
            rgba(37,99,235,.08),
            #ffffff 45%)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.background="#ffffff";

        });

    });

    /*==========================================
    INFO BOX HOVER
    ==========================================*/

    document.querySelectorAll(".info-box").forEach(box=>{

        box.addEventListener("mouseenter",()=>{

            box.style.transform="translateY(-8px)";

        });

        box.addEventListener("mouseleave",()=>{

            box.style.transform="translateY(0)";

        });

    });

    /*==========================================
    CTA BUTTON RIPPLE
    ==========================================*/

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

    /*==========================================
    PAGE LOADER
    ==========================================*/

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