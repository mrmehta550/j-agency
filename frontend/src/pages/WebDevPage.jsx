import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WebDevPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Custom Web Development & Web App Services | Magencystudio";
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How long does it take to build a website?",
      a: "A standard business website takes 2–4 weeks depending on sitemap size. Complex custom web applications with admin panels can require 6–8 weeks to design, develop, and deploy.",
    },
    {
      q: "Will my website be mobile responsive?",
      a: "Yes. Every website we build is fully responsive and optimized for screen resolutions from 320px smartphones up to large widescreen desktops.",
    },
    {
      q: "Do you provide SEO optimization?",
      a: "Absolutely. We write semantic HTML tags, optimize asset assets to pass Core Web Vitals, and configure initial meta tags for Google indexing.",
    },
    {
      q: "Do you offer website maintenance plans?",
      a: "Yes, we provide ongoing maintenance plans covering server monitoring, database back-ups, dependency upgrades, and layout edits.",
    },
  ];

  return (
    <main>
      {/* WEB DEVELOPMENT HERO */}
      <section className="svc-hero web-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content web-reveal web-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-code"></i>
                Premium Web Development
              </span>

              <h1>
                Build Fast, Secure &
                <span> Scalable Websites</span>
              </h1>

              <p>
                We build high-performance business websites, enterprise web applications, SaaS platforms and custom digital solutions that help businesses scale and grow faster.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Clean Code Architecture</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Responsive Design</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>High-Speed Loading</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Enterprise Security</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/booking" className="svc-btn-primary">
                  Book Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#portfolio" className="svc-btn-secondary">
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="svc-hero-visual web-reveal web-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/web-development/hero1.jpg"
                  alt="Web Development Team Mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-code"></i>
                  </div>
                  <div>
                    <h5>Clean Code</h5>
                    <p>Tailored Solutions</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <div>
                    <h5>Responsive</h5>
                    <p>Mobile-Optimized</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h5>Secure</h5>
                    <p>SSL & Encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS STRIP */}
      <section className="svc-stats-strip">
        <div className="container">
          <div className="svc-stats-wrapper">
            <div className="svc-stat-item">
              <h3 className="web-counter">250+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="web-counter">120+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="web-counter">3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="web-counter">98%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD (SERVICES) */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">What We Build</span>
            <h2>Complete Web Development <span>Solutions For Every Scale</span></h2>
            <p>From custom lead-generation websites to enterprise platforms, we design robust products using the latest tech stacks.</p>
          </div>

          <div className="svc-grid-3 web-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-globe"></i>
              </div>
              <h3>Business Website</h3>
              <p>Professional business websites that establish market credibility, explain your services, and generate quality inbound leads.</p>
              <ul>
                <li>SEO-Optimized Layouts</li>
                <li>Speed Performance</li>
                <li>Contact & Maps Setup</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3>Web Applications</h3>
              <p>Interactive web software tailored to automate your operations, featuring user logins, dashboards, and databases.</p>
              <ul>
                <li>Custom Workflows</li>
                <li>Admin Panels</li>
                <li>API Integrations</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
              <h3>E-Commerce</h3>
              <p>Fully functional online storefronts designed to showcase products, manage orders, and process payments securely.</p>
              <ul>
                <li>Payment Gateways</li>
                <li>Inventory Control</li>
                <li>Cart Optimization</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-window-maximize"></i>
              </div>
              <h3>Landing Pages</h3>
              <p>High-converting single-page layouts designed to support advertising campaigns and convert traffic into customers.</p>
              <ul>
                <li>Focused Message</li>
                <li>Strong Call-To-Action</li>
                <li>Split Testing Setup</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <h3>CMS Development</h3>
              <p>Web designs powered by easy-to-use content management platforms, giving you complete editing control of pages.</p>
              <ul>
                <li>WordPress Customization</li>
                <li>Headless CMS Setup</li>
                <li>Blog Management</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-code-branch"></i>
              </div>
              <h3>API Integration</h3>
              <p>Seamless connection between your website and third-party systems, databases, CRM portals, or payment services.</p>
              <ul>
                <li>RESTful Standards</li>
                <li>Secured Webhooks</li>
                <li>Data Sync Routines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Why M Agency</span>
            <h2>We Build Products That <span>Drive Commercial Value</span></h2>
            <p>Our developers combine modern technical execution with clean typography to build platforms that convert users.</p>
          </div>

          <div className="svc-grid-4 web-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Speed Performance</h3>
              <p>Optimized for Core Web Vitals, ensuring quick page loads to retain visitors.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-mobile-screen"></i>
              </div>
              <h3>Fluid Responsive</h3>
              <p>Perfect rendering across all mobile, tablet, and widescreen layouts.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3>Robust Security</h3>
              <p>Modern authentication and secure server configuration protocols.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>Dedicated Support</h3>
              <p>Ongoing monitoring and regular upgrades to keep your site updated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Our Process</span>
            <h2>From Blueprint <span>to Live Launch</span></h2>
            <p>We work in structured phases to ensure code quality, transparency, and timely delivery.</p>
          </div>

          <div className="svc-process-grid web-reveal">
            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">01</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3>Discovery</h3>
              <p>We analyze your business, customer target, and feature objectives.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">02</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-pen-ruler"></i>
              </div>
              <h3>Planning</h3>
              <p>Create database architectures, sitemaps, and visual wireframes.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">03</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3>Development</h3>
              <p>Front-end and back-end developers write clean, modular markup.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">04</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-vial-circle-check"></i>
              </div>
              <h3>Testing</h3>
              <p>Quality checks on page speed, mobile wrapping, and link states.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">05</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3>Launch</h3>
              <p>Deploy to production hosting with secure nameserver redirects.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">06</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>Support</h3>
              <p>Continuous monitoring, updates and general website support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES stack */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Our Tech Stack</span>
            <h2>Robust Technologies <span>We Build With</span></h2>
            <p>We choose scalable, secure, and modern technologies matching the industry standard.</p>
          </div>

          <div className="svc-tech-grid web-reveal">
            <div className="svc-tech-card">
              <img src="/images/services/web-development/python.jpg" alt="Python Programming" />
              <h3>Python</h3>
              <p>Data & Logic</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/django.jpg" alt="Django Web Framework" />
              <h3>Django</h3>
              <p>Secure Backend</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/react.jpg" alt="React JS library" />
              <h3>React JS</h3>
              <p>Interactive UI</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/nextjs.jpg" alt="Next.js framework" />
              <h3>Next.js</h3>
              <p>SEO & Speed</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/docker.jpg" alt="Docker deployment" />
              <h3>Docker</h3>
              <p>DevOps</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/aws.jpg" alt="AWS hosting" />
              <h3>AWS</h3>
              <p>Cloud Security</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/nodejs.jpg" alt="Node JS runtime" />
              <h3>Node JS</h3>
              <p>JS Runtime</p>
            </div>
            <div className="svc-tech-card">
              <img src="/images/services/web-development/php.jpg" alt="PHP Backend" />
              <h3>PHP</h3>
              <p>CMS Platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS / CASE STUDIES */}
      <section className="svc-section" id="portfolio">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Case Studies</span>
            <h2>Recent Projects <span>We've Delivered</span></h2>
            <p>See how we help businesses build premium platforms that scale efficiently.</p>
          </div>

          <div className="svc-portfolio-grid web-reveal">
            <div className="svc-portfolio-card">
              <img src="/images/services/web-development/finance.jpg" alt="Finance Dashboard mockup" />
              <div className="svc-portfolio-overlay">
                <span>Corporate Website</span>
                <h3>Finance Platform</h3>
              </div>
            </div>

            <div className="svc-portfolio-card">
              <img src="/images/services/web-development/f-cloth.jpg" alt="eCommerce Fashion App mockup" />
              <div className="svc-portfolio-overlay">
                <span>E-Commerce</span>
                <h3>Luxe Fashion Store</h3>
              </div>
            </div>

            <div className="svc-portfolio-card">
              <img src="/images/services/web-development/ai.jpg" alt="AI Assistant mockup" />
              <div className="svc-portfolio-overlay">
                <span>AI SaaS</span>
                <h3>AI Business Assistant</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Pricing Plans</span>
            <h2>Flexible Packages <span>For Every Business Scale</span></h2>
            <p>Affordable project pricing for startups, corporate brands, and custom software systems.</p>
          </div>

          <div className="svc-pricing-grid web-reveal">
            <div className="svc-pricing-card">
              <h3>Starter</h3>
              <p className="logo-service-plan-description">Best for startups and landing page builders.</p>
              <div className="price">₹9,999</div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Up to 5 Pages</li>
                <li><i className="fa-solid fa-check"></i> Responsive Design</li>
                <li><i className="fa-solid fa-check"></i> Contact Form Integration</li>
                <li><i className="fa-solid fa-check"></i> Basic SEO Optimization</li>
                <li><i className="fa-solid fa-check"></i> 1 Month Support</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Get Started</Link>
            </div>

            <div className="svc-pricing-card">
              <div className="svc-pricing-popular">Most Popular</div>
              <h3>Professional</h3>
              <p className="logo-service-plan-description">Ideal package for corporate scaling.</p>
              <div className="price">₹39,999</div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Unlimited Pages</li>
                <li><i className="fa-solid fa-check"></i> Admin Dashboard Setup</li>
                <li><i className="fa-solid fa-check"></i> CMS Integration</li>
                <li><i className="fa-solid fa-check"></i> Advanced SEO Tools</li>
                <li><i className="fa-solid fa-check"></i> Core Speed Audit</li>
                <li><i className="fa-solid fa-check"></i> 3 Months Support</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Book Consultation</Link>
            </div>

            <div className="svc-pricing-card">
              <h3>Enterprise</h3>
              <p className="logo-service-plan-description">Bespoke software systems and LLM applications.</p>
              <div className="price">Custom</div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Custom Web Software</li>
                <li><i className="fa-solid fa-check"></i> Custom LLM Integrations</li>
                <li><i className="fa-solid fa-check"></i> Enterprise Cloud Deploy</li>
                <li><i className="fa-solid fa-check"></i> Database Sharding</li>
                <li><i className="fa-solid fa-check"></i> 24/7 SLA Backing</li>
                <li><i className="fa-solid fa-check"></i> Dedicated Developer Team</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">Testimonials</span>
            <h2>What Our <span>Clients Say</span></h2>
            <p>Our customers trust M Agency to build scalable, secure, and fast websites.</p>
          </div>

          <div className="svc-testimonial-grid web-reveal">
            <div className="svc-testimonial-card">
              <div className="svc-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p>&quot;Magencystudio transformed our outdated business website into a modern, fast platform. Our inbound leads grew by over 60% in two months.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/web-development/client1.png" alt="Puna Anderson CEO TechNova" />
                <div>
                  <h4>Puna Anderson</h4>
                  <span>CEO, TechNova</span>
                </div>
              </div>
            </div>

            <div className="svc-testimonial-card">
              <div className="svc-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p>&quot;The team built our eCommerce store ahead of schedule and with secure checkouts. Communication was fast and transparent.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/web-development/client2.png" alt="Sarah Williams Founder Luxe" />
                <div>
                  <h4>Sarah Williams</h4>
                  <span>Founder, Luxe Fashion</span>
                </div>
              </div>
            </div>

            <div className="svc-testimonial-card">
              <div className="svc-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p>&quot;Their web development and API integration skills are top-notch. They integrated our RAG chatbots with zero downtime.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/web-development/client3.png" alt="Michael Lee CTO SmartAI" />
                <div>
                  <h4>Michael Lee</h4>
                  <span>CTO, SmartAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading web-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Find answers to common questions about our custom web design and application development services.</p>
          </div>

          <div className="svc-faq-wrapper web-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item web-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question web-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer web-faq-answer" style={{ display: "block" }}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="svc-cta">
        <div className="svc-cta-bg">
          <span className="svc-cta-blob"></span>
        </div>

        <div className="container">
          <div className="svc-cta-wrapper web-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Build a Fast, <span>High-Converting Platform?</span></h2>
            <p>Book a consultation call with our engineering team to design and develop your custom web solution.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>SEO Best Practices</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Clean Coding Standard</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Unlimited Consults</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/booking" className="svc-btn-primary">
                Book Consultation Call
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To Developer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
