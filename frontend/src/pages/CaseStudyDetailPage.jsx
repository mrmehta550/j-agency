import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCaseStudyDetail } from "../api/client";

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDetail();
  }, [slug]);

  const loadDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCaseStudyDetail(slug);
      if (res.ok && res.data) {
        setCaseStudy(res.data.case_study);
        setRelated(res.data.related || []);
        document.title = `${res.data.case_study.title} — Case Study | Magencystudio`;
      } else {
        setError(res.error || "Case study not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load case study");
    } finally {
      setLoading(false);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#8a99ad" }}>
          <i className="fa-solid fa-circle-notch fa-spin fa-2x"></i>
          <p style={{ marginTop: "12px" }}>Loading case study...</p>
        </div>
      </main>
    );
  }

  if (error || !caseStudy) {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <i className="fa-solid fa-triangle-exclamation fa-2x" style={{ color: "#ef4444" }}></i>
          <h2 style={{ marginTop: "16px", color: "#fff" }}>Case Study Not Found</h2>
          <p style={{ color: "#8a99ad", margin: "12px 0 24px" }}>The case study you are looking for may have been removed or does not exist.</p>
          <Link to="/case-study" className="case-btn-primary">
            Back to Case Studies
          </Link>
        </div>
      </main>
    );
  }

  const createdDate = caseStudy.created_at
    ? new Date(caseStudy.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main>
      {/* 1. CASE STUDY HERO / HEADER */}
      <header className="case-study-hero">
        <div className="case-reading-container">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <i className="fa-solid fa-angle-right"></i>
            <Link to="/case-study">Case Studies</Link>
            <i className="fa-solid fa-angle-right"></i>
            <span className="case-crumb-active">{caseStudy.title.slice(0, 30)}...</span>
          </nav>

          <div className="case-hero-header">
            <div className="case-badge">
              <i className="fa-solid fa-layer-group"></i>
              {caseStudy.category}
            </div>

            <h1>{caseStudy.title}</h1>

            {caseStudy.short_description && (
              <p className="case-hero-lead">{caseStudy.short_description}</p>
            )}

            <div className="case-meta-bar">
              <div className="case-meta-item">
                <i className="fa-regular fa-calendar"></i>
                <span>{createdDate}</span>
              </div>
              <div className="case-meta-item">
                <i className="fa-solid fa-folder-open"></i>
                <span>{caseStudy.category}</span>
              </div>
              <div className="case-meta-item">
                <i className="fa-regular fa-clock"></i>
                <span>5 Min Read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. FEATURED BANNER IMAGE */}
      {caseStudy.image && (
        <section className="case-banner-section">
          <div className="case-container">
            <div className="case-banner-wrapper">
              <img src={caseStudy.image} alt={caseStudy.title} />
            </div>
          </div>
        </section>
      )}

      {/* 3. FOCUSED EDITORIAL READING CONTENT */}
      <section className="case-content-section">
        <div className="case-reading-container">
          <article
            className="case-rich-text"
            dangerouslySetInnerHTML={{ __html: caseStudy.description }}
          />

          {/* Tags */}
          {caseStudy.tag_list && caseStudy.tag_list.length > 0 && (
            <div className="case-tags-wrapper">
              <span className="case-tags-label">Tags:</span>
              {caseStudy.tag_list.map((tag, idx) => (
                <span key={idx} className="case-tag-pill">#{tag}</span>
              ))}
            </div>
          )}

          {/* Share Bar */}
          <div className="case-share-bar">
            <span className="case-share-title">Share this case study</span>
            <div className="case-share-links">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="case-share-btn"
                title="Share on LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(caseStudy.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="case-share-btn"
                title="Share on X (Twitter)"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(caseStudy.title + " " + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="case-share-btn"
                title="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RELATED CASE STUDIES */}
      {related && related.length > 0 && (
        <section className="case-related-section">
          <div className="case-container">
            <div className="case-section-header">
              <span className="case-section-tag">Explore More</span>
              <h2>Related Case Studies</h2>
            </div>

            <div className="case-related-grid">
              {related.map((item) => (
                <article key={item.id} className="case-related-card">
                  <div className="case-related-image">
                    <img
                      src={item.image || "/images/portfolio/project-1.jpg"}
                      alt={item.title}
                    />
                  </div>
                  <div className="case-related-content">
                    <span className="case-related-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.short_description}</p>
                    <Link to={`/case-study/${item.slug}`} className="case-related-link">
                      Read Case Study
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CALL TO ACTION STRIP */}
      <section className="case-detail-cta">
        <div className="case-container">
          <div className="case-detail-cta-box">
            <h2>Need a Similar Solution for Your Business?</h2>
            <p>Let's discuss how our design and engineering team can transform your vision into a scalable, high-converting digital product.</p>
            <div className="case-detail-cta-buttons">
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
