import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCaseStudies } from "../api/client";

export default function UiUxPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Professional UI/UX Design Services | Magencystudio";
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const res = await getCaseStudies("UI/UX Design");
      if (res.ok && res.data && res.data.length > 0) {
        setCaseStudies(res.data.slice(0, 3));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What design software do you use?",
      a: "We primarily use Figma as our standard platform. This allows clients to inspect wireframes, add comments, and view interactive flows in real-time.",
    },
    {
      q: "What is a custom design system?",
      a: "A design system is a comprehensive library of style tokens (reusable buttons, color styles, form inputs, sitemap elements, and sizing parameters) that keeps branding consistent across web pages and mobile views.",
    },
    {
      q: "Can you adapt layouts from sketches?",
      a: "Yes. We can start from raw sketches, business outlines, or detailed operational wireframes and refine them into modern, conversion-focused UI layouts.",
    },
    {
      q: "How do you handle developer handoff?",
      a: "We organize our Figma canvas with proper layouts, name variables cleanly, organize vector icons, and coordinate with engineering teams to ensure pixel-perfect conversion.",
    },
  ];

  return (
    <main>
      {/* UI/UX HERO */}
      <section className="svc-hero uiux-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content uiux-reveal uiux-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-palette"></i>
                Premium UI/UX Design
              </span>

              <h1>
                Design Beautiful experiences
                <span> That Users Love</span>
              </h1>

              <p>
                We craft modern, intuitive, and conversion-focused user interfaces for web platforms, mobile applications, and SaaS systems, backed by detailed user research and strategy.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>User Research & Strategy</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Wireframes & Interactive Prototypes</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Fluid Responsive UI Layouts</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Custom Design Systems</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/booking" className="svc-btn-primary">
                  Book Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#portfolio" className="svc-btn-secondary">
                  View Case Studies
                </a>
              </div>
            </div>

            <div className="svc-hero-visual uiux-reveal uiux-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/uiux/uiux-hero.jpg"
                  alt="UI/UX Designers wireframing mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <div>
                    <h5>Mobile UI</h5>
                    <p>Pixel-Perfect App Views</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-compass-drafting"></i>
                  </div>
                  <div>
                    <h5>Prototypes</h5>
                    <p>Interactive Flows</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-palette"></i>
                  </div>
                  <div>
                    <h5>Figma Systems</h5>
                    <p>Re-usable Tokens</p>
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
              <h3>01</h3>
              <h4>One Vision</h4>
              <p>Building better digital experiences.</p>
            </div>
            <div className="svc-stat-item">
              <h3>360°</h3>
              <h4>Digital Solutions</h4>
              <p>Design, development and digital growth.</p>
            </div>
            <div className="svc-stat-item">
              <h3>100%</h3>
              <h4>Commitment</h4>
              <p>Focused on quality and client success.</p>
            </div>
            <div className="svc-stat-item">
              <h3>∞</h3>
              <h4>Possibilities</h4>
              <p>Turning ambitious ideas into digital products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO (SERVICES) */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading uiux-reveal">
            <span className="svc-section-tag">Our Services</span>
            <h2>Intuitive UI/UX <span>Design Capabilities</span></h2>
            <p>We blend behavioral psychology with modern styling guidelines to build engaging digital interfaces.</p>
          </div>

          <div className="svc-grid-3 uiux-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <h3>UX Research</h3>
              <p>Detailed mapping of target customer personas, user journeys, operational gaps, and digital layout trends in your field.</p>
              <ul>
                <li>Competitor Audits</li>
                <li>User Personas</li>
                <li>Information Architecture</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-bezier-curve"></i>
              </div>
              <h3>Wireframing</h3>
              <p>Low and high-fidelity structural layouts mapped to organize information clearly before visual design begins.</p>
              <ul>
                <li>Interactive Mockups</li>
                <li>Layout Hierarchies</li>
                <li>Navigation Pathways</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </div>
              <h3>Mobile UI Design</h3>
              <p>Bespoke visual interface styling for iOS and Android apps, matching modern human interface and material guidelines.</p>
              <ul>
                <li>Pixel-Perfect Screens</li>
                <li>Gesture Controls</li>
                <li>Asset Export Kit</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3>Web UI Design</h3>
              <p>High-converting website interfaces built to reduce drop-offs, optimize lead-generation forms, and adapt beautifully to layouts.</p>
              <ul>
                <li>Responsive Layout grids</li>
                <li>Form Design Audits</li>
                <li>Typography Schemes</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-shuffle"></i>
              </div>
              <h3>Prototyping</h3>
              <p>Clickable, high-fidelity prototypes built in Figma to test workflows and transitions before committing to developer hours.</p>
              <ul>
                <li>Micro-Animations</li>
                <li>User Path Testing</li>
                <li>Developer Hand-off Sets</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-cubes"></i>
              </div>
              <h3>Design Systems</h3>
              <p>Comprehensive design libraries specifying style tokens, typography hierarchies, reusable button layouts, and color variables.</p>
              <ul>
                <li>Reusable Component Sets</li>
                <li>Figma Token Organization</li>
                <li>Style Guide Booklets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR DESIGN PROCESS */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading uiux-reveal">
            <span className="svc-section-tag">Our Process</span>
            <h2>Our Creative <span>UI/UX Workflow</span></h2>
            <p>A structured approach helps us align with your product objectives and ensure logical page interactions.</p>
          </div>

          <div className="svc-process-grid uiux-reveal">
            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">01</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3>Research</h3>
              <p>We analyze competitor features, target demographics, and product goals.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">02</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-sitemap"></i>
              </div>
              <h3>Strategy</h3>
              <p>Draft user journeys, sitemaps, and core information architecture.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">03</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-pencil"></i>
              </div>
              <h3>Wireframes</h3>
              <p>Map low-fidelity structural cards to test information layouts.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">04</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-palette"></i>
              </div>
              <h3>Visual Design</h3>
              <p>Develop beautiful high-fidelity interfaces, color palettes, and fonts.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">05</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-bezier-curve"></i>
              </div>
              <h3>Prototype</h3>
              <p>Build high-fidelity clickable Figma flows for review and testing.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">06</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-code-commit"></i>
              </div>
              <h3>Hand-off</h3>
              <p>Deliver organized design specs and code components to dev teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS / CASE STUDIES */}
      <section className="svc-section" id="portfolio">
        <div className="container">
          <div className="svc-heading uiux-reveal">
            <span className="svc-section-tag">Case Studies</span>
            <h2>Featured UI/UX <span>Design Projects</span></h2>
            <p>Explore some of our recent visual systems built for web platforms and mobile apps.</p>
          </div>

          <div className="case-grid uiux-reveal">
            {caseStudies.length > 0 ? (
              caseStudies.map((caseItem) => (
                <article key={caseItem.id} className="case-card">
                  <div className="case-card-image">
                    <img
                      src={caseItem.image || "/images/portfolio/project-1.jpg"}
                      alt={caseItem.title}
                    />
                    <span className="case-card-category">{caseItem.category}</span>
                  </div>
                  <div className="case-card-body">
                    <h3>{caseItem.title}</h3>
                    <p>{caseItem.short_description}</p>
                    <Link to={`/case-study/${caseItem.slug}`} className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <>
                <article className="case-card">
                  <div className="case-card-image">
                    <img src="/images/portfolio/project-1.jpg" alt="App UI Mockup" />
                    <span className="case-card-category">UI/UX Design</span>
                  </div>
                  <div className="case-card-body">
                    <h3>Fintech Banking Mobile Application</h3>
                    <p>Designed end-to-end transaction flows, secure authentication systems, and customizable user profile screens.</p>
                    <Link to="/case-study" className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
                <article className="case-card">
                  <div className="case-card-image">
                    <img src="/images/portfolio/project-2.jpg" alt="SaaS Mockup" />
                    <span className="case-card-category">UI/UX Design</span>
                  </div>
                  <div className="case-card-body">
                    <h3>Enterprise Analytics Dashboard Portal</h3>
                    <p>Created interactive charting interfaces, clean data filter selectors, and cross-platform navigation layouts.</p>
                    <Link to="/case-study" className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
                <article className="case-card">
                  <div className="case-card-image">
                    <img src="/images/portfolio/project-3.jpg" alt="Web Design Mockup" />
                    <span className="case-card-category">UI/UX Design</span>
                  </div>
                  <div className="case-card-body">
                    <h3>AI Assistant SaaS Landing Platform</h3>
                    <p>Developed dynamic web design systems, interactive components mockups, and conversion funnel landing assets.</p>
                    <Link to="/case-study" className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading uiux-reveal">
            <span className="svc-section-tag">Testimonials</span>
            <h2>Trusted By <span>Design Teams Globally</span></h2>
            <p>Read client reviews about their collaboration experience with our UI/UX designers.</p>
          </div>

          <div className="svc-testimonial-grid uiux-reveal">
            <div className="svc-testimonial-card">
              <div className="svc-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p>&quot;Their wireframes and design system simplified our developer workflows. They built a unified design language that matches our operations.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client1.jpg" alt="Alex Mercer Product Lead" />
                <div>
                  <h4>Alex Mercer</h4>
                  <span>Product Lead, Velo</span>
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
              <p>&quot;The clickable high-fidelity Figma prototypes allowed us to validate page structures with users before committing developer hours.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client2.jpg" alt="Elena Rostova Director" />
                <div>
                  <h4>Elena Rostova</h4>
                  <span>Director, Prime Health</span>
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
              <p>&quot;Outstanding visual quality. They delivered a responsive and clean layout that instantly elevated our brand identity.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client3.jpg" alt="Marcus Vance CTO" />
                <div>
                  <h4>Marcus Vance</h4>
                  <span>CTO, Nexus Corp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading uiux-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Have questions before starting your interface design project? Here are our answers.</p>
          </div>

          <div className="svc-faq-wrapper uiux-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item uiux-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question uiux-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer uiux-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper uiux-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Elevate Your <span>Product Interface?</span></h2>
            <p>Work with our senior UI/UX designers to sketch, test, and build a beautiful, high-converting digital experience.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Figma Specs Included</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Interactive Prototypes</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Clear Dev Hand-off</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/booking" className="svc-btn-primary">
                Start Your Project
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To Designer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
