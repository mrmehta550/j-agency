import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("information");

  useEffect(() => {
    document.title = "Privacy Policy | Magency Studio";

    const handleScroll = () => {
      const sections = [
        "information",
        "usage",
        "cookies",
        "security",
        "sharing",
        "retention",
        "rights",
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
      <section className="privacy-hero">
        <div className="privacy-container">
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/"><i className="fa-solid fa-house"></i> Home</Link>
            <i className="fa-solid fa-angle-right"></i>
            <span className="privacy-crumb-active">Privacy Policy</span>
          </nav>

          <div className="privacy-hero-grid">
            <div className="privacy-hero-content">
              <span className="privacy-hero-badge">
                <i className="fa-solid fa-shield-halved"></i>
                Privacy & Data Protection
              </span>

              <h1>Privacy <span>Policy</span></h1>

              <p>
                At <strong>Magency Studio</strong>, we respect your privacy and are committed to protecting the personal information you share with us. Whether you engage us for web development, UI/UX design, AI automations, or digital marketing, your data is handled responsibly and securely.
              </p>

              <div className="privacy-hero-meta">
                <div className="privacy-meta-card">
                  <i className="fa-solid fa-calendar-days"></i>
                  <div>
                    <h4>Last Updated</h4>
                    <p>July 20, 2026</p>
                  </div>
                </div>

                <div className="privacy-meta-card">
                  <i className="fa-solid fa-lock"></i>
                  <div>
                    <h4>Data Security</h4>
                    <p>256-bit SSL Encrypted</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="privacy-hero-image">
              <img src="/images/privacy/privacy-hero.jpg" alt="Magency Studio Privacy Policy" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW PILLS */}
      <section className="privacy-overview-section">
        <div className="privacy-container">
          <div className="privacy-overview-grid">
            <div className="privacy-overview-card">
              <div className="privacy-overview-icon">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <h3>Zero Data Selling</h3>
              <p>We will never sell, rent, or trade your personal or business data to third-party brokers.</p>
            </div>

            <div className="privacy-overview-card">
              <div className="privacy-overview-icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3>Encrypted Storage</h3>
              <p>Industry-standard TLS encryption across all client communications and credentials.</p>
            </div>

            <div className="privacy-overview-card">
              <div className="privacy-overview-icon">
                <i className="fa-solid fa-cookie-bite"></i>
              </div>
              <h3>Cookie Control</h3>
              <p>Transparent analytics cookies used strictly for optimizing user experience and performance.</p>
            </div>

            <div className="privacy-overview-card">
              <div className="privacy-overview-icon">
                <i className="fa-solid fa-file-shield"></i>
              </div>
              <h3>GDPR & CCPA Compliant</h3>
              <p>Built with global data privacy compliance and individual data subject rights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN PRIVACY CONTENT WITH SIDEBAR */}
      <section className="privacy-body-section">
        <div className="privacy-container">
          <div className="privacy-body-layout">
            <aside className="privacy-toc-sidebar">
              <h3>Table of Contents</h3>
              <ul className="privacy-toc-list">
                <li>
                  <a
                    href="#information"
                    className={activeSection === "information" ? "active" : ""}
                    onClick={(e) => scrollTo("information", e)}
                  >
                    1. Information We Collect
                  </a>
                </li>
                <li>
                  <a
                    href="#usage"
                    className={activeSection === "usage" ? "active" : ""}
                    onClick={(e) => scrollTo("usage", e)}
                  >
                    2. How We Use Data
                  </a>
                </li>
                <li>
                  <a
                    href="#cookies"
                    className={activeSection === "cookies" ? "active" : ""}
                    onClick={(e) => scrollTo("cookies", e)}
                  >
                    3. Cookies & Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#security"
                    className={activeSection === "security" ? "active" : ""}
                    onClick={(e) => scrollTo("security", e)}
                  >
                    4. Data Security
                  </a>
                </li>
                <li>
                  <a
                    href="#sharing"
                    className={activeSection === "sharing" ? "active" : ""}
                    onClick={(e) => scrollTo("sharing", e)}
                  >
                    5. Third-Party Sharing
                  </a>
                </li>
                <li>
                  <a
                    href="#retention"
                    className={activeSection === "retention" ? "active" : ""}
                    onClick={(e) => scrollTo("retention", e)}
                  >
                    6. Data Retention
                  </a>
                </li>
                <li>
                  <a
                    href="#rights"
                    className={activeSection === "rights" ? "active" : ""}
                    onClick={(e) => scrollTo("rights", e)}
                  >
                    7. Your Privacy Rights
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={(e) => scrollTo("contact", e)}
                  >
                    8. Contact Data Officer
                  </a>
                </li>
              </ul>
            </aside>

            <div className="privacy-main-content">
              <article id="information" className="privacy-article-card">
                <span className="privacy-section-tag">Section 1</span>
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information necessary to provide design consultations, execute client projects, and ensure website security. This includes:
                </p>
                <ul>
                  <li><strong>Personal Identification:</strong> Name, work email address, phone number, and company name when submitting contact or consultation booking forms.</li>
                  <li><strong>Project Specifications:</strong> Technical requirements, brand assets, API keys, and project documentation provided during discovery sprints.</li>
                  <li><strong>Usage Analytics:</strong> IP addresses, browser types, referral sources, and page view metrics collected anonymously via performance cookies.</li>
                </ul>
              </article>

              <article id="usage" className="privacy-article-card">
                <span className="privacy-section-tag">Section 2</span>
                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the collected information solely for legitimate business purposes, including:
                </p>
                <ul>
                  <li>Delivering bespoke web, mobile, UI/UX, and AI development services.</li>
                  <li>Responding to quote requests, consultation bookings, and technical inquiries.</li>
                  <li>Processing milestone payments and issuing official business invoices.</li>
                  <li>Enhancing website speed, Core Web Vitals, and user accessibility.</li>
                </ul>
                <div className="privacy-notice-box">
                  <p>We do not train public AI models on private client code, credentials, or proprietary datasets.</p>
                </div>
              </article>

              <article id="cookies" className="privacy-article-card">
                <span className="privacy-section-tag">Section 3</span>
                <h2>3. Cookies & Tracking Technologies</h2>
                <p>
                  Our website uses essential and performance cookies to remember session preferences, analyze traffic flow, and ensure seamless navigation. You can adjust your browser settings to decline non-essential cookies at any time without impacting core site availability.
                </p>
              </article>

              <article id="security" className="privacy-article-card">
                <span className="privacy-section-tag">Section 4</span>
                <h2>4. Data Security & Storage</h2>
                <p>
                  We employ enterprise-grade administrative, technical, and physical security measures to safeguard your information against unauthorized access, disclosure, alteration, or loss. All form submissions transmit over SSL/TLS 256-bit encrypted channels.
                </p>
              </article>

              <article id="sharing" className="privacy-article-card">
                <span className="privacy-section-tag">Section 5</span>
                <h2>5. Third-Party Service Providers</h2>
                <p>
                  We may share necessary data with trusted third-party infrastructure providers (e.g. cloud hosting servers, payment gateways, transactional email APIs) strictly to fulfill project requirements. These providers are bound by strict confidentiality and data protection agreements.
                </p>
              </article>

              <article id="retention" className="privacy-article-card">
                <span className="privacy-section-tag">Section 6</span>
                <h2>6. Data Retention Policy</h2>
                <p>
                  We retain client records and project deliverables only for as long as necessary to fulfill project requirements, provide ongoing maintenance support, and comply with legal or accounting obligations.
                </p>
              </article>

              <article id="rights" className="privacy-article-card">
                <span className="privacy-section-tag">Section 7</span>
                <h2>7. Your Privacy Rights (GDPR & CCPA)</h2>
                <p>
                  Depending on your jurisdiction, you have the right to request access to, correction of, or complete deletion of your personal data stored in our systems. To exercise any of these rights, please contact our data protection team.
                </p>
              </article>

              <article id="contact" className="privacy-article-card">
                <span className="privacy-section-tag">Section 8</span>
                <h2>8. Contact Our Data Protection Team</h2>
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please contact us.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT & ASSISTANCE BANNER */}
      <section className="privacy-help-section">
        <div className="privacy-container">
          <div className="privacy-help-wrapper">
            <h2>Have Questions About Your Data Privacy?</h2>
            <p>Our compliance team is ready to answer your data governance and confidentiality questions.</p>
            <div className="privacy-help-buttons">
              <Link to="/contact" className="privacy-btn-primary">
                Contact Privacy Team
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/booking" className="privacy-btn-outline">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
