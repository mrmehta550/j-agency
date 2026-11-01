import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

const bookingServices = [
  {
    name: 'Website Development',
    icon: 'fa-globe',
    desc: 'Responsive, SEO-friendly and high-performance websites built for startups, businesses and enterprises.',
    price: 'Starting ₹20,000',
  },
  {
    name: 'AI Automation',
    icon: 'fa-robot',
    desc: 'AI Chatbots, AI Agents, Workflow Automation, RAG Applications and LLM Integration.',
    price: 'Starting ₹35,000',
  },
  {
    name: 'Mobile App Development',
    icon: 'fa-mobile-screen-button',
    desc: 'Android & iOS applications with modern UI, smooth performance and secure backend.',
    price: 'Starting ₹40,000',
  },
  {
    name: 'UI/UX Design',
    icon: 'fa-palette',
    desc: 'Modern wireframes, user testing, interactive Figma prototypes, and complete design systems.',
    price: 'Starting ₹15,000',
  },
  {
    name: 'Cloud Solutions',
    icon: 'fa-cloud',
    desc: 'Secure cloud deployment, hosting, monitoring and scalable infrastructure.',
    price: 'Starting ₹18,000',
  },
  {
    name: 'E-Commerce Development',
    icon: 'fa-cart-shopping',
    desc: 'Shopify, WooCommerce and custom online stores that increase sales.',
    price: 'Starting ₹30,000',
  },
];

