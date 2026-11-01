import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AiSolutionPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Artificial Intelligence & LLM Automation Services | Magencyinfo";
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What LLM models do you build with?",
      a: "We build using models from OpenAI, Anthropic, Google Gemini, and open-source alternatives like Llama-3, depending on speed requirements and privacy preferences.",
    },
    {
      q: "Will my company data remain private?",
      a: "Yes. We deploy models within secure private virtual clouds (VPCs) or integrate local-host open-source systems. None of your data is used to train public models.",
    },
    {
      q: "What is a RAG database system?",
      a: "Retrieval-Augmented Generation (RAG) lets public models query specific business documents (PDFs, sitemaps, guides) before generating answers, preventing false outputs.",
    },
    {
      q: "How much does custom AI cost to run?",
      a: "Running costs depend on API token volumes or server sizing. We optimize prompts and cache layouts to keep API consumption as low as possible.",
    },
  ];

  return (
    <main>
      {/* AI HERO SECTION */}
      <section className="svc-hero ai-service-hero">
        <div className="svc-hero-bg">
          <span className="svc-hero-blob svc-hero-blob-1"></span>
          <span className="svc-hero-blob svc-hero-blob-2"></span>
        </div>

        <div className="container">
          <div className="svc-hero-wrapper">
            <div className="svc-hero-content ai-reveal ai-revealed">
              <span className="svc-hero-badge">
                <i className="fa-solid fa-robot"></i>
                Next Gen AI Solutions
              </span>

              <h1>
                Transform Your Business
                <span> With Custom AI</span>
              </h1>

              <p>
                We build enterprise-grade AI applications, RAG-based systems, intelligent chatbots, automated agents, and workflow automations to improve operations and accelerate productivity.
              </p>

              <div className="svc-hero-features">
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Custom LLM Fine-Tuning</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Retrieval-Augmented Gen (RAG)</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Autonomous AI Agents</span>
                </div>
                <div className="svc-hero-feature">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>CRM & API Automations</span>
                </div>
              </div>

              <div className="svc-hero-buttons">
                <Link to="/contact" className="svc-btn-primary">
                  Get Free Consultation
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#solutions" className="svc-btn-secondary">
                  View AI Solutions
                </a>
              </div>
            </div>

            <div className="svc-hero-visual ai-reveal ai-revealed">
              <div className="svc-hero-image-box">
                <img
                  src="/images/services/ai/hero-dashboard.jpg"
                  alt="AI Data Analysis Dashboard mockup"
                  className="svc-hero-image"
                />

                <div className="svc-floating-card svc-float-1">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <div>
                    <h5>RAG System</h5>
                    <p>Knowledge Base Sync</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-2">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-comments"></i>
                  </div>
                  <div>
                    <h5>AI Chatbots</h5>
                    <p>24/7 User Support</p>
                  </div>
                </div>

                <div className="svc-floating-card svc-float-3">
                  <div className="svc-floating-card-icon">
                    <i className="fa-solid fa-gears"></i>
                  </div>
                  <div>
                    <h5>Automations</h5>
                    <p>CRM Integrations</p>
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
              <h3 className="ai-counter">120+</h3>
              <p>AI Projects Completed</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="ai-counter">98%</h3>
              <p>Client Satisfaction</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="ai-counter">35+</h3>
              <p>AI Engineering Experts</p>
            </div>
            <div className="svc-stat-item">
              <h3 className="ai-counter">70%</h3>
              <p>Operational Cost Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER (SERVICES) */}
      <section className="svc-section" id="solutions">
        <div className="container">
          <div className="svc-heading ai-reveal">
            <span className="svc-section-tag">AI Solutions</span>
            <h2>Intelligent Automation <span>Capabilities</span></h2>
            <p>We combine advanced natural language processing with custom APIs to automate repetitive business tasks.</p>
          </div>

          <div className="svc-grid-3 ai-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3>AI Chatbots & Assistants</h3>
              <p>Context-aware conversational agents trained on your business database to resolve client queries and qualify leads.</p>
              <ul>
                <li>Natural Tone Tuning</li>
                <li>Context Window Optimization</li>
                <li>CRM Lead Synced</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h3>RAG Systems</h3>
              <p>Retrieval-Augmented Generation setups that scan offline guides, PDFs, and sitemaps to answer specific internal questions.</p>
              <ul>
                <li>Vector Database Setup</li>
                <li>Safe Local Host Options</li>
                <li>Accurate Source Citations</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-code-merge"></i>
              </div>
              <h3>Workflow Automation</h3>
              <p>Autopilot systems connecting your CRM, emails, payment gateways, and databases using customized API loops.</p>
              <ul>
                <li>Trigger-Action Routines</li>
                <li>Data Cleansing Scripts</li>
                <li>Multi-App Integrations</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-gears"></i>
              </div>
              <h3>Autonomous Agents</h3>
              <p>Intelligent digital workers executing complex multi-step processes like competitor auditing, scheduling, and formatting.</p>
              <ul>
                <li>Iterative Loop Safety</li>
                <li>File Auto-Generators</li>
                <li>Custom API Access</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Predictive Analytics</h3>
              <p>Custom machine learning algorithms scanning database patterns to forecast sales volumes, visitor trends, and churn rate.</p>
              <ul>
                <li>Regression Model Tuning</li>
                <li>Database Clean Routines</li>
                <li>Visual Data Charts</li>
              </ul>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-spell-check"></i>
              </div>
              <h3>NLP Systems</h3>
              <p>Text classification systems built to summarize transcripts, classify support emails, and conduct sentiment analysis.</p>
              <ul>
                <li>Document Summary tools</li>
                <li>Email Sentiment tagging</li>
                <li>Entity Extraction maps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE M AGENCY */}
      <section className="svc-section svc-section--alt">
        <div className="container">
          <div className="svc-heading ai-reveal">
            <span className="svc-section-tag">Why Us</span>
            <h2>Enterprise-Grade AI <span>Backed by Strategy</span></h2>
            <p>We deploy secure, accurate, and scalable models tailored specifically to solve commercial problems.</p>
          </div>

          <div className="svc-grid-3 ai-reveal">
            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Data Security First</h3>
              <p>We design local-host or private cloud models to ensure your data stays secured inside your business.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h3>Reduced Hallucinations</h3>
              <p>We enforce strict prompt boundaries and RAG vector maps to deliver accurate, citation-backed outputs.</p>
            </div>

            <div className="svc-card">
              <div className="svc-icon-box">
                <i className="fa-solid fa-arrows-spin"></i>
              </div>
              <h3>Seamless Integrations</h3>
              <p>We hook our solutions into Slack, WhatsApp, Gmail, HubSpot, and custom REST API endpoints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI FAQ */}
      <section className="svc-section">
        <div className="container">
          <div className="svc-heading ai-reveal">
            <span className="svc-section-tag">FAQ</span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Find answers to common questions about our custom model integrations and automations.</p>
          </div>

          <div className="svc-faq-wrapper ai-reveal">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`svc-faq-item ai-faq-item ${openFaq === idx ? "active" : ""}`}>
                <button
                  type="button"
                  className="svc-faq-question ai-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === idx ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openFaq === idx && (
                  <div className="svc-faq-answer ai-faq-answer" style={{ display: "block" }}>
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
          <div className="svc-cta-wrapper ai-reveal">
            <span className="svc-section-tag">Let's Work Together</span>
            <h2>Ready to Automate Your <span>Business Workflows?</span></h2>
            <p>Book a consultation call with our AI engineers to map your operational bottlenecks and design a smart workflow.</p>

            <div className="svc-cta-features">
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Secure Data Contracts</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Figma UI Specs</span>
              </div>
              <div className="svc-cta-feature">
                <i className="fa-solid fa-circle-check"></i>
                <span>Finetuning Estimates</span>
              </div>
            </div>

            <div className="svc-cta-buttons">
              <Link to="/contact" className="svc-btn-primary">
                Book AI Consultation
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
