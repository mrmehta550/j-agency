import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    document.title = "Terms & Conditions | Magency Studio";

    const handleScroll = () => {
      const sections = [
        "introduction",
        "definitions",
        "services",
        "responsibilities",
        "payments",
        "timeline",
        "intellectual",
        "refund",
        "liability",
        "contact",
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="terms-hero">
        <div className="terms-container">
          <nav className="terms-breadcrumb" aria-label="Breadcrumb">
            <Link to="/"><i className="fa-solid fa-house"></i> Home</Link>
            <i className="fa-solid fa-angle-right"></i>
            <span className="terms-crumb-active">Terms & Conditions</span>
          </nav>

          <div className="terms-hero-grid">
            <div className="terms-hero-content">
              <span className="terms-hero-badge">
                <i className="fa-solid fa-scale-balanced"></i>
                Legal Terms & Service Agreement
              </span>

              <h1>Terms & <span>Conditions</span></h1>

              <p>
                Welcome to <strong>Magency Studio</strong>. These Terms & Conditions govern your access to our website and the use of our digital services. By accessing our website, requesting a quotation, booking a consultation, or purchasing any service, you agree to comply with these terms.
              </p>

              <div className="terms-hero-meta">
                <div className="terms-meta-card">
                  <i className="fa-solid fa-calendar-days"></i>
                  <div>
                    <h4>Last Updated</h4>
                    <p>July 20, 2026</p>
                  </div>
                </div>

                <div className="terms-meta-card">
                  <i className="fa-solid fa-file-contract"></i>
                  <div>
                    <h4>Legal Scope</h4>
                    <p>Applicable Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="terms-hero-image">
              <img src="/images/privacy/terms.jpg" alt="Magency Studio Terms & Conditions" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW PILLS */}
      <section className="terms-overview-section">
        <div className="terms-container">
          <div className="terms-overview-grid">
            <div className="terms-overview-card">
              <div className="terms-overview-icon">
                <i className="fa-solid fa-file-contract"></i>
              </div>
              <h3>Transparent Terms</h3>
              <p>Clear milestones and deliverables that protect both parties throughout the project.</p>
            </div>

            <div className="terms-overview-card">
              <div className="terms-overview-icon">
                <i className="fa-solid fa-credit-card"></i>
              </div>
              <h3>Secure Payments</h3>
              <p>Milestone-based invoicing and encrypted payment processing gateways.</p>
            </div>

            <div className="terms-overview-card">
              <div className="terms-overview-icon">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <h3>Strict Confidentiality</h3>
              <p>Your business logic, credentials, and source assets remain fully confidential.</p>
            </div>

            <div className="terms-overview-card">
              <div className="terms-overview-icon">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <h3>Legal Compliance</h3>
              <p>Operations compliant with international digital contracts and IP standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN TERMS CONTENT WITH SIDEBAR */}
      <section className="terms-body-section">
        <div className="terms-container">
          <div className="terms-body-layout">
            <aside className="terms-toc-sidebar">
              <h3>Table of Contents</h3>
              <ul className="terms-toc-list">
                <li>
                  <a
                    href="#introduction"
                    className={activeSection === "introduction" ? "active" : ""}
                    onClick={(e) => scrollTo("introduction", e)}
                  >
                    1. Introduction
                  </a>
                </li>
                <li>
                  <a
                    href="#definitions"
                    className={activeSection === "definitions" ? "active" : ""}
                    onClick={(e) => scrollTo("definitions", e)}
                  >
                    2. Key Definitions
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className={activeSection === "services" ? "active" : ""}
                    onClick={(e) => scrollTo("services", e)}
                  >
                    3. Services & Scope
                  </a>
                </li>
                <li>
                  <a
                    href="#responsibilities"
                    className={activeSection === "responsibilities" ? "active" : ""}
                    onClick={(e) => scrollTo("responsibilities", e)}
                  >
                    4. Client Obligations
                  </a>
                </li>
                <li>
                  <a
                    href="#payments"
                    className={activeSection === "payments" ? "active" : ""}
                    onClick={(e) => scrollTo("payments", e)}
                  >
                    5. Invoicing & Payments
                  </a>
                </li>
                <li>
                  <a
                    href="#timeline"
                    className={activeSection === "timeline" ? "active" : ""}
                    onClick={(e) => scrollTo("timeline", e)}
                  >
                    6. Project Timelines
                  </a>
                </li>
                <li>
                  <a
                    href="#intellectual"
                    className={activeSection === "intellectual" ? "active" : ""}
                    onClick={(e) => scrollTo("intellectual", e)}
                  >
                    7. Intellectual Property
                  </a>
                </li>
                <li>
                  <a
                    href="#refund"
                    className={activeSection === "refund" ? "active" : ""}
                    onClick={(e) => scrollTo("refund", e)}
                  >
                    8. Cancellations & Refunds
                  </a>
                </li>
                <li>
                  <a
                    href="#liability"
                    className={activeSection === "liability" ? "active" : ""}
                    onClick={(e) => scrollTo("liability", e)}
                  >
                    9. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={(e) => scrollTo("contact", e)}
                  >
                    10. Legal Inquiries
                  </a>
                </li>
              </ul>
            </aside>

            <div className="terms-main-content">
              <article id="introduction" className="terms-article-card">
                <span className="terms-section-tag">Section 1</span>
                <h2>1. Introduction</h2>
                <p>
                  These Terms & Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;, &quot;User&quot;, or &quot;You&quot;) and <strong>Magency Studio</strong> (&quot;Company&quot;, &quot;We&quot;, &quot;Our&quot;, or &quot;Us&quot;).
                </p>
                <p>
                  These Terms govern your access to and use of our website, consultation services, web development, mobile app development, branding, SEO, digital marketing, UI/UX design, AI automation, cloud solutions, and all related digital services.
                </p>
                <div className="terms-notice-box">
                  <p>By using our website or booking a project, you confirm that you have read, understood, and agreed to be bound by these legal terms.</p>
                </div>
              </article>

              <article id="definitions" className="terms-article-card">
                <span className="terms-section-tag">Section 2</span>
                <h2>2. Key Definitions</h2>
                <div className="terms-def-grid">
                  <div className="terms-def-card">
                    <i className="fa-solid fa-building"></i>
                    <h4>Company</h4>
                    <p>Refers to Magency Studio, its owners, engineers, designers, and authorized representatives.</p>
                  </div>
                  <div className="terms-def-card">
                    <i className="fa-solid fa-user"></i>
                    <h4>Client</h4>
                    <p>Any individual, startup, or enterprise commissioning our agency for digital deliverables.</p>
                  </div>
                  <div className="terms-def-card">
                    <i className="fa-solid fa-laptop-code"></i>
                    <h4>Deliverables</h4>
                    <p>The codebases, Figma designs, strategy decks, and assets produced during the project.</p>
                  </div>
                </div>
              </article>

              <article id="services" className="terms-article-card">
                <span className="terms-section-tag">Section 3</span>
                <h2>3. Services & Scope of Work</h2>
                <p>
                  Magency Studio provides digital product engineering, UI/UX design, AI integration, organic search optimization, and marketing consulting. Each project is governed by a defined Statement of Work (SOW) or quotation detailing deliverables, milestone schedules, and tech stacks.
                </p>
                <ul>
                  <li>Any features or revisions requested outside the agreed SOW will be billed as scope add-ons.</li>
                  <li>Third-party API fees, cloud hosting costs, domain registrations, and paid font licenses remain the direct responsibility of the client.</li>
                </ul>
              </article>

              <article id="responsibilities" className="terms-article-card">
                <span className="terms-section-tag">Section 4</span>
                <h2>4. Client Obligations & Content</h2>
                <p>
                  To ensure delivery velocity and milestones, clients agree to provide necessary text copy, brand guidelines, API keys, and feedback in a timely manner.
                </p>
                <p>
                  The client warrants that all text, imagery, trademarks, and assets supplied to Magency Studio are owned by the client or properly licensed. Magency Studio assumes no liability for copyright infringement resulting from client-provided materials.
                </p>
              </article>

              <article id="payments" className="terms-article-card">
                <span className="terms-section-tag">Section 5</span>
                <h2>5. Invoicing & Payment Terms</h2>
                <p>
                  Unless explicitly specified otherwise in writing, projects require an upfront deposit before work begins, with subsequent milestone payments scheduled upon completion of predefined phases (e.g. Design Approval, Beta Staging, Final Production Rollout).
                </p>
                <ul>
                  <li>Invoices are due within 7 business days of issuance.</li>
                  <li>Final production source files and server root credentials are transferred upon full settlement of the remaining invoice balance.</li>
                </ul>
              </article>

              <article id="timeline" className="terms-article-card">
                <span className="terms-section-tag">Section 6</span>
                <h2>6. Project Timelines & Delays</h2>
                <p>
                  Estimated delivery dates are provided in good faith based on the agreed specifications. Timelines may adjust if client feedback is delayed, scope modifications are introduced, or third-party platform dependencies experience outages.
                </p>
              </article>

              <article id="intellectual" className="terms-article-card">
                <span className="terms-section-tag">Section 7</span>
                <h2>7. Intellectual Property Rights</h2>
                <p>
                  Upon full payment settlement, 100% intellectual property and copyright of the custom design layouts, brand logos, and proprietary application code transfer to the client.
                </p>
                <p>
                  Magency Studio retains the right to display non-confidential project screenshots and case studies in our agency portfolio, unless an explicit Non-Disclosure Agreement (NDA) states otherwise.
                </p>
              </article>

              <article id="refund" className="terms-article-card">
                <span className="terms-section-tag">Section 8</span>
                <h2>8. Cancellations & Refunds</h2>
                <p>
                  Either party may terminate a project with written notice. In the event of early termination, the client will be invoiced for all completed hours and deliverables up to the termination date. Upfront discovery deposits are non-refundable once design and development sprints have commenced.
                </p>
              </article>

              <article id="liability" className="terms-article-card">
                <span className="terms-section-tag">Section 9</span>
                <h2>9. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, Magency Studio shall not be liable for indirect, incidental, punitive, or consequential damages resulting from third-party server downtime, cyberattacks on client hosting, or search engine algorithm shifts.
                </p>
              </article>

              <article id="contact" className="terms-article-card">
                <span className="terms-section-tag">Section 10</span>
                <h2>10. Legal Inquiries & Jurisdiction</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable business laws. If you have questions regarding our legal agreements, please contact our legal team directly.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT & ASSISTANCE BANNER */}
      <section className="terms-help-section">
        <div className="terms-container">
          <div className="terms-help-wrapper">
            <h2>Have Questions About Our Terms?</h2>
            <p>Our team is available to clarify any aspect of our service agreements, project milestones, or privacy practices.</p>
            <div className="terms-help-buttons">
              <Link to="/contact" className="terms-btn-primary">
                Contact Legal Team
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/booking" className="terms-btn-outline">
                Book Project Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