const bookingFaqs = [
  {
    q: 'How long does it take to complete a project?',
    a: 'Depending on the project scope, most websites are completed within 2–6 weeks, while AI and custom software projects typically require 4–12 weeks.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes. Every client receives a free strategy consultation where we discuss your goals, timeline, and budget before starting.',
  },
  {
    q: 'Which industries do you work with?',
    a: 'We work with startups, e-commerce brands, healthcare, education, finance, SaaS companies, and enterprise businesses worldwide.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. We redesign outdated websites with modern UI/UX, improved performance, better SEO, and higher conversion rates.',
  },
  {
    q: 'Do you provide support after project delivery?',
    a: 'Yes. We offer maintenance, updates, security, hosting support, and long-term technical assistance for all projects.',
  },
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Web Development',
    budget: 'Under ₹25,000',
    project_details: '',
    preferred_date: '',
    preferred_time: '',
  });

  const [activeFaq, setActiveFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectServiceCard = (serviceName) => {
    setFormData((prev) => ({
      ...prev,
      service: serviceName,
    }));
    const formSection = document.getElementById('bookingForm');
    if (formSection) {
      window.scrollTo({
        top: formSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setToast(null);

    const res = await api.submitBooking(formData);
    setIsSubmitting(false);

    if (res.ok && res.data?.success) {
      setToast({
        type: 'success',
        title: 'Success',
        message: res.data.message || 'Your consultation has been booked successfully! We will contact you shortly.',
      });
      // Reset form
      setFormData({
        full_name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Web Development',
        budget: 'Under ₹25,000',
        project_details: '',
        preferred_date: '',
        preferred_time: '',
      });
    } else {
      let errMsg = res.data?.message || 'Please correct the highlighted errors and try again.';
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

      {/*=========================================
          BOOKING HERO
          ==========================================*/}
      <section className="booking-hero">
        <div className="hero-grid-texture"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="container">
          <div className="booking-grid">
            {/* LEFT CONTENT */}
            <div className="booking-content">
              <span className="booking-tag">BOOK YOUR FREE CONSULTATION</span>

              <h1>
                Grow Your Business With <span>Magencyinfo</span>
              </h1>

              <p>
                Partner with Magencyinfo to build powerful digital experiences. From AI Automation and Website Development to SEO, Digital Marketing and Business Growth, we help brands scale faster with modern technology.
              </p>

              <div className="booking-buttons">
                <a href="#bookingForm" className="booking-btn booking-primary-btn">
                  <i className="fa-solid fa-calendar-check"></i> Book Free Consultation
                </a>
                <a href="#booking-services" className="booking-btn booking-outline-btn">
                  <i className="fa-solid fa-magnifying-glass"></i> Explore Services
                </a>
              </div>

              {/* FEATURES */}
              <div className="booking-features">
                <div className="booking-feature-box">
                  <div className="booking-feature-icon"><i className="fa-solid fa-bolt"></i></div>
                  <div>
                    <h4>Fast Response</h4>
                    <span>Reply Within 30 Minutes</span>
                  </div>
                </div>

                <div className="booking-feature-box">
                  <div className="booking-feature-icon"><i className="fa-solid fa-robot"></i></div>
                  <div>
                    <h4>AI Experts</h4>
                    <span>Automation & LLM Solutions</span>
                  </div>
                </div>

                <div className="booking-feature-box">
                  <div className="booking-feature-icon"><i className="fa-solid fa-globe"></i></div>
                  <div>
                    <h4>Global Support</h4>
                    <span>Remote Services Worldwide</span>
                  </div>
                </div>

                <div className="booking-feature-box">
                  <div className="booking-feature-icon"><i className="fa-solid fa-lock"></i></div>
                  <div>
                    <h4>Trusted Process</h4>
                    <span>Secure & Confidential</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE CALENDAR PREVIEW */}
            <div className="booking-visual">
              <div className="booking-calendar-card">
                <div className="booking-calendar-header">
                  <h3>Schedule Your Meeting</h3>
                </div>

                <div className="booking-calendar-month">Available This Week</div>

                <div className="booking-calendar-grid">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  <button type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><button type="button">5</button><button type="button">6</button><button type="button">7</button>
                  <button type="button">8</button><button type="button">9</button><button type="button">10</button>
                  <button type="button" className="active">11</button>
                  <button type="button">12</button><button type="button">13</button><button type="button">14</button>
                  <button type="button">15</button><button type="button">16</button><button type="button">17</button><button type="button">18</button><button type="button">19</button><button type="button">20</button><button type="button">21</button>
                </div>

                <div className="booking-time-slots">
                  <button type="button">10:00 AM</button>
                  <button type="button" className="active">02:00 PM</button>
                  <button type="button">05:00 PM</button>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="booking-floating booking-success-card">
                <i className="fa-solid fa-circle-check"></i> Free Strategy Session
              </div>
              <div className="booking-floating booking-meeting-card">
                <i className="fa-solid fa-rocket"></i> Business Growth Call
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          BOOKING SERVICES
          ==========================================*/}
      <section className="booking-services" id="booking-services">
        <div className="container">
          <div className="booking-section-heading">
            <span>OUR SERVICES</span>
            <h2>Choose the Perfect Solution for Your Business</h2>
            <p>
              Select the service you need and schedule a free consultation with our experts. We provide AI-powered digital solutions designed to help your business grow faster.
            </p>
          </div>

          <div className="booking-service-grid">
            {bookingServices.map((srv, idx) => (
              <div
                key={idx}
                className={`booking-service-card ${formData.service.toLowerCase().includes(srv.name.toLowerCase().slice(0, 4)) ? 'active' : ''}`}
                onClick={() => handleSelectServiceCard(srv.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="booking-service-icon">
                  <i className={`fa-solid ${srv.icon}`}></i>
                </div>
                <h3>{srv.name}</h3>
                <p>{srv.desc}</p>
                <div className="booking-price">{srv.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*=========================================
          BOOKING FORM SECTION
          ==========================================*/}
      <section className="booking-form-section" id="bookingForm">
        <div className="container">
          <div className="booking-form-grid">
            {/* LEFT SIDE INFO */}
            <div className="booking-form-content">
              <span className="booking-tag">FREE CONSULTATION</span>
              <h2>Let's Discuss Your Next Project</h2>
              <p>
                Tell us about your project and our experts will contact you within 30 minutes to schedule your free strategy consultation.
              </p>

              <div className="booking-info-list">
                <div className="booking-info-item">
                  <div className="booking-info-icon"><i className="fa-solid fa-phone"></i></div>
                  <div>
                    <h4>Phone</h4>
                    <span>+91 9942637897</span>
                  </div>
                </div>

                <div className="booking-info-item">
                  <div className="booking-info-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div>
                    <h4>Email</h4>
                    <span>info@magency.com</span>
                  </div>
                </div>

                <div className="booking-info-item">
                  <div className="booking-info-icon"><i className="fa-solid fa-calendar-days"></i></div>
                  <div>
                    <h4>Availability</h4>
                    <span>Monday - Saturday</span>
                  </div>
                </div>

                <div className="booking-info-item">
                  <div className="booking-info-icon"><i className="fa-solid fa-bolt"></i></div>
                  <div>
                    <h4>Response Time</h4>
                    <span>Within 30 Minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="booking-form-card">
              <form onSubmit={handleSubmit} id="bookingFormInner">
                <div className="booking-input-group">
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

                <div className="booking-input-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="booking-row">
                  <div className="booking-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="booking-input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="booking-row">
                  <div className="booking-input-group">
                    <label>Select Service</label>
                    <select
                      id="selectedService"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="Web Development">Website Development</option>
                      <option value="AI Development">AI Automation</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX Design">UI / UX Design</option>
                      <option value="SEO Optimization">SEO Optimization</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Another Service">Another Service</option>
                    </select>
                  </div>

                  <div className="booking-input-group">
                    <label>Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="Under ₹25,000">Under ₹25,000</option>
                      <option value="10k-20k">₹10,000 - ₹20,000</option>
                      <option value="20k-50k">₹20,000 - ₹50,000</option>
                      <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                      <option value="1L-5L">₹1L - ₹5L</option>
                      <option value="5L+">₹5L+</option>
                    </select>
                  </div>
                </div>

                <div className="booking-input-group">
                  <label>Project Details</label>
                  <textarea
                    rows="6"
                    name="project_details"
                    placeholder="Describe your project (at least 10 characters)..."
                    value={formData.project_details}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="booking-row">
                  <div className="booking-input-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="booking-input-group">
                    <label>Preferred Time</label>
                    <input
                      type="time"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`booking-submit-btn ${isSubmitting ? 'is-loading' : ''}`}
                  id="bookingSubmitBtn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="booking-spinner" aria-hidden="true"></span>
                      <span>Booking…</span>
                    </>
                  ) : (
                    'Book Free Consultation'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/*=========================================
          BOOKING FAQ
          ==========================================*/}
      <section className="booking-faq">
        <div className="container">
          <div className="booking-section-heading">
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <h2>Everything You Need to Know</h2>
            <p>Find answers to the most common questions about our services, pricing, and project process.</p>
          </div>

          <div className="booking-faq-wrapper">
            {bookingFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`booking-faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="booking-faq-question"
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    {faq.q}
                    <span>{isOpen ? '−' : '+'}</span>
                  </button>
                  <div
                    className="booking-faq-answer"
                    style={{
                      maxHeight: isOpen ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/*=========================================
          FINAL CTA
          ==========================================*/}
      <section className="booking-cta">
        <div className="container">
          <div className="booking-cta-card">
            <span>READY TO GROW?</span>
            <h2>Let's Build Something Amazing Together</h2>
            <p>
              Whether you need an AI solution, website, mobile application, SEO strategy, or complete digital transformation, Magencyinfo is here to help your business succeed.
            </p>
            <div className="booking-cta-buttons">
              <a href="#bookingForm" className="booking-btn booking-primary-btn">
                Book Free Consultation
              </a>
              <Link to="/contact/" className="booking-btn booking-outline-btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
