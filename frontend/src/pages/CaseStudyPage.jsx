import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCaseStudies } from "../api/client";
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

export default function CaseStudyPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async (category = "") => {
    setLoading(true);
    try {
      const res = await getCaseStudies(category === "all" ? "" : category);
      if (res.ok) {
        setCaseStudies(res.data || []);
      }
    } catch (err) {
      console.error("Failed to load case studies", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (cat) => {
    setActiveFilter(cat);
    loadCaseStudies(cat);
  };

  return (
    <main>
      <SEO
        title="Client Case Studies & Proven Results | Magency Studio"
        description="Explore real-world client success stories, product transformations, and measurable business growth powered by Magency Studio."
        canonical="https://www.magencystudio.in/case-study"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-study' }]}
      />

      {/* 1. HERO SECTION */}
      <section className="case-hero-section">
        <div className="case-hero-bg"></div>
        <div className="case-hero-orb case-hero-orb-1"></div>

        <div className="case-container">
          <div className="case-hero-content">
            <span className="case-hero-tag">
              <i className="fa-solid fa-briefcase"></i>
              Portfolio & Case Studies
            </span>
            <h1>Real Client Projects, Measurable <span>Business Growth</span></h1>
            <p>Discover how we partner with ambitious startups and established companies to design, build, and scale high-performing digital products.</p>

            <div className="case-hero-stats">
              <div className="case-stat-item">
                <h3>50+</h3>
                <span>Projects Shipped</span>
              </div>
              <div className="case-stat-item">
                <h3>99%</h3>
                <span>Client Satisfaction</span>
              </div>
              <div className="case-stat-item">
                <h3>12+</h3>
                <span>Global Industries</span>
              </div>
              <div className="case-stat-item">
                <h3>4.9★</h3>
                <span>Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY LISTING GRID */}
      <section className="case-list-section">
        <div className="case-container">
          {/* Filter Tabs */}
          <div className="case-filter-wrapper">
            <div className="case-filter-tabs">
              {[
                { label: "All Projects", val: "all" },
                { label: "UI/UX Design", val: "UI/UX Design" },
                { label: "Web Design", val: "Web Design" },
                { label: "SEO", val: "SEO" },
                { label: "Mobile App", val: "Mobile App" },
                { label: "Branding", val: "Branding" },
              ].map((tab) => (
                <button
                  key={tab.val}
                  className={`case-filter-btn ${activeFilter === tab.val ? "active" : ""}`}
                  onClick={() => handleFilterClick(tab.val)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="case-grid">
            {loading ? (
              <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "60px 0", color: "#8a99ad" }}>
                <i className="fa-solid fa-circle-notch fa-spin fa-2x"></i>
                <p style={{ marginTop: "12px" }}>Loading case studies...</p>
              </div>
            ) : caseStudies.length > 0 ? (
              caseStudies.map((item) => (
                <article key={item.id} className="case-card" data-category={item.category}>
                  <div className="case-card-image">
                    <OptimizedImage
                      src={item.image || "/images/portfolio/project-1.jpg"}
                      alt={item.title}
                    />
                    <span className="case-card-category">{item.category}</span>
                  </div>

                  <div className="case-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.short_description}</p>
                    <Link to={`/case-study/${item.slug}`} className="case-card-btn">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="case-empty-state" style={{ gridColumn: "1 / -1" }}>
                <i className="fa-solid fa-folder-open"></i>
                <h3>No Case Studies Found</h3>
                <p>We are currently updating our latest project showcases. Check back shortly!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. OUR PROVEN IMPACT FEATURE ROW */}
      <section className="case-impact-section">
        <div className="case-container">
          <div className="case-impact-header">
            <h2>Why Our Projects Drive Real ROI</h2>
            <p>Every digital product we design and engineer focuses on long-term performance and user conversion.</p>
          </div>

          <div className="case-impact-grid">
            <div className="case-impact-card">
              <div className="case-impact-icon"><i className="fa-solid fa-chart-line"></i></div>
              <h4>High Conversion Rate</h4>
              <p>Data-informed interfaces engineered to turn passive visitors into paying customers.</p>
            </div>

            <div className="case-impact-card">
              <div className="case-impact-icon"><i className="fa-solid fa-bolt"></i></div>
              <h4>Speed Optimized</h4>
              <p>Sub-second load times and lightweight frontend builds that ace Core Web Vitals.</p>
            </div>

            <div className="case-impact-card">
              <div className="case-impact-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <h4>Scalable Architecture</h4>
              <p>Enterprise-grade Django and cloud backends built to support millions of requests.</p>
            </div>

            <div className="case-impact-card">
              <div className="case-impact-icon"><i className="fa-solid fa-gem"></i></div>
              <h4>Brand Longevity</h4>
              <p>Timeless visual identities and design systems crafted to scale for years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="case-cta-section">
        <div className="case-container">
          <div className="case-cta-wrapper">
            <h2>Have a Project in Mind?</h2>
            <p>Let's discuss how our design and engineering team can transform your vision into a scalable, high-converting digital product.</p>
            <div className="case-cta-buttons">
              <Link to="/booking" className="case-btn-primary">
                Book Free Consultation
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="case-btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
