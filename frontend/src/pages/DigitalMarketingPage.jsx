import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DigitalMarketingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Data-Driven Digital Marketing Services | Magencystudio";
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is PPC ad management?",
      a: "Pay-Per-Click (PPC) ad management involves designing, launch monitoring, and optimizing advertising budgets on Google and social media to target queries and maximize ROI.",
    },
    {
      q: "Do you provide creative ad designs?",
      a: "Yes. Our designers create high-performing advertising graphics, banners, and copywriting copy, following modern brand guidelines.",
    },
    {
      q: "How do you track campaign conversions?",
      a: "We integrate Google Tag Manager, Google Analytics 4, Meta conversion pixels, and server-side tracking APIs to trace leads directly to their traffic source.",
    },
    {
      q: "What is a typical advertising budget?",
      a: "Budgets depend on industry competition and targeting goals. We optimize campaign structure to capture conversions matching your acquisition targets.",
    },
  ];

  return (
    <main>
      {/* DIGITAL MARKETING HERO */}
      <section className="svc-hero dm-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content dm-reveal dm-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-bullseye"></i>
                Performance-Driven Agency
              </span>

              <h1>
                Grow Traffic & Convert
                <span> More Customers</span>
              </h1>

              <p>
                We help startups, brands, and enterprises acquire qualified customers, increase traffic, optimize lead conversion, and maximize marketing ROI through data-driven campaigns.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Search Engine Marketing (SEM)</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Paid Social Ad Management</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Content Strategy & Copywriting</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Detailed Analytics & Reporting</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/contact" className="svc-btn-primary">
                  Get Free Proposal
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#services" className="svc-btn-secondary">
                  View Marketing Services
                </a>
              </div>
            </div>

            <div className="svc-hero-visual dm-reveal dm-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/dm/hero-dashboard.jpg"
                  alt="Marketing Dashboard analytics mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-square-poll-vertical"></i>
                  </div>
                  <div>
                    <h5>Paid Ads</h5>
                    <p>Targeted PPC Campaigns</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div>
                    <h5>Social Growth</h5>
                    <p>Brand Awareness</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-filter"></i>
                  </div>
                  <div>
                    <h5>Funnel Optim</h5>
                    <p>Convert Traffic</p>
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
              <h3 className="dm-counter">250+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="dm-counter">700+</h3>
              <p>Campaigns Managed</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="dm-counter">8+</h3>
              <p>Years Experience</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="dm-counter">96%</h3>
              <p>Client Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO (SERVICES) */}
      <section className="svc-section" id="services">
        <div className="container">
          <div className="svc-heading dm-reveal">
            <span className="svc-section-tag">Our Capabilities</span>
            <h2>Performance Marketing <span>Solutions</span></h2>
            <p>We combine conversion-centered copy with audience analytics to execute campaigns that deliver revenue growth.</p>
          </div>

          <div className="svc-grid-3 dm-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
              </div>
              <h3>PPC Ad Management</h3>
              <p>Managing Google Ads and Bing Campaigns targeting high-intent keywords to drive conversions and minimize spend.</p>
              <ul>
                <li>A/B Testing Setup</li>
                <li>Negative Keyword Management</li>
                <li>Target ROAS Optimization</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-share-nodes"></i>
              </div>
              <h3>Paid Social Campaigns</h3>
              <p>Developing Facebook, Instagram, and LinkedIn ads utilizing demographics and retargeting filters to acquire leads.</p>
              <ul>
                <li>Audience Retargeting maps</li>
                <li>Creative Copywriting</li>
                <li>Conversion Tracking pixels</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-file-signature"></i>
              </div>
              <h3>Content Marketing</h3>
              <p>Creating professional SEO articles, guidebooks, and copywriting assets that educate users and boost rankings.</p>
              <ul>
                <li>Lead Magnets Setup</li>
                <li>Blog Management Schedules</li>
                <li>Press Release Outreach</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <h3>Email Marketing</h3>
              <p>Designing custom email campaigns and cart-abandonment drip flows to nurture prospects and convert leads.</p>
              <ul>
                <li>Drip Campaigns setup</li>
                <li>A/B Subject Testing</li>
                <li>List Segmentation splits</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h3>Social Media Management</h3>
              <p>Organizing content calendars, managing brand feeds, and engaging with audiences to increase brand loyalty.</p>
              <ul>
                <li>Visual Feed Templates</li>
                <li>Comment Response guides</li>
                <li>Hashtag Trend mapping</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Conversion Rate Audits</h3>
              <p>Analyzing bounce rates, diagnosing layout bottlenecks, and rebuilding sitemaps to optimize conversion flows.</p>
              <ul>
                <li>Heatmap Testing Reports</li>
                <li>Form Design audits</li>
                <li>Checkout Friction Audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE M AGENCY */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading dm-reveal">
            <span className="svc-section-tag">Why M Agency</span>
            <h2>Strategic Execution <span>Focused on ROI</span></h2>
            <p>We avoid generic vanity metrics and focus on tracking total leads, acquisition costs, and customer value.</p>
          </div>

          <div className="svc-grid-3 dm-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-chart-column"></i>
              </div>
              <h3>Vanity Metrics Ignored</h3>
              <p>We focus on sales volumes and customer acquisition costs rather than simple social followers or impressions.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-flask"></i>
              </div>
              <h3>Strict A/B Testing</h3>
              <p>We test copy, banners, target groups, and funnel cards iteratively to locate optimal conversion ratios.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <h3>Transparent Reporting</h3>
              <p>Receive weekly charts detailing spend rates, traffic acquisitions, conversion totals, and ROAS performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading dm-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Find answers to common questions about our PPC campaigns and performance metrics.</p>
          </div>

          <div className="svc-faq-wrapper dm-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item dm-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question dm-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer dm-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper dm-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Maximize Your <span>Marketing ROI?</span></h2>
            <p>Schedule a marketing strategy call with our planners to review your current funnel efficiency.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Free Funnel Audits</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Tag Manager Setups</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Conversion Pixel Tuning</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/contact" className="svc-btn-primary">
                Get Free Proposal
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To Marketer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
