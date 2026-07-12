/*=========================================
BLOG PAGE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
    HERO PARALLAX
    =====================================*/

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        heroImage.addEventListener("mousemove", (e) => {

            const rect = heroImage.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 35;
            const rotateX = -(y - rect.height / 2) / 35;

            heroImage.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        heroImage.addEventListener("mouseleave", () => {

            heroImage.style.transform = "";

        });

    }

    /*=====================================
    CATEGORY BUTTONS
    =====================================*/

    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

        });

    });

    /*=====================================
    BLOG SEARCH
    =====================================*/

    const searchInput = document.getElementById("blogSearch");
    const blogCards = document.querySelectorAll(".blog-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            blogCards.forEach(card => {

                const title =
                    card.querySelector("h3").innerText.toLowerCase();

                card.style.display =
                    title.includes(value) ? "block" : "none";

            });

        });

    }

    /*=====================================
    SCROLL REVEAL
    =====================================*/

    const revealElements = document.querySelectorAll(

        ".blog-card,.sidebar-widget,.newsletter-box"

    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(item => {

        item.classList.add("hidden");

        revealObserver.observe(item);

    });

    /*=====================================
    NEWSLETTER
    =====================================*/

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email =
                newsletterForm.querySelector("input");

            if (email.value.trim() === "") {

                alert("Please enter your email.");

                return;

            }

            alert("🎉 Thanks for subscribing!");

            newsletterForm.reset();

        });

    }

    /*=====================================
    PAGINATION
    =====================================*/

    const pageButtons =
        document.querySelectorAll(".page-number");

    pageButtons.forEach(button => {

        button.addEventListener("click", () => {

            pageButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });

    /*=====================================
    SCROLL TO TOP
    =====================================*/

    const scrollBtn =
        document.getElementById("scrollTop");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                scrollBtn.classList.add("show");

            } else {

                scrollBtn.classList.remove("show");

            }

        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*=====================================
    READING PROGRESS
    =====================================*/

    const progressBar =
        document.getElementById("progressBar");

    if (progressBar) {

        window.addEventListener("scroll", () => {

            const scrollTop =
                document.documentElement.scrollTop;

            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                (scrollTop / height) * 100;

            progressBar.style.width =
                progress + "%";

        });

    }

    /*=====================================
    PAGE LOADER
    =====================================*/

    const loader =
        document.getElementById("loader");

    window.addEventListener("load", () => {

        if (loader) {

            loader.classList.add("hide");

            setTimeout(() => {

                loader.remove();

            }, 500);

        }

    });

    /*=====================================
    RIPPLE EFFECT
    =====================================*/

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            const rect =
                this.getBoundingClientRect();

            ripple.className = "ripple";

            ripple.style.left =
                e.clientX - rect.left + "px";

            ripple.style.top =
                e.clientY - rect.top + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*=====================================
    BLOG CARD HOVER
    =====================================*/

    blogCards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            card.style.background =

                `radial-gradient(circle at ${x}px ${y}px,
                rgba(37,99,235,.06),
                white 45%)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#fff";

        });

    });

    /*=====================================
    IMAGE HOVER
    =====================================*/

    document.querySelectorAll(".blog-image img").forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

    });

});