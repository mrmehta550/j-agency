import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from '../components/SEO';

export default function MaintenancePage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What is considered a "Tech Edit Hour"?',
      a: "Tech Edit Hours cover updates to text copy, replacing graphics, adding blog posts, creating forms, fixing CSS margins, or troubleshooting plugin errors.",
    },
    {
      q: "Where are backups stored securely?",
      a: "All backups are compiled, compressed, and stored across secure, redundant Amazon Web Services (AWS) S3 bucket directories, completely isolated from your host server.",
    },
    {
      q: "How fast do you fix styling breaks?",
      a: "Depending on your plan tier, we resolve database crashes or layout visual bugs within 1 to 24 hours of notification, backed by SLA guarantees.",
    },
    {
      q: "Can I cancel my subscription?",
      a: "Yes. All maintenance plans are billed month-to-month, allowing you to cancel or upgrade your service tier at any billing cycle with zero penalty fees.",
    },
  ];

  return (
    <main>
      <SEO
        title="Website Maintenance & Support Plans | Magency Studio"
        description="Keep your website fast, secure, and up-to-date with 24/7 uptime monitoring, security patching, core updates, automated backups, and emergency tech support."
        canonical="https://www.magencystudio.in/services/maintenance"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/web-dev' }, { name: 'Website Maintenance', url: '/services/maintenance' }]}
        schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Website Maintenance & Technical Support',
        description: 'Keep your website fast, secure, and up-to-date with 24/7 uptime monitoring, security patching, core updates, automated backups, and emergency tech support.',
        provider: {
          '@type': 'Organization',
          name: 'Magency Studio',
          url: 'https://www.magencystudio.in/',
        },
        areaServed: 'Worldwide',
      }}
      />

      {/* MAINTENANCE HERO */}
      <section className="svc-hero maint-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content maint-reveal maint-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-shield-halved"></i>
                Trusted Maintenance Partner
              </span>

              <h1>
                Professional Website
                <span> Maintenance Support</span>
              </h1>

              <p>
                We keep your site secure, lightning-fast, and available 24/7. We handle daily backups, software updates, malware scans, speed audits, and core layout support.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>24/7 Server Monitoring</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Daily Cloud Backups</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Malware Scanning & Security</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Regular Performance Tuning</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/booking" className="svc-btn-primary">
                  Book Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#pricing" className="svc-btn-secondary">
                  View Maintenance Pricing
                </a>
              </div>
            </div>

            <div className="svc-hero-visual maint-reveal maint-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/mt/mtdash.jpg"
                  alt="Engineer maintaining website mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <div>
                    <h5>Daily Backup</h5>
                    <p>Secured Cloud Vaults</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div>
                    <h5>24/7 Uptime</h5>
                    <p>Server Status checks</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-user-shield"></i>
                  </div>
                  <div>
                    <h5>Firewalls</h5>
                    <p>Malware Protection</p>
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
          <div className="svc-heading maint-reveal">
            <span className="svc-section-tag">Our Services</span>
            <h2>Complete Website <span>Maintenance Solutions</span></h2>
            <p>We handle all aspects of backend support, database scaling, and frontend fixes to protect your traffic.</p>
          </div>

          <div className="svc-grid-3 maint-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Advanced Security</h3>
              <p>Enforcing firewalls, setting secure SSH parameters, screening for malware, and installing SSL certificates.</p>
              <ul>
                <li>SSL Configurations</li>
                <li>Malware Screening</li>
                <li>Firewall Upgrades</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </div>
              <h3>Cloud Backup Logs</h3>
              <p>Auto-scheduling daily website database and asset backups to secure cloud vaults, ensuring quick rollback access.</p>
              <ul>
                <li>Daily Database Dumps</li>
                <li>Static Asset Archiving</li>
                <li>1-Click Restoration</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <h3>Updates & Patches</h3>
              <p>Keeping server dependencies, CMS plug-ins, theme layouts, and libraries updated to secure codebase endpoints.</p>
              <ul>
                <li>CMS Version Upgrades</li>
                <li>Plug-in Checks</li>
                <li>Dependency Patching</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              <h3>Speed Optimization</h3>
              <p>Monitoring server response times, fixing slow database queries, setting up CDNs, and compressing heavy static assets.</p>
              <ul>
                <li>Database Tuning</li>
                <li>CDN Config setups</li>
                <li>Asset Compress audits</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h3>Content & Tech Edits</h3>
              <p>Updating text blocks, replacing outdated hero images, fixing broken link clicks, and formatting layout spacing edits.</p>
              <ul>
                <li>Text Block updates</li>
                <li>Broken Link fixes</li>
                <li>Asset Replacements</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-file-waveform"></i>
              </div>
              <h3>Performance Audits</h3>
              <p>Receive monthly reports detailing uptime levels, completed backup records, technical warnings, and page response speeds.</p>
              <ul>
                <li>Monthly Uptime Reports</li>
                <li>Bug Fix Summaries</li>
                <li>SEO Crawling checks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="svc-section svc-section--alt" id="pricing">
        <div className="container">
          <div className="svc-heading maint-reveal">
            <span className="svc-section-tag">Pricing Plans</span>
            <h2>Affordable Maintenance <span>Packages</span></h2>
            <p>Flexible packages designed to support personal web templates, landing pages, and enterprise web portals.</p>
          </div>

          <div className="svc-pricing-grid maint-reveal">
            <div className="svc-pricing-card">
              <h3>Basic Support</h3>
              <p className="logo-service-plan-description">Best for personal websites and simple blogs.</p>
              <div className="price">₹1,999<span>/mo</span></div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Weekly Cloud Backups</li>
                <li><i className="fa-solid fa-check"></i> Monthly Security Scan</li>
                <li><i className="fa-solid fa-check"></i> Core Plugin Updates</li>
                <li><i className="fa-solid fa-check"></i> Email Support (48h SLA)</li>
                <li><i className="fa-solid fa-check"></i> 1 Tech Edit Hour / mo</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Get Started</Link>
            </div>

            <div className="svc-pricing-card">
              <div className="svc-pricing-popular">Most Popular</div>
              <h3>Pro Care</h3>
              <p className="logo-service-plan-description">Ideal package for active corporate platforms.</p>
              <div className="price">₹4,999<span>/mo</span></div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Daily Cloud Backups</li>
                <li><i className="fa-solid fa-check"></i> 24/7 Uptime Monitoring</li>
                <li><i className="fa-solid fa-check"></i> Weekly Malware Scans</li>
                <li><i className="fa-solid fa-check"></i> Priority Email Support (12h SLA)</li>
                <li><i className="fa-solid fa-check"></i> 5 Tech Edit Hours / mo</li>
                <li><i className="fa-solid fa-check"></i> Monthly Performance Reports</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Choose Plan</Link>
            </div>

            <div className="svc-pricing-card">
              <h3>Enterprise Care</h3>
              <p className="logo-service-plan-description">Bespoke support for high-traffic web applications.</p>
              <div className="price">₹12,999<span>/mo</span></div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Hourly Cloud Backups</li>
                <li><i className="fa-solid fa-check"></i> 24/7 SLA Instant Response</li>
                <li><i className="fa-solid fa-check"></i> Continuous Security Protection</li>
                <li><i className="fa-solid fa-check"></i> Slack & Phone Support (1h SLA)</li>
                <li><i className="fa-solid fa-check"></i> Unlimited Tech Edit Hours</li>
                <li><i className="fa-solid fa-check"></i> Dedicated Database Admin</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading maint-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Find answers to common questions about backup files, updates, and service SLAs.</p>
          </div>

          <div className="svc-faq-wrapper maint-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item maint-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question maint-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer maint-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper maint-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Secure Your <span>Digital Presence?</span></h2>
            <p>Schedule a call with our server administrators to audit your current platform security and speeds.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Free Speed Reports</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Free Security Audits</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Cancel Subscriptions Anytime</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/booking" className="svc-btn-primary">
                Request Free Audit
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
