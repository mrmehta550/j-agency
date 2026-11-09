import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    // Scroll reveal
    const revealItems = rootEl.querySelectorAll(
      '.about-process-card, .about-team-card, .about-why-card, .about-value-card'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => {
      item.classList.add('hidden');
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <SEO
        title="About Magency Studio — Digital Innovation & Engineering Team"
        description="Learn about Magency Studio's mission, values, and expert team of developers, designers, and AI specialists creating transformative digital products."
        canonical="https://www.magencystudio.in/about"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'About Us', url: '/about' }]}
      />

      {/* ==========================================
          ABOUT HERO
      =========================================== */}
      <section className="about-hero">
        <div className="about-orb about-orb-1"></div>

        <div className="about-container">
          <div className="about-hero-content">
            <span className="about-hero-badge">
              <i className="fa-solid fa-sparkles"></i>
              About Magencystudio
            </span>

            <h1>
              Building <span>Digital Experiences</span> That Inspire, Convert & Grow.
            </h1>

            <p>
              Magencystudio is a full-service digital agency helping startups, brands, and enterprises create exceptional websites, AI-powered solutions, mobile applications, and scalable digital products that deliver measurable business growth.
            </p>

            <div className="about-hero-buttons">
              <Link to="/booking/" className="about-hero-primary-btn">
                Book Free Consultation
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact/" className="about-hero-secondary-btn">
                Let's Talk
              </Link>
            </div>

            {/* Stats Row */}
            <div className="about-hero-stats">
              <div className="about-stat-item">
                <h2>01</h2>
                <h4>One Vision</h4>
                <span>Building better digital experiences.</span>
              </div>
              <div className="about-stat-item">
                <h2>360°</h2>
                <h4>Digital Solutions</h4>
                <span>Design, development and digital growth.</span>
              </div>
              <div className="about-stat-item">
                <h2>100%</h2>
                <h4>Commitment</h4>
                <span>Focused on quality and client success.</span>
              </div>
              <div className="about-stat-item">
                <h2>∞</h2>
                <h4>Possibilities</h4>
                <span>Turning ambitious ideas into digital products.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SCROLL INDICATOR
      =========================================== */}
      <section className="about-hero-scroll">
        <div className="about-container">
          <div className="about-scroll-box">
            <span>Scroll To Explore</span>
            <i className="fa-solid fa-arrow-down-long"></i>
          </div>
        </div>
      </section>

      {/* ==========================================
          WHO WE ARE
      =========================================== */}
      <section className="about-who-we-are">
        <div className="about-container">
          <div className="about-who-grid">
            {/* Left Side Image */}
            <div className="about-who-image">
              <div className="about-image-wrapper">
                <OptimizedImage src="/images/about/team-work.jpg" alt="Magencystudio Team" />
              </div>
              <div className="about-experience-card">
                <h2>360°</h2>
                <span>Digital Excellence</span>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="about-who-content">
              <span className="about-section-badge">Who We Are</span>
              <h2>Your Trusted Technology Partner For Modern Digital Solutions.</h2>
              <p>
                At <strong>Magencystudio</strong>, we believe technology should help businesses grow—not make things more complicated. Our team combines creativity, engineering, and strategic thinking to build digital products that solve real business challenges.
              </p>
              <p>
                From custom websites and AI-powered automation to enterprise software, branding, and digital marketing, we create scalable solutions designed for long-term success.
              </p>

              {/* Features list */}
              <div className="about-who-features">
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <h4>Business-Driven Strategy</h4>
                    <p>Every project starts with understanding your goals before writing a single line of code.</p>
                  </div>
                </div>
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <h4>End-to-End Development</h4>
                    <p>Design, development, deployment, maintenance, and continuous improvement.</p>
                  </div>
                </div>
                <div className="about-feature-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <div>
                    <h4>Long-Term Partnership</h4>
                    <p>We don't just deliver projects—we help businesses scale with technology.</p>
                  </div>
                </div>
              </div>

              <div className="about-who-buttons">
                <Link to="/services/web-dev/" className="about-btn-primary">Explore Services</Link>
                <Link to="/booking/" className="about-btn-outline">Start Your Project</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          OUR CORE VALUES
      =========================================== */}
      <section className="about-core-values">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-badge">Our Core Values</span>
            <h2>Principles That Drive Every Project We Build</h2>
            <p>
              At Magencystudio, every solution is built around innovation, transparency, quality, and long-term partnerships. These values define how we work and how we help businesses grow.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>We continuously explore modern technologies, AI, automation, and creative strategies to deliver future-ready digital solutions.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Client First</h3>
              <p>Every decision we make focuses on delivering measurable business value and creating long-term client relationships.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-medal"></i>
              </div>
              <h3>Quality</h3>
              <p>We build scalable, secure, and reliable digital products that exceed industry standards.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3>Transparency</h3>
              <p>Open communication, honest timelines, and clear project updates from start to finish.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Trust & Security</h3>
              <p>We follow secure development practices to protect your business, users, and digital assets.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Continuous Growth</h3>
              <p>We believe every launch is just the beginning. We help businesses grow through continuous improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          OUR PROCESS
      =========================================== */}
      <section className="about-our-process">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-badge">Our Process</span>
            <h2>From Vision To Reality</h2>
            <p>
              Every successful project follows a proven workflow. Our structured development process ensures quality, transparency, and exceptional results from start to finish.
            </p>
          </div>

          <div className="about-process-wrapper">
            <div className="about-process-card">
              <div className="about-process-number">01</div>
              <div className="about-process-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <h3>Discovery</h3>
              <p>We understand your business, audience, objectives, and challenges to define a clear project vision.</p>
            </div>
            <div className="about-process-card">
              <div className="about-process-number">02</div>
              <div className="about-process-icon"><i className="fa-solid fa-sitemap"></i></div>
              <h3>Strategy</h3>
              <p>We create a roadmap, choose the right technologies, and define milestones for successful execution.</p>
            </div>
            <div className="about-process-card">
              <div className="about-process-number">03</div>
              <div className="about-process-icon"><i className="fa-solid fa-pen-ruler"></i></div>
              <h3>Design</h3>
              <p>Beautiful UI/UX designs are crafted to provide intuitive and engaging user experiences.</p>
            </div>
            <div className="about-process-card">
              <div className="about-process-number">04</div>
              <div className="about-process-icon"><i className="fa-solid fa-code"></i></div>
              <h3>Development</h3>
              <p>Our engineers develop scalable, secure, and high-performance digital products.</p>
            </div>
            <div className="about-process-card">
              <div className="about-process-number">05</div>
              <div className="about-process-icon"><i className="fa-solid fa-shield"></i></div>
              <h3>Testing</h3>
              <p>Every feature undergoes rigorous quality assurance, security, and performance testing.</p>
            </div>
            <div className="about-process-card">
              <div className="about-process-number">06</div>
              <div className="about-process-icon"><i className="fa-solid fa-rocket"></i></div>
              <h3>Launch & Growth</h3>
              <p>After deployment, we continue monitoring, optimizing, and supporting your business for long-term success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          WHY CHOOSE MAGENCYSTUDIO
      =========================================== */}
      <section className="about-why-choose">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-badge">Why Choose Us</span>
            <h2>Why Businesses Choose Magencystudio</h2>
            <p>
              We don't just build websites or software—we create digital solutions that help businesses increase efficiency, strengthen their brand, and achieve sustainable growth.
            </p>
          </div>

          <div className="about-why-grid">
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-laptop-code"></i></div>
              <h3>End-to-End Development</h3>
              <p>From strategy and UI/UX to development, deployment, and maintenance—we handle every stage of your digital journey.</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-brain"></i></div>
              <h3>AI-Powered Innovation</h3>
              <p>We leverage modern AI technologies and automation to streamline business operations and improve efficiency.</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-gauge-high"></i></div>
              <h3>Performance Focused</h3>
              <p>Every solution is optimized for speed, scalability, accessibility, and an exceptional user experience.</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <h3>Secure & Reliable</h3>
              <p>We follow modern security standards and best development practices to keep your business protected.</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-users"></i></div>
              <h3>Transparent Collaboration</h3>
              <p>Regular updates, clear communication, and complete transparency throughout every phase of your project.</p>
            </div>
            <div className="about-why-card">
              <div className="about-why-icon"><i className="fa-solid fa-headset"></i></div>
              <h3>Long-Term Partnership</h3>
              <p>Our relationship doesn't end after launch. We provide ongoing support, maintenance, and continuous improvements.</p>
            </div>
          </div>

          {/* Bottom Highlight Box */}
          <div className="about-why-highlight">
            <div className="about-highlight-content">
              <h3>Your Growth Is Our Priority</h3>
              <p>
                We combine creativity, technology, and strategic thinking to build digital products that help businesses grow, engage customers, and stay ahead of the competition.
              </p>
            </div>
            <Link to="/booking/" className="about-highlight-btn">
              Start Your Project
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          OUR TEAM
      =========================================== */}
      <section className="about-team-section">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-badge">Our Team</span>
            <h2>Meet The People Behind Magencystudio</h2>
            <p>
              Our team combines creativity, engineering, and business strategy to deliver digital experiences that help brands grow.
            </p>
          </div>

          <div className="about-team-grid">
            <div className="about-team-card">
              <div className="about-team-image">
                <OptimizedImage src="/images/about/vishal.jpeg" alt="Vishal Kumar" />
              </div>
              <div className="about-team-content">
                <span className="about-team-role">Founder &  Developer</span>
                <h3>Vishal Kumar</h3>
                <p>Passionate about building scalable web applications, AI-powered solutions, and helping businesses grow through technology.</p>
                <div className="about-team-skills">
                  <span>Python</span>
                  <span>Django</span>
                  <span>AI</span>
                </div>
                {/* <div className="about-team-social">
                  <a href="https://www.linkedin.com/in/mrmehta550" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="https://www.github.com/in/mrmehta550" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
                  <a href="mailto:vishalmehta9117@gmail.com"><i className="fa-solid fa-envelope"></i></a>
                </div> */}
              </div>
            </div>

            <div className="about-team-card">
              <div className="about-team-image">
                <OptimizedImage src="/images/about/jashan.jpeg" alt="Jashanpreet Kaur" />
              </div>
              <div className="about-team-content">
                <span className="about-team-role">CEO & Project Manager</span>
                <h3>Jashanpreet Kaur</h3>
                <p>Focused on delivering exceptional client experiences, managing projects, and ensuring every product meets business goals.</p>
                <div className="about-team-skills">
                  <span>Management</span>
                  <span>Strategy</span>
                  <span>UI/UX</span>
                </div>
                {/* <div className="about-team-social">
                  <a href="https://www.linkedin.com/in/jashanpreet-kaur-194a2528a" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="https://www.github.com/in/Jashanpreet-kaur" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a>
                  <a href="#"><i className="fa-solid fa-envelope"></i></a>
                </div> */}
              </div>
            </div>

            <div className="about-team-card">
              <div className="about-team-image">
                <OptimizedImage src="/images/about/mawa.png" alt="Development Team" />
              </div>
              <div className="about-team-content">
                <span className="about-team-role">AI Automation & Workflow Specialist</span>
                <h3>Mawa Ahtsham</h3>
                <p> Designing intelligent automation workflows and AI-powered solutions
                  to streamline business operations and improve efficiency.</p>
                <div className="about-team-skills">
                  <span>n8n</span>
                  <span>AI Agents</span>
                  <span>Workflow Automation</span>
                  <span>API Integration</span>
                </div>
                {/* <div className="about-team-social">
                  <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#"><i className="fa-brands fa-github"></i></a>
                  <a href="#"><i className="fa-solid fa-envelope"></i></a>
                </div> */}
              </div>
            </div>

            <div className="about-team-card">
              <div className="about-team-image">
                <OptimizedImage src="/images/about/designer.jpg" alt="Design Team" />
              </div>
              <div className="about-team-content">
                <span className="about-team-role">UI / UX Designer</span>
                <h3>Design Team</h3>
                <p>Creating modern, user-friendly, and conversion-focused interfaces for digital products.</p>
                <div className="about-team-skills">
                  <span>Figma</span>
                  <span>Adobe XD</span>
                  <span>Branding</span>
                </div>
                {/* <div className="about-team-social">
                  <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#"><i className="fa-brands fa-github"></i></a>
                  <a href="#"><i className="fa-solid fa-envelope"></i></a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CALL TO ACTION
      =========================================== */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-wrapper">
            <div className="about-cta-content">
              <span className="about-section-badge">Let's Build Something Amazing</span>
              <h2>Ready To Transform Your Business With Digital Innovation?</h2>
              <p>
                Whether you're launching a startup, redesigning your website, developing a custom application, or integrating AI into your business, Magencystudio is here to help you achieve your goals with scalable and future-ready solutions.
              </p>

              <div className="about-cta-features">
                <div className="about-cta-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Free Project Consultation</span>
                </div>
                <div className="about-cta-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Transparent Pricing</span>
                </div>
                <div className="about-cta-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Fast Project Delivery</span>
                </div>
              </div>

              <div className="about-cta-buttons">
                <Link to="/booking/" className="about-cta-btn-primary">
                  <i className="fa-solid fa-calendar-check"></i>
                  Book Free Consultation
                </Link>
                <Link to="/contact/" className="about-cta-btn-secondary">
                  <i className="fa-solid fa-paper-plane"></i>
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="about-cta-card">
              <div className="about-cta-card-header">
                <span>PROJECT OVERVIEW</span>
              </div>
              <div className="about-cta-card-body">
                <div className="about-overview-item">
                  <span>Discovery & Strategy</span>
                  <strong>✔ Included</strong>
                </div>
                <div className="about-overview-item">
                  <span>UI / UX Design</span>
                  <strong>✔ Included</strong>
                </div>
                <div className="about-overview-item">
                  <span>Development</span>
                  <strong>✔ Included</strong>
                </div>
                <div className="about-overview-item">
                  <span>Testing & QA</span>
                  <strong>✔ Included</strong>
                </div>
                <div className="about-overview-item">
                  <span>Deployment</span>
                  <strong>✔ Included</strong>
                </div>
                <div className="about-overview-item">
                  <span>Post Launch Support</span>
                  <strong>✔ Included</strong>
                </div>
              </div>
              <div className="about-cta-card-footer">
                <h3>Let's Turn Your Vision Into Reality</h3>
                <p>Build a powerful digital product with a trusted technology partner.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
