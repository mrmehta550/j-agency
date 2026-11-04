import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCaseStudies } from "../api/client";

export default function SeoPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Search Engine Optimization (SEO) Services | Magencystudio";
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const res = await getCaseStudies("SEO");
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
      q: "How long does it take to see SEO results?",
      a: "Typically, noticeable organic visibility changes require 3–6 months. SEO is a long-term strategy built on domain trust, index optimization, and content relevance.",
    },
    {
      q: "Do you use white-hat link building?",
      a: "Yes. We strictly execute manual outreach guest blogging, authority references, and local directory listings, avoiding risky private blog networks (PBNs) or spam links.",
    },
    {
      q: "What metrics do you track monthly?",
      a: "We analyze organic keyword ranking tracks, average search position, total click volume inside Search Console, Google Analytics goals, and crawling warnings.",
    },
    {
      q: "Do you fix core site speed?",
      a: "Yes, as part of our technical SEO optimization phase, we compress static file sizes, optimize code structure, configure caching, and format sitemaps.",
    },
  ];

  return (
    <main>
      {/* SEO HERO */}
      <section className="svc-hero seo-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content seo-reveal seo-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-chart-line"></i>
                #1 SEO Agency For Growth
              </span>

              <h1>
                Rank Higher On
                <span> Google Search</span>
              </h1>

              <p>
                We help startups, local brands, and enterprises dominate search engine rankings with data-driven SEO strategies, technical site audits, content marketing, and premium link building.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Technical Site Audits</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Keyword Intent Mapping</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>High-Authority Backlinks</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Content Strategy Plans</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/booking" className="svc-btn-primary">
                  Get Free SEO Audit
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <Link to="/contact" className="svc-btn-secondary">
                  Talk To SEO Expert
                </Link>
              </div>
            </div>

            <div className="svc-hero-visual seo-reveal seo-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/seo/hero.jpg"
                  alt="SEO Analytics Dashboard mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-chart-simple"></i>
                  </div>
                  <div>
                    <h5>Rankings</h5>
                    <p>Page 1 Positions</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <div>
                    <h5>Keywords</h5>
                    <p>High Search Volume</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-link"></i>
                  </div>
                  <div>
                    <h5>Backlinks</h5>
                    <p>Authority Outreach</p>
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

      {/* WHAT WE OFFER (SERVICES) */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading seo-reveal">
            <span className="svc-section-tag">Our Offerings</span>
            <h2>Comprehensive SEO <span>Marketing Strategies</span></h2>
            <p>We execute data-backed SEO routines to boost search visibility and acquire qualified organic traffic.</p>
          </div>

          <div className="svc-grid-3 seo-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3>Keyword Research</h3>
              <p>Finding high-intent terms your customers search, mapping transactional keywords to match user search intent.</p>
              <ul>
                <li>Search Intent Mapping</li>
                <li>Competitor Keyword Audits</li>
                <li>Long-Tail Targets</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3>Technical SEO</h3>
              <p>Optimizing sitemaps, robots tags, clean URL slugs, structured schema markups, and core site speed parameters.</p>
              <ul>
                <li>Core Web Vitals Boost</li>
                <li>Sitemap Formatting</li>
                <li>Mobile Crawl Diagnostics</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-file-pen"></i>
              </div>
              <h3>On-Page Optimization</h3>
              <p>Structuring proper header hierarchies, keyword densities, internal page-link structures, and image alt descriptions.</p>
              <ul>
                <li>Header Tags Config</li>
                <li>Meta Tags Audit</li>
                <li>Image Optimizations</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-link"></i>
              </div>
              <h3>Link Building</h3>
              <p>Acquiring clean guest posts, directory mentions, and high-authority contextual links to build domain trust.</p>
              <ul>
                <li>Guest Blogging Outreach</li>
                <li>Broken Link Building</li>
                <li>Brand Mentions</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h3>Local SEO</h3>
              <p>Optimizing Google Business profiles, tracking local citations, and boosting localized visibility for search queries.</p>
              <ul>
                <li>Map Pack Listings</li>
                <li>Local Citations</li>
                <li>Review Management</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-chart-pie"></i>
              </div>
              <h3>Analytics Reports</h3>
              <p>Tracking organic keyword metrics, traffic trends, conversion ratios, and technical crawling performance monthly.</p>
              <ul>
                <li>Keyword Position Tracking</li>
                <li>Search Console Reports</li>
                <li>Monthly Performance Audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SEO PROCESS */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading seo-reveal">
            <span className="svc-section-tag">Our Process</span>
            <h2>How We Optimize <span>Your Search Presence</span></h2>
            <p>Our structured workflow takes your platform from rank-zero to top search result rankings.</p>
          </div>

          <div className="svc-process-grid seo-reveal">
            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">01</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <h3>SEO Audit</h3>
              <p>Comprehensive crawling of technical bugs, layout defects, and indexing errors.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">02</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-key"></i>
              </div>
              <h3>Keyword Map</h3>
              <p>Identify high-volume, low-difficulty search queries matching visitor intent.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">03</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-pencil"></i>
              </div>
              <h3>On-Page Tuning</h3>
              <p>Optimize body structures, meta descriptions, title cards, and content.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">04</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h3>Technical Fixes</h3>
              <p>Improve page load latency, file weights, schemas, and indexing problems.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">05</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <h3>Authority Link</h3>
              <p>Outreach and safe white-hat backlink building to expand domain authority.</p>
            </div>

            <div className="svc-process-card">
              <div className="svc-process-number-wrapper">
                <span className="svc-process-number">06</span>
              </div>
              <div className="svc-process-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Tracking</h3>
              <p>Continuous monitoring of position tracking and monthly organic charts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS / CASE STUDIES */}
      <section className="svc-section" id="portfolio">
        <div className="container">
          <div className="svc-heading seo-reveal">
            <span className="svc-section-tag">Case Studies</span>
            <h2>Real Results <span>For Real Brands</span></h2>
            <p>Explore some of our recent SEO campaign achievements and organic growth metrics.</p>
          </div>

          <div className="case-grid seo-reveal">
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
                    <img src="/images/portfolio/project-4.jpg" alt="SaaS SEO Growth" />
                    <span className="case-card-category">SEO</span>
                  </div>
                  <div className="case-card-body">
                    <h3>320% Traffic Scale for SaaS Brand</h3>
                    <p>Optimized technical crawl paths, restructured site architecture, and scaled organic content pipelines.</p>
                    <Link to="/case-study" className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
                <article className="case-card">
                  <div className="case-card-image">
                    <img src="/images/portfolio/project-5.jpg" alt="eCommerce SEO Growth" />
                    <span className="case-card-category">SEO</span>
                  </div>
                  <div className="case-card-body">
                    <h3>Organic Revenue Growth for E-Commerce</h3>
                    <p>Designed structured product schemas and keyword-focused category landing page maps.</p>
                    <Link to="/case-study" className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
                <article className="case-card">
                  <div className="case-card-image">
                    <img src="/images/portfolio/project-1.jpg" alt="Local Business Map Pack" />
                    <span className="case-card-category">SEO</span>
                  </div>
                  <div className="case-card-body">
                    <h3>Top 3 Map Rankings for Multi-Location Service</h3>
                    <p>Polished Google Business Profile optimization, local citations, and localized landing pages.</p>
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

      {/* FAQ */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading seo-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Find answers to common questions about organic search visibility and rankings.</p>
          </div>

          <div className="svc-faq-wrapper seo-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item seo-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question seo-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer seo-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper seo-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Dominate Search <span>Engine Rankings?</span></h2>
            <p>Schedule an organic strategy call with our SEO experts to audit your current search presence.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Free Index Crawl Audit</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>White-Hat Outreach Links</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Search Console Map Setup</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/booking" className="svc-btn-primary">
                Request Free Audit
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To SEO Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
