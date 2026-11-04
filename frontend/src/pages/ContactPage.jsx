import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Website Development',
    budget: 'Under ₹25,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setToast(null);

    const res = await api.submitContact(formData);
    setIsSubmitting(false);

    if (res.ok && res.data?.success) {
      setToast({
        type: 'success',
        title: 'Success',
        message: res.data.message || 'Thank you! Your message has been sent successfully.',
      });
      // Clear form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Website Development',
        budget: 'Under ₹25,000',
        message: '',
      });
    } else {
      let errMsg = res.data?.message || 'Please correct the errors and try again.';
      if (res.data?.errors) {
        const errorList = Object.entries(res.data.errors)
          .map(([field, errs]) => `${field.replace('_', ' ').toUpperCase()}: ${Array.isArray(errs) ? errs.join(', ') : errs}`)
          .join(' | ');
        errMsg = `${errMsg} (${errorList})`;
      }
      setToast({
        type: res.status === 429 ? 'warning' : 'error',
        title: res.status === 429 ? 'Warning' : 'Error',
        message: errMsg,
      });
    }

    // Auto-dismiss toast after 6 seconds
    setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className="contact-toast-container" id="toastContainer" style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 999999 }}>
          <div className={`contact-toast contact-toast--${toast.type}`} role="alert" aria-live="polite">
            <div className="contact-toast-icon">
              {toast.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
              {toast.type === 'error' && <i className="fa-solid fa-circle-exclamation"></i>}
              {toast.type === 'warning' && <i className="fa-solid fa-triangle-exclamation"></i>}
            </div>
            <div className="contact-toast-content">
              <span className="contact-toast-title">{toast.title}</span>
              <p className="contact-toast-msg">{toast.message}</p>
            </div>
            <button
              type="button"
              className="contact-toast-close"
              aria-label="Close notification"
              onClick={() => setToast(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="contact-toast-progress"></div>
          </div>
        </div>
      )}

      {/* =========================================
          CONTACT HERO
          ========================================== */}
      <section className="contact-hero">
        <div className="hero-grid-texture"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="container">
          <div className="contact-hero-inner">
            <div className="contact-hero-badge">
              <span className="badge-dot"></span>
              <span>Available 24/7 — Reply in &lt; 1 Hour</span>
            </div>

            <h1 className="contact-hero-title">
              Let's Build Something <span className="hero-title-gradient">Amazing Together</span>
            </h1>

            <p className="contact-hero-desc">
              Whether you need a professional website, AI automation, digital marketing, or a custom software solution — Magencystudio is ready to help your business grow.
            </p>

            <div className="contact-hero-buttons">
              <a href="#contactFormSection" className="contact-btn-primary">
                <i className="fa-solid fa-paper-plane"></i> Send Us a Message
              </a>
              <a href="#map" className="contact-btn-outline">
                <i className="fa-solid fa-location-dot"></i> Find Our Office
              </a>
            </div>

            <div className="contact-hero-chips">
              <div className="contact-chip">
                <div className="contact-chip-icon"><i className="fa-solid fa-phone"></i></div>
                <div className="contact-chip-text">
                  <span className="chip-label">Call Us</span>
                  <span className="chip-value">+91 9942637897</span>
                </div>
              </div>
              <div className="chip-divider"></div>
              <div className="contact-chip">
                <div className="contact-chip-icon"><i className="fa-solid fa-envelope"></i></div>
                <div className="contact-chip-text">
                  <span className="chip-label">Email</span>
                  <span className="chip-value">info@magency.com</span>
                </div>
              </div>
              <div className="chip-divider"></div>
              <div className="contact-chip">
                <div className="contact-chip-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="contact-chip-text">
                  <span className="chip-label">Office</span>
                  <span className="chip-value">Chandigarh, India</span>
                </div>
              </div>
            </div>

            <div className="contact-hero-stats">
              <div className="hero-stat">
                <h3>500<span>+</span></h3>
                <p>Projects Delivered</p>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <h3>98<span>%</span></h3>
                <p>Client Satisfaction</p>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <h3>24<span>/7</span></h3>
                <p>Expert Support</p>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <h3>10<span>+</span></h3>
                <p>Digital Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT FORM SECTION
          ========================================== */}
      <section className="contact-form-section" id="contactFormSection">
        <div className="container">
          <div className="contact-wrapper">
            {/* LEFT INFO */}
            <div className="contact-info">
              <span className="contact-section-tag">GET IN TOUCH</span>
              <h2>Let's Discuss Your Project</h2>
              <p>
                Fill out the form below and our team will contact you within 24 hours to understand your business requirements and provide the best solution.
              </p>

              <div className="contact-info-box">
                <div className="contact-info-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h4>Phone Number</h4>
                  <span>+91 9942637897</span>
                </div>
              </div>

              <div className="contact-info-box">
                <div className="contact-info-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h4>Email Address</h4>
                  <span>info@magency.com</span>
                </div>
              </div>

              <div className="contact-info-box">
                <div className="contact-info-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h4>Office</h4>
                  <span>Chandigarh, India</span>
                </div>
              </div>

              <div className="contact-info-box">
                <div className="contact-info-icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <h4>Working Hours</h4>
                  <span>Monday - Saturday<br />9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} id="contactForm">
                <div className="contact-input-grid">
                  <div className="contact-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-input-grid">
                  <div className="contact-input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-input-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-input-group">
                  <label>Select Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Cloud Solutions">Cloud Solutions</option>
                    <option value="E-Commerce Development">E-Commerce Development</option>
                  </select>
                </div>

                <div className="contact-input-group">
                  <label>Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                  </select>
                </div>

                <div className="contact-input-group">
                  <label>Project Details</label>
                  <textarea
                    rows="6"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`contact-submit-btn ${isSubmitting ? 'is-loading' : ''}`}
                  id="submitBtn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="contact-spinner" aria-hidden="true"></span>
                      <span>Sending…</span>
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          OFFICE LOCATION
          ========================================== */}
      <section className="contact-office-section" id="map">
        <div className="container">
          <div className="contact-section-title">
            <span>OUR OFFICE</span>
            <h2>Visit Magencystudio</h2>
            <p>We work with clients across the globe. You can visit our office, schedule a meeting, or connect with us online.</p>
          </div>

          <div className="contact-office-grid">
            <div className="contact-map-card">
              <iframe
                src="https://www.google.com/maps?q=Chandigarh&output=embed"
                loading="lazy"
                allowFullScreen=""
                title="Office Map"
              ></iframe>
            </div>

            <div className="contact-office-info">
              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h3>Head Office</h3>
                  <p>Chandigarh, Punjab, India</p>
                </div>
              </div>

              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <h3>Phone</h3>
                  <p>+91 9942637897</p>
                </div>
              </div>

              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <h3>Email</h3>
                  <p>info@magency.com</p>
                </div>
              </div>

              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-globe"></i></div>
                <div>
                  <h3>Website</h3>
                  <p>www.magencystudio.com</p>
                </div>
              </div>

              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-clock"></i></div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday<br />9:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="contact-office-card">
                <div className="contact-office-icon"><i className="fa-solid fa-comments"></i></div>
                <div>
                  <h3>Live Support</h3>
                  <p>Chat with our experts anytime during business hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY CHOOSE M AGENCY
          ========================================== */}
      <section className="contact-why-section">
        <div className="container">
          <div className="contact-section-title">
            <span>WHY CHOOSE Magencystudio</span>
            <h2>We Build Digital Experiences That Drive Real Business Growth</h2>
            <p>From startups to enterprise businesses, we combine creativity, technology and AI to deliver world-class digital solutions.</p>
          </div>

          <div className="contact-feature-grid">
            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-rocket"></i></div>
              <h3>Fast Project Delivery</h3>
              <p>We deliver projects on schedule without compromising quality or performance.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Powered Solutions</h3>
              <p>Intelligent automation, AI chatbots, LLM integrations, and business workflow solutions.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-globe"></i></div>
              <h3>Modern Web Development</h3>
              <p>High-performance websites built with modern technologies and responsive design.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-mobile-screen"></i></div>
              <h3>Mobile Applications</h3>
              <p>Android and iOS applications designed for performance, scalability and user experience.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security, cloud infrastructure and reliable deployment.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-chart-line"></i></div>
              <h3>Digital Marketing</h3>
              <p>SEO, Google Ads, social media marketing and lead generation strategies.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-bullseye"></i></div>
              <h3>Business Strategy</h3>
              <p>We understand your goals and create custom digital solutions for long-term growth.</p>
            </div>

            <div className="contact-feature-card">
              <div className="contact-feature-icon"><i className="fa-solid fa-handshake"></i></div>
              <h3>Lifetime Support</h3>
              <p>Dedicated support, maintenance and updates even after project delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT CTA
          ========================================== */}
      <section className="contact-cta">
        <div className="container">
          <div className="contact-cta-box">
            <div className="contact-cta-left">
              <span className="contact-section-tag">START YOUR PROJECT</span>
              <h2>Ready To Grow Your Business With Magencystudio?</h2>
              <p>
                Whether you're looking for a modern website, AI automation, mobile application, digital marketing, or complete digital transformation, our experts are ready to help.
              </p>
              <div className="contact-cta-buttons">
                <Link to="/booking/" className="contact-btn-primary">Book Free Consultation</Link>
                <a href="https://wa.me/919942637897" target="_blank" rel="noopener noreferrer" className="contact-btn-outline">WhatsApp Us</a>
              </div>
            </div>

            <div className="contact-cta-right">
              <div className="contact-cta-card">
                <div className="contact-cta-icon"><i className="fa-solid fa-rocket"></i></div>
                <h3>Free Consultation</h3>
                <p>30 Minute Strategy Session</p>
              </div>

              <div className="contact-cta-card">
                <div className="contact-cta-icon"><i className="fa-solid fa-bolt"></i></div>
                <h3>Fast Response</h3>
                <p>Reply Within 1 Hour</p>
              </div>

              <div className="contact-cta-card">
                <div className="contact-cta-icon"><i className="fa-solid fa-users"></i></div>
                <h3>Dedicated Team</h3>
                <p>Professional Designers, Developers & AI Experts</p>
              </div>

              <div className="contact-cta-card">
                <div className="contact-cta-icon"><i className="fa-solid fa-star"></i></div>
                <h3>500+ Projects</h3>
                <p>Trusted By Businesses Around The World</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NEWSLETTER
          ========================================== */}
      <section className="contact-newsletter">
        <div className="container">
          <div className="contact-newsletter-box">
            <span>NEWSLETTER</span>
            <h2>Stay Updated With Magencystudio</h2>
            <p>Subscribe to receive the latest updates, AI trends, web development insights, SEO tips and exclusive business resources.</p>
            <form className="contact-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Subscribe</button>
            </form>

            <div className="contact-newsletter-stats">
              <div>
                <h3>500+</h3>
                <span>Projects</span>
              </div>
              <div>
                <h3>98%</h3>
                <span>Client Satisfaction</span>
              </div>
              <div>
                <h3>24/7</h3>
                <span>Support</span>
              </div>
              <div>
                <h3>10+</h3>
                <span>Digital Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
