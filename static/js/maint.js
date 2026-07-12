document.addEventListener("DOMContentLoaded", () => {

    /*====================================
            FAQ ACCORDION
    ====================================*/

    const faqItems = document.querySelectorAll(".maintenance-faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".maintenance-faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(other => {

                if(other !== item){

                    other.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

    /*====================================
            SCROLL ANIMATION
    ====================================*/

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    document.querySelectorAll(

        ".maintenance-service-card,\
        .maintenance-feature-card,\
        .maintenance-process-card,\
        .maintenance-pricing-card,\
        .maintenance-stat-card"

    ).forEach(card=>{

        card.classList.add("hidden");

        observer.observe(card);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
            COUNTER ANIMATION
    =====================================*/

    const counters = document.querySelectorAll(".maintenance-counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = +counter.dataset.target;

            let current = 0;

            const increment = Math.ceil(target / 80);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target + "+";

                } else {

                    counter.textContent = current + "+";

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*=====================================
            PARALLAX EFFECT
    =====================================*/

    const hero = document.querySelector(".maintenance-service-hero");

    if(hero){

        hero.addEventListener("mousemove", (e) => {

            const blobs = document.querySelectorAll(".maintenance-service-blob");

            blobs.forEach((blob,index)=>{

                const speed = (index+1) * 8;

                const x = (window.innerWidth/2 - e.clientX)/speed;

                const y = (window.innerHeight/2 - e.clientY)/speed;

                blob.style.transform =
                `translate(${x}px,${y}px)`;

            });

        });

    }

    /*=====================================
            BUTTON RIPPLE
    =====================================*/

    document.querySelectorAll(

        ".maintenance-btn-primary,.maintenance-btn-outline"

    ).forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            const rect=this.getBoundingClientRect();

            const size=Math.max(rect.width,rect.height);

            ripple.style.width=size+"px";

            ripple.style.height=size+"px";

            ripple.style.left=e.clientX-rect.left-size/2+"px";

            ripple.style.top=e.clientY-rect.top-size/2+"px";

            ripple.className="maintenance-ripple";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

});