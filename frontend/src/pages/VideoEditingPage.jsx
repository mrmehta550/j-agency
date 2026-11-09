import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from '../components/SEO';

export default function VideoEditingPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const portfolioItems = [
    {
      id: 1,
      category: "commercial",
      title: "SaaS Product Promo",
      tag: "Commercial Ads",
      img: "/images/portfolio/project-6.jpg",
    },
    {
      id: 2,
      category: "social",
      title: "Influencer Brand Reels",
      tag: "Social Reels",
      img: "/images/portfolio/project-7.jpg",
    },
    {
      id: 3,
      category: "youtube",
      title: "AI Tech Explainer",
      tag: "YouTube Cuts",
      img: "/images/portfolio/project-8.jpg",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const faqs = [
    {
      q: "How do I send my raw footage files?",
      a: "You can upload raw files directly to shared folders on Google Drive, Dropbox, or Frame.io. We organize assets and download them directly to our editing workstations.",
    },
    {
      q: "What software editors do you use?",
      a: "We edit using Adobe Premiere Pro, DaVinci Resolve Studio (for grading), and After Effects (for motion graphics transitions).",
    },
    {
      q: "How many revision cycles are included?",
      a: "Depending on your plan tier, we include between 2 and unlimited revision rounds. You specify edit adjustments using timestamps on video preview channels.",
    },
    {
      q: "Do you provide sound design and music?",
      a: "Yes. All video packages include background noise cleaning, vocal level balancing, immersive sound effects (SFX), and licensing of copyright-free tracks.",
    },
  ];

  return (
    <main>
      <SEO
        title="Professional Video Editing & Motion Graphics | Magency Studio"
        description="High-retention commercial video editing, YouTube content production, short-form Reels/Shorts, 2D/3D motion graphics, and audio mastering for brands."
        canonical="https://www.magencystudio.in/services/video-editing"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/web-dev' }, { name: 'Video Editing', url: '/services/video-editing' }]}
        schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Commercial Video Editing & Motion Graphics',
        description: 'High-retention commercial video editing, YouTube content production, short-form Reels/Shorts, 2D/3D motion graphics, and audio mastering for brands.',
        provider: {
          '@type': 'Organization',
          name: 'Magency Studio',
          url: 'https://www.magencystudio.in/',
        },
        areaServed: 'Worldwide',
      }}
      />

      {/* VIDEO SERVICE HERO */}
      <section className="svc-hero video-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content video-reveal video-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-film"></i>
                Premium Video Production
              </span>

              <h1>
                Professional Video Editing
                <span> That Builds Brands</span>
              </h1>

              <p>
                We create cinematic videos, YouTube cuts, social media reels, commercial ads, podcast cuts, and corporate slide packages to help your business reach more clients and increase conversion metrics.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>4K Post-Production Editing</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Dynamic Motion Graphics</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Color Grading & Sound Design</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Fast Project Turnarounds</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/booking" className="svc-btn-primary">
                  Get Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#portfolio" className="svc-btn-secondary">
                  View Showreel
                </a>
              </div>
            </div>

            <div className="svc-hero-visual video-reveal video-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/video/video-hero.jpg"
                  alt="Video Editor dashboard mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-clapperboard"></i>
                  </div>
                  <div>
                    <h5>Editing</h5>
                    <p>Cinematic Visuals</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <div>
                    <h5>FX</h5>
                    <p>Motion Graphics</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-volume-high"></i>
                  </div>
                  <div>
                    <h5>Audio</h5>
                    <p>Sound Design</p>
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
          <div className="svc-heading video-reveal">
            <span class="svc-section-tag">Our Services</span>
            <h2>Complete Post-Production <span>Solutions</span></h2>
            <p>From social media cuts to cinematic commercial packages, we polish raw footage into engaging stories.</p>
          </div>

          <div className="svc-grid-3 video-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-film"></i>
              </div>
              <h3>Social Video Reels</h3>
              <p>High-engagement short videos structured for TikTok, Instagram Reels, and YouTube Shorts to maximize virality.</p>
              <ul>
                <li>Dynamic Subtitles</li>
                <li>Fast Visual Pacing</li>
                <li>Trend Audio Sync</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-photo-film"></i>
              </div>
              <h3>YouTube Video Cuts</h3>
              <p>Polishing raw talk logs, vlogs, tutorials, or explainers, optimizing engagement retention curves throughout clips.</p>
              <ul>
                <li>Retention Hook Edits</li>
                <li>B-Roll & Sound Effects</li>
                <li>Custom Thumbnail Designs</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-rectangle-ad"></i>
              </div>
              <h3>Commercial Video Ads</h3>
              <p>Cinematic promotional clips built to explain products, highlight testimonials, and drive conversions in ad sets.</p>
              <ul>
                <li>Product Mockup Edits</li>
                <li>Script Timing Tuning</li>
                <li>Call-To-Action Banners</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-palette"></i>
              </div>
              <h3>Color Grading</h3>
              <p>Color correction and aesthetic grading to establish a premium, cinematic tone matching your brand guidelines.</p>
              <ul>
                <li>LUT Customizations</li>
                <li>Skin Tone Balancing</li>
                <li>Atmospheric Tinting</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3>Motion Graphics</h3>
              <p>Integrating professional transitions, logo animations, data charts, lower-thirds, and explainers directly into clips.</p>
              <ul>
                <li>Interactive Data Graphs</li>
                <li>Logo Intro & Outro Packs</li>
                <li>Explainer Animations</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-volume-high"></i>
              </div>
              <h3>Sound Design</h3>
              <p>Professional noise cancellation, vocal balancing, SFX placement, and copyright-free ambient music integration.</p>
              <ul>
                <li>Audio Noise Cleaning</li>
                <li>Music Sound Leveling</li>
                <li>Immersive Sound Effects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="svc-section svc-section--alt" id="portfolio">
        <div className="container">
          <div className="svc-heading video-reveal">
            <span className="svc-section-tag">Portfolio</span>
            <h2>Logos & Videos <span>That Captivate</span></h2>
            <p>Explore some of our recent professional edits and advertising campaigns.</p>
          </div>

          <div className="svc-portfolio-filter video-portfolio-filter video-reveal">
            {[
              { label: "All", val: "all" },
              { label: "Commercials", val: "commercial" },
              { label: "Social Reels", val: "social" },
              { label: "YouTube", val: "youtube" },
              { label: "Corporate", val: "corporate" },
            ].map((btn) => (
              <button
                key={btn.val}
                className={activeFilter === btn.val ? "active" : ""}
                onClick={() => setActiveFilter(btn.val)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="svc-portfolio-grid video-reveal">
            {filteredItems.map((item) => (
              <div key={item.id} className="svc-portfolio-card video-portfolio-card" data-category={item.category}>
                <img src={item.img} alt={item.title} />
                <div className="svc-portfolio-overlay">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="svc-section" id="pricing">
        <div className="container">
          <div className="svc-heading video-reveal">
            <span className="svc-section-tag">Pricing Plans</span>
            <h2>Flexible Packages <span>For Content Creators</span></h2>
            <p>Affordable project pricing for social creators, startup brands, and corporate media teams.</p>
          </div>

          <div className="svc-pricing-grid video-reveal">
            <div className="svc-pricing-card">
              <h3>Social Starter</h3>
              <p className="logo-service-plan-description">Best for creators scaling TikTok, Reels, or Shorts.</p>
              <div className="price">₹4,999<span>/mo</span></div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> 10 Social Short Videos</li>
                <li><i className="fa-solid fa-check"></i> Dynamic Subtitle Packs</li>
                <li><i className="fa-solid fa-check"></i> Sound Effects & Zoom Cuts</li>
                <li><i className="fa-solid fa-check"></i> 2 Days Turnaround / video</li>
                <li><i className="fa-solid fa-check"></i> 2 Revision Rounds / video</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Get Started</Link>
            </div>

            <div className="svc-pricing-card">
              <div className="svc-pricing-popular">Most Popular</div>
              <h3>Creator Pro</h3>
              <p className="logo-service-plan-description">Ideal package for active YouTube and Ad campaigns.</p>
              <div className="price">₹14,999<span>/mo</span></div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> 4 YouTube Long-Form Edits</li>
                <li><i className="fa-solid fa-check"></i> 8 Social Short Cutouts</li>
                <li><i className="fa-solid fa-check"></i> Advanced Color Grading</li>
                <li><i className="fa-solid fa-check"></i> Custom Motion Graphic assets</li>
                <li><i className="fa-solid fa-check"></i> 3 Revision Rounds / video</li>
                <li><i className="fa-solid fa-check"></i> Dedicated Slack Workspace</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Choose Plan</Link>
            </div>

            <div className="svc-pricing-card">
              <h3>Commercial Elite</h3>
              <p className="logo-service-plan-description">Cinematic commercial and corporate presentation edits.</p>
              <div className="price">Custom</div>
              <ul className="svc-pricing-features">
                <li><i className="fa-solid fa-check"></i> Custom Commercial Ads</li>
                <li><i className="fa-solid fa-check"></i> Unlimited Long & Short Cuts</li>
                <li><i className="fa-solid fa-check"></i> High-End 3D Motion Graphics</li>
                <li><i className="fa-solid fa-check"></i> Pro Sound Design & Foley</li>
                <li><i className="fa-solid fa-check"></i> Unlimited revisions</li>
                <li><i className="fa-solid fa-check"></i> Dedicated Art Director</li>
              </ul>
              <Link to="/booking" className="svc-pricing-button">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading video-reveal">
            <span className="svc-section-tag">Testimonials</span>
            <h2>Trusted By <span>Publishers Globally</span></h2>
            <p>Read about client experiences collaborating with our video editing magencystudio.</p>
          </div>

          <div className="svc-testimonial-grid video-reveal">
            <div className="svc-testimonial-card">
              <div className="svc-stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p>&quot;The dynamic subtitles and visual hooks they integrate kept our social retention metrics 40% higher. Absolutely top-tier editing.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client1.jpg" alt="David Croft Creator" />
                <div>
                  <h4>David Croft</h4>
                  <span>Host, Croft Tech</span>
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
              <p>&quot;They designed cinematic ad promos that significantly boosted our paid traffic conversions on Facebook and Instagram.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client2.jpg" alt="Clara Higgins Director" />
                <div>
                  <h4>Clara Higgins</h4>
                  <span>VP Marketing, Trendify</span>
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
              <p>&quot;Super fast turnaround speeds and clean color grading. They delivered a fully finished commercial in under 4 business days.&quot;</p>
              <div className="svc-client">
                <img src="/images/services/logo/client3.jpg" alt="Liam Gallagher Producer" />
                <div>
                  <h4>Liam Gallagher</h4>
                  <span>Producer, Oasis Creative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading video-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Have questions about footage transfers, revision cycles, or software editors? Read below.</p>
          </div>

          <div className="svc-faq-wrapper video-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item video-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question video-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer video-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper video-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Produce High-Impact <span>Branded Content?</span></h2>
            <p>Schedule a call with our creative directors to outline your social content pipeline or commercial ad campaign.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Licensing Assets Included</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Frame.io Preview Rooms</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Cancel Plans Anytime</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/booking" className="svc-btn-primary">
                Book Consultation Call
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="svc-btn-secondary">
                Talk To Producer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
