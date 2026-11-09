import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api, API_BASE_URL } from '../api/client';
import SEO from '../components/SEO';

export default function HomePage() {
  const [topBlogs, setTopBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    api.getBlogs({ page_size: 3 })
      .then((res) => {
        if (isMounted && res.ok && res.data) {
          setTopBlogs(res.data.top_blogs || res.data.results?.slice(0, 3) || []);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingBlogs(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic Scroll for Full-Width Hero Hands
  const [touchProgress, setTouchProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Smooth progression from scrollY 0 to 260px
          const maxScroll = 260;
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          setTouchProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal & Counter animations matching index.js
  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    // Reveal animation
    const revealElements = rootEl.querySelectorAll('.home-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('home-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // Counter animation
    const counterElements = rootEl.querySelectorAll('.home-counter');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            if (counter.dataset.countStarted === 'true') return;
            counter.dataset.countStarted = 'true';

            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1600;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress * (2 - progress);
              const currentVal = Math.floor(easeProgress * target);

              counter.textContent = currentVal.toLocaleString() + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = target.toLocaleString() + suffix;
              }
            };

            requestAnimationFrame(updateCount);
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.1 }
    );
    counterElements.forEach((el) => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [topBlogs]);

  const scrollToAnchor = (id, e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const getImageUrl = (img) => {
    if (!img) return '/images/portfolio/project-1.jpg';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (img.startsWith('/media/')) return `${API_BASE_URL}${img}`;
    if (img.startsWith('/')) return img;
    return `${API_BASE_URL}/media/${img}`;
  };

  return (
    <div ref={containerRef}>
      <SEO
        title="Magency Studio — AI Development, Web Design & Digital Marketing Agency"
        description="Magency Studio is a premier digital agency building high-performance websites, custom AI solutions, mobile apps, UI/UX designs, and data-driven marketing."
        canonical="https://www.magencystudio.in/"
      />

      {/*=========================================
          1. HERO SECTION
          ==========================================*/}
      <section className="home-hero">
        <div className="home-hero-bg"></div>
        <div className="home-hero-orb home-hero-orb-1"></div>
        <div className="home-hero-orb home-hero-orb-2"></div>

        {/* Full-Width Dynamic Hands with Entrance & Floating Animations */}
        <div className="home-machina-hand-wrapper home-machina-left-wrapper">
          <div className="home-machina-hand-float home-machina-float-human">
            <div
              className="home-machina-hand-inner"
              style={{
                transform: `translateX(-${(1 - touchProgress) * 160}px)`,
              }}
            >
              <img
                src="/images/hero-hand-human-left.png"
                alt="Human Hand"
                className="home-machina-hand-img"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="home-machina-hand-wrapper home-machina-right-wrapper">
          <div className="home-machina-hand-float home-machina-float-robot">
            <div
              className="home-machina-hand-inner"
              style={{
                transform: `translateX(${(1 - touchProgress) * 160}px)`,
              }}
            >
              <img
                src="/images/hero-hand-robot-right.png"
                alt="Robot Hand"
                className="home-machina-hand-img"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Center Ambient Orb & Spark */}
        <div className="home-machina-orb"></div>
        <div
          className="home-machina-spark"
          style={{
            opacity: touchProgress >= 0.4 ? (touchProgress - 0.4) / 0.6 : 0,
            transform: `translate(-50%, -50%) scale(${0.3 + touchProgress * 0.9})`,
          }}
        ></div>

        <div className="home-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="home-hero-grid">
            <div className="home-hero-content home-reveal home-revealed">
              <span className="home-hero-tag">
                <i className="fa-solid fa-sparkles"></i>
                A Full-Service Digital Agency
              </span>

              <h1>
                <span className="hero-title-mask">
                  <span className="hero-title-line-1">Building Digital Products</span>
                </span>
                <span className="hero-title-mask">
                  <span className="hero-title-line-2">That Turn Visitors Into</span>{' '}
                  <span className="hero-title-gradient"><span>Customers</span></span>
                </span>
              </h1>

              <p>
                We help modern businesses grow and scale with custom high-converting websites, AI automation, custom software, and digital marketing strategies that deliver measurable revenue.
              </p>

              <div className="home-hero-buttons">
                <a
                  href="#services"
                  className="home-btn-primary"
                  onClick={(e) => scrollToAnchor('services', e)}
                >
                  Explore Services
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
                <a
                  href="#portfolio"
                  className="home-btn-outline"
                  onClick={(e) => scrollToAnchor('portfolio', e)}
                >
                  <i className="fa-solid fa-play"></i>
                  View Portfolio
                </a>
              </div>
            </div>

            {/* MachinaFusion Reference Bottom Bar */}
            <div className="home-machina-bottom-bar">
              <div className="home-machina-bottom-prompt">
                <strong>Prompt Engineering</strong>
                Bridging the gap between humanity and robotics for a creative, more connected future.
              </div>
              <div className="home-machina-pills">
                <span className="home-machina-pill">Algorithm</span>
                <span className="home-machina-pill">AI Automation</span>
                <span className="home-machina-pill">Web Architecture</span>
                <span className="home-machina-pill">Robotics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          2. TRUSTED BY SECTION
          ==========================================*/}
      <section className="home-trusted">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Trusted Worldwide</span>
            <h2>Built on Global Industry Standards</h2>
            <p>We build with the design, engineering, and security principles adopted by world-class software teams.</p>
          </div>

          <div className="home-logo-slider">
            <div className="home-logo-track">
              <div className="home-logo-group">
                <div className="home-logo-item"><img src="/images/logos/google.svg" alt="Google" /></div>
                <div className="home-logo-item"><img src="/images/logos/microsoft.svg" alt="Microsoft" /></div>
                <div className="home-logo-item"><img src="/images/logos/meta.svg" alt="Meta" /></div>
                <div className="home-logo-item"><img src="/images/logos/netflix.svg" alt="Netflix" /></div>
                <div className="home-logo-item"><img src="/images/logos/spotify.svg" alt="Spotify" /></div>
                <div className="home-logo-item"><img src="/images/logos/slack.svg" alt="Slack" /></div>
              </div>
              <div className="home-logo-group" aria-hidden="true">
                <div className="home-logo-item"><img src="/images/logos/google.svg" alt="Google" /></div>
                <div className="home-logo-item"><img src="/images/logos/microsoft.svg" alt="Microsoft" /></div>
                <div className="home-logo-item"><img src="/images/logos/meta.svg" alt="Meta" /></div>
                <div className="home-logo-item"><img src="/images/logos/netflix.svg" alt="Netflix" /></div>
                <div className="home-logo-item"><img src="/images/logos/spotify.svg" alt="Spotify" /></div>
                <div className="home-logo-item"><img src="/images/logos/slack.svg" alt="Slack" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          3. SERVICES SECTION
          ==========================================*/}
      <section className="home-services" id="services">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Our Expertise</span>
            <h2>Solutions Built for High-Growth Brands</h2>
            <p>From scalable web applications and AI automations to performance marketing and maintenance.</p>
          </div>

          <div className="home-services-grid">
            {/* 1. Web Development */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3>Web Development</h3>
              <p>Custom, scalable, and ultra-fast web portals built with Django, React, Python, and Next.js.</p>
              <Link to="/services/web-dev/">
                Explore Web Dev
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* 2. UI/UX Design */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-palette"></i>
              </div>
              <h3>UI/UX Design</h3>
              <p>User research, interactive Figma prototypes, and complete design systems that maximize conversion.</p>
              <Link to="/services/ui-ux/">
                Explore UI/UX
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* 3. AI Solutions */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-robot"></i>
              </div>
              <h3>AI Solutions</h3>
              <p>Custom LLM chatbots, workflow automation, and RAG database architectures for smart business scaling.</p>
              <Link to="/services/ai-solution/">
                Explore AI Solutions
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* 4. Digital Marketing */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Digital Marketing</h3>
              <p>Targeted PPC ad campaigns, funnel optimization, and social advertising to generate qualified leads.</p>
              <Link to="/services/digital-marketing/">
                Explore Marketing
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* 5. SEO Optimization */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>SEO Optimization</h3>
              <p>Technical search audits, keyword architecture, and backlink strategies to rank on Page 1 of Google.</p>
              <Link to="/services/seo-optimization/">
                Explore SEO
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* 6. Logo Design */}
            <div className="home-service-card home-reveal">
              <div className="home-service-icon">
                <i className="fa-solid fa-pen-ruler"></i>
              </div>
              <h3>Logo & Brand Identity</h3>
              <p>Bespoke visual marks, typography guidelines, and brand booklets tailored to your industry.</p>
              <Link to="/services/logo-design/">
                Explore Logo Design
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          4. WHY CHOOSE US SECTION
          ==========================================*/}
      <section className="home-why-us">
        <div className="home-container">
          <div className="home-why-grid">
            <div className="home-why-content home-reveal">
              <span className="home-section-tag">Why Magencystudio</span>
              <h2>We Don't Just Build Websites. We Build Scalable Brands.</h2>
              <p>Our multidisciplinary team blends clean engineering, conversion design, and data-driven marketing to deliver products that increase client retention and drive revenue.</p>

              <div className="home-why-list">
                <div className="home-why-item">
                  <div className="home-why-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <h4>Modern UI/UX Design</h4>
                    <p>Clean, high-converting interfaces crafted in Figma.</p>
                  </div>
                </div>

                <div className="home-why-item">
                  <div className="home-why-icon">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div>
                    <h4>Lightning Performance</h4>
                    <p>Optimized for sub-second page loads and Core Web Vitals.</p>
                  </div>
                </div>

                <div className="home-why-item">
                  <div className="home-why-icon">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h4>Enterprise Security</h4>
                    <p>Security-first architecture, SSL, and automated backups.</p>
                  </div>
                </div>

                <div className="home-why-item">
                  <div className="home-why-icon">
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <div>
                    <h4>Smart AI Automations</h4>
                    <p>Integrated chatbots, RAG pipelines, and automated ops.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-why-image home-reveal">
              <img src="/images/why/dashboard.jpg" alt="Magencystudio Product Dashboard Mockup" loading="lazy" decoding="async" />
              <div className="home-experience-card">
                <h2>360°</h2>
                <span>Digital Solutions</span>
              </div>
              <div className="home-clients-card">
                <h2>100%</h2>
                <span>Commitment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          5. PORTFOLIO SHOWCASE
          ==========================================*/}
      <section className="home-portfolio" id="portfolio">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Featured Work</span>
            <h2>Proven Results Across Industries</h2>
            <p>Take a look at some of the web platforms, mobile apps, and branding identities we've shipped for clients.</p>
          </div>

          <div className="home-portfolio-grid">
            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-1.jpg" loading="lazy" decoding="async" alt="Enterprise AI Assistant Platform" />
              <div className="home-card-content">
                <span>AI Platform</span>
                <h4>Enterprise AI Automation Suite</h4>
              </div>
            </div>

            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-2.jpg" loading="lazy" decoding="async" alt="E-Commerce Fashion Store" />
              <div className="home-card-content">
                <span>E-Commerce</span>
                <h4>Luxury Fashion Marketplace</h4>
              </div>
            </div>

            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-3.jpg" loading="lazy" decoding="async" alt="Hospital Management System" />
              <div className="home-card-content">
                <span>Healthcare</span>
                <h4>Hospital Portal & Scheduling</h4>
              </div>
            </div>

            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-4.jpg" loading="lazy" decoding="async" alt="Student Education Portal" />
              <div className="home-card-content">
                <span>EdTech</span>
                <h4>Interactive Learning Platform</h4>
              </div>
            </div>

            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-5.jpg" loading="lazy" decoding="async" alt="Banking Dashboard" />
              <div className="home-card-content">
                <span>FinTech</span>
                <h4>FinFlow Banking Analytics</h4>
              </div>
            </div>

            <div className="home-project-card home-reveal">
              <img src="/images/portfolio/project-6.jpg" loading="lazy" decoding="async" alt="Commercial SaaS Promo" />
              <div className="home-card-content">
                <span>Video & Media</span>
                <h4>SaaS Product Commercial Reel</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          6. PROCESS SECTION
          ==========================================*/}
      <section className="home-process">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Our Process</span>
            <h2>A Proven 6-Step Workflow</h2>
            <p>Every project follows a structured methodology to ensure transparency, velocity, and quality deliverables.</p>
          </div>

          <div className="home-process-wrapper">
            <div className="home-process-card home-reveal">
              <div className="home-step-number">01</div>
              <div className="home-process-icon"><i className="fa-solid fa-comments"></i></div>
              <h3>Discovery</h3>
              <p>Auditing business objectives, target users, and competitive gaps.</p>
            </div>

            <div className="home-process-card home-reveal">
              <div className="home-step-number">02</div>
              <div className="home-process-icon"><i className="fa-solid fa-pen-ruler"></i></div>
              <h3>Planning</h3>
              <p>Structuring interactive wireframes, data models, and sitemaps.</p>
            </div>

            <div className="home-process-card home-reveal">
              <div className="home-step-number">03</div>
              <div className="home-process-icon"><i className="fa-solid fa-laptop-code"></i></div>
              <h3>Development</h3>
              <p>Writing clean, maintainable backend code and modern frontend views.</p>
            </div>

            <div className="home-process-card home-reveal">
              <div className="home-step-number">04</div>
              <div className="home-process-icon"><i className="fa-solid fa-vial"></i></div>
              <h3>Testing</h3>
              <p>Rigorous QA testing, responsive audits, and security vulnerability scans.</p>
            </div>

            <div className="home-process-card home-reveal">
              <div className="home-step-number">05</div>
              <div className="home-process-icon"><i className="fa-solid fa-rocket"></i></div>
              <h3>Launch</h3>
              <p>Smooth production rollout, cloud DNS configuration, and live monitoring.</p>
            </div>

            <div className="home-process-card home-reveal">
              <div className="home-step-number">06</div>
              <div className="home-process-icon"><i className="fa-solid fa-headset"></i></div>
              <h3>Support</h3>
              <p>Continuous monitoring, regular updates, and ongoing technical care.</p>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          7. TECHNOLOGY STACK
          ==========================================*/}
      <section className="home-technology">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Tech Stack</span>
            <h2>Powered by Industry-Leading Technologies</h2>
            <p>We choose reliable, scalable frameworks suited for modern high-performance web products.</p>
          </div>

          <div className="home-tech-grid">
            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-brands fa-python"></i></div>
              <h3>Python</h3>
              <p>Backend & AI Logic</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-solid fa-leaf"></i></div>
              <h3>Django</h3>
              <p>Secure Web Apps</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-brands fa-react"></i></div>
              <h3>React</h3>
              <p>Interactive Interfaces</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-brands fa-node-js"></i></div>
              <h3>Node.js</h3>
              <p>Fast Real-Time APIs</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-solid fa-robot"></i></div>
              <h3>AI & LLMs</h3>
              <p>RAG & Agents</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-brands fa-aws"></i></div>
              <h3>AWS Cloud</h3>
              <p>Scalable Infrastructure</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-solid fa-database"></i></div>
              <h3>PostgreSQL</h3>
              <p>Relational Databases</p>
            </div>

            <div className="home-tech-card home-reveal">
              <div className="home-tech-logo"><i className="fa-brands fa-docker"></i></div>
              <h3>Docker</h3>
              <p>Containerized DevOps</p>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          8. CLIENT TESTIMONIALS
          ==========================================*/}
      <section className="home-testimonials">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Client Reviews</span>
            <h2>What Our Clients Say</h2>
            <p>Founders and marketing leaders share their experience working with Magencystudio.</p>
          </div>

          <div className="home-testimonial-slider">
            <div className="home-testimonial-track">
              <div className="home-testimonial-card home-reveal">
                <div className="home-quote"><i className="fa-solid fa-quote-left"></i></div>
                <p className="home-testimonial-text">
                  "Magencystudio transformed our entire web experience and automated our customer onboarding. The speed and quality exceeded all expectations."
                </p>
                <div className="home-rating">★★★★★</div>
                <div className="home-client">
                  <img src="/images/services/logo/client1.jpg" loading="lazy" decoding="async" alt="Mohan Singh" />
                  <div>
                    <h4>Mohan Singh</h4>
                    <span>CEO, Techio Global</span>
                  </div>
                </div>
              </div>

              <div className="home-testimonial-card home-reveal">
                <div className="home-quote"><i className="fa-solid fa-quote-left"></i></div>
                <p className="home-testimonial-text">
                  "Flawless UI, fast turnaround, and proactive communication. Our conversion rates increased by 40% within the first month of launch."
                </p>
                <div className="home-rating">★★★★★</div>
                <div className="home-client">
                  <img src="/images/services/logo/client2.jpg" loading="lazy" decoding="async" alt="Sarah Johnson" />
                  <div>
                    <h4>Sarah Johnson</h4>
                    <span>Founder, FinFlow Apps</span>
                  </div>
                </div>
              </div>

              <div className="home-testimonial-card home-reveal">
                <div className="home-quote"><i className="fa-solid fa-quote-left"></i></div>
                <p className="home-testimonial-text">
                  "Their AI chatbot and backend integration cut down our support workload by over 60%. Absolute top-tier engineering talent."
                </p>
                <div className="home-rating">★★★★★</div>
                <div className="home-client">
                  <img src="/images/services/logo/client3.jpg" loading="lazy" decoding="async" alt="Michael Brown" />
                  <div>
                    <h4>Michael Brown</h4>
                    <span>Director, CloudTech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          9. HIGH-CONVERTING FINAL CTA
          ==========================================*/}
      <section className="home-cta">
        <div className="home-container">
          <div className="home-cta-wrapper">
            <div className="home-cta-left home-reveal">
              <span className="home-section-tag">Let's Work Together</span>
              <h2>Ready to Build Something Remarkable?</h2>
              <p>Whether you need a high-converting website, custom AI integration, mobile app, or search optimization, our team is ready to deliver.</p>
              <div className="home-cta-buttons">
                <Link to="/booking/" className="home-btn-primary">
                  Book Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <Link to="/contact/" className="home-btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="home-cta-right home-reveal">
              <div className="home-cta-card">
                <div className="home-cta-icon"><i className="fa-solid fa-rocket"></i></div>
                <div>
                  <h3>Fast Kickoff</h3>
                  <p>Receive your project proposal within 24 hours.</p>
                </div>
              </div>

              <div className="home-cta-card">
                <div className="home-cta-icon"><i className="fa-solid fa-headset"></i></div>
                <div>
                  <h3>24/7 Dedicated Support</h3>
                  <p>Direct communication with our engineering leads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          10. LATEST BLOGS (DYNAMIC API)
          ==========================================*/}
      <section className="home-latest-blogs">
        <div className="home-container">
          <div className="home-section-header home-reveal">
            <span className="home-section-tag">Latest Insights</span>
            <h2>Articles & Industry Analysis</h2>
            <p>Read our latest deep-dives on Web Design, Artificial Intelligence, SEO, and Digital Growth.</p>
          </div>

          <div className="home-blog-grid">
            {topBlogs.length > 0 ? (
              topBlogs.map((blog) => (
                <article key={blog.id} className="home-blog-card home-reveal">
                  <div className="home-blog-image">
                    <img src={getImageUrl(blog.image)} alt={blog.title} loading="lazy" decoding="async" />
                    {blog.category && (
                      <span className="home-blog-category">{blog.category.name}</span>
                    )}
                  </div>

                  <div className="home-blog-content">
                    <div className="home-blog-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i>{' '}
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {blog.read_time && (
                        <span>
                          <i className="fa-regular fa-clock"></i> {blog.read_time} min read
                        </span>
                      )}
                    </div>

                    <h3>{blog.title}</h3>
                    <p>{blog.short_description}</p>

                    <Link to={`/blog/${blog.slug}/`}>
                      Read Article
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))
            ) : !loadingBlogs ? (
              <p className="home-no-blogs">Explore our blog to read the latest tech insights.</p>
            ) : null}
          </div>

          <div className="home-blog-btn home-reveal">
            <Link to="/blogs/" className="home-btn-primary">
              View All Articles
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
