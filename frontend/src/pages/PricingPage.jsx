import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    title: 'Web Development',
    sub: 'Responsive & Scalable Websites',
    monthly: '10,000',
    annual: '8,000',
    period: '/project',
    iconClass: 'pr-icon-blue',
    icon: 'fa-code',
    isPopular: false,
    features: [
      'Responsive Website Design',
      'Admin Dashboard',
      'Contact & Lead Forms',
      'SEO Friendly Structure',
      '30 Days Support',
    ],
  },
  {
    title: 'Mobile App',
    sub: 'Android & iOS Applications',
    monthly: '40,000',
    annual: '32,000',
    period: '/project',
    iconClass: 'pr-icon-purple',
    icon: 'fa-mobile-screen',
    isPopular: true,
    features: [
      'Android & iOS App',
      'Admin Panel',
      'API Integration',
      'Play Store Upload',
      '60 Days Support',
    ],
  },
  {
    title: 'AI Development',
    sub: 'Smart AI-Powered Solutions',
    monthly: '50,000',
    annual: '40,000',
    period: '/project',
    iconClass: 'pr-icon-cyan',
    icon: 'fa-robot',
    isPopular: false,
    features: [
      'Custom Chatbot',
      'AI Automation',
      'OpenAI Integration',
      'Vector Database',
      'API Development',
    ],
  },
  {
    title: 'UI / UX Design',
    sub: 'User Interface & Prototyping',
    monthly: '8,000',
    annual: '6,400',
    period: '/project',
    iconClass: 'pr-icon-pink',
    icon: 'fa-pen-nib',
    isPopular: false,
    features: [
      'Figma Design',
      'Prototype',
      'Mobile UI',
      'Desktop UI',
      'Unlimited Revisions',
    ],
  },
  {
    title: 'E-Commerce',
    sub: 'Full-Featured Online Stores',
    monthly: '50,000',
    annual: '40,000',
    period: '/project',
    iconClass: 'pr-icon-green',
    icon: 'fa-cart-shopping',
    isPopular: false,
    features: [
      'Product Management',
      'Payment Gateway',
      'Order System',
      'Coupons System',
      'Admin Dashboard',
    ],
  },
  {
    title: 'SEO Optimization',
    sub: 'Rank Higher on Search Engines',
    monthly: '10,000',
    annual: '8,000',
    period: '/month',
    iconClass: 'pr-icon-orange',
    icon: 'fa-magnifying-glass-chart',
    isPopular: false,
    features: [
      'On Page SEO',
      'Off Page SEO',
      'Technical SEO',
      'Google Ranking',
      'Monthly Report',
    ],
  },
  {
    title: 'Digital Marketing',
    sub: 'Social Media & Lead Campaigns',
    monthly: '20,000',
    annual: '16,000',
    period: '/month',
    iconClass: 'pr-icon-red',
    icon: 'fa-bullhorn',
    isPopular: false,
    features: [
      'Meta Ads',
      'Google Ads',
      'Content Marketing',
      'Social Media Management',
      'Lead Generation',
    ],
  },
  {
    title: 'Cloud & DevOps',
    sub: 'AWS Deployment & Automation',
    monthly: '40,000',
    annual: '32,000',
    period: '/project',
    iconClass: 'pr-icon-teal',
    icon: 'fa-cloud',
    isPopular: false,
    features: [
      'AWS Deployment',
      'Docker Setup',
      'CI/CD Pipeline',
      'Nginx & SSL Configuration',
      'Server Monitoring',
    ],
  },
];

const faqs = [
  {
    q: 'Are there any hidden fees?',
    a: 'No hidden fees whatsoever. The price you see is what you pay. We believe in complete transparency with our clients.',
  },
  {
    q: 'Can I customize a package?',
    a: "Absolutely! All our packages are fully customizable. Contact us and we'll build a solution tailored specifically for your business needs and budget.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major payment methods including UPI, bank transfer, credit/debit cards, and international wire transfers.',
  },
  {
    q: 'Do you offer refunds?',
    a: "Yes, we offer a satisfaction guarantee. If you're not happy with our work within the first 14 days, we'll either fix it or offer a full refund.",
  },
  {
    q: 'How long does a project take?',
    a: 'Timelines vary by project. A basic website takes 1–2 weeks, mobile apps take 4–8 weeks, and AI solutions can take 6–12 weeks depending on complexity.',
  },
  {
    q: 'What does ongoing support include?',
    a: 'Support includes bug fixes, minor feature updates, performance monitoring, security patches, and priority email/chat response within 24 hours.',
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [openFaq, setOpenFaq] = useState(null);
  const trackRef = useRef(null);

  // Update visible card count on resize
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth <= 600) setVisibleCount(1);
      else if (window.innerWidth <= 960) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, pricingPlans.length - visibleCount);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Adjust card widths and translation
  const gap = 24;
  const containerWidth = trackRef.current?.parentElement?.getBoundingClientRect().width || 1200;
  const cardWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
  const moveAmount = currentIndex * (cardWidth + gap);

  const totalDots = Math.max(1, pricingPlans.length - visibleCount + 1);

  return (
    <div>
      {/* =============================================
           PRICING HERO
      ============================================= */}
      <section className="pr-hero">
        <div className="pr-hero-bg"></div>
        <div className="pr-orb pr-orb-1"></div>
        <div className="pr-orb pr-orb-2"></div>
        <div className="pr-orb pr-orb-3"></div>

        <div className="pr-container">
          <div className="pr-hero-inner">
            <span className="pr-badge">
              <span className="pr-badge-dot"></span>
              Transparent Pricing
            </span>

            <h1 className="pr-hero-title">
              Simple, Honest <span className="pr-gradient-text">Pricing Plans</span>
            </h1>

            <p className="pr-hero-desc">
              No hidden fees, no surprises. Choose the service package that fits your business and budget. All plans include dedicated support.
            </p>

            {/* Toggle */}
            <div className="pr-toggle-wrap">
              <span
                className={`pr-toggle-label ${!isAnnual ? 'pr-label-active' : ''}`}
                id="labelMonthly"
              >
                Monthly
              </span>
              <button
                className={`pr-toggle ${isAnnual ? 'active' : ''}`}
                id="billingToggle"
                aria-label="Toggle billing period"
                onClick={() => setIsAnnual((prev) => !prev)}
              >
                <span className="pr-toggle-thumb"></span>
              </button>
              <span
                className={`pr-toggle-label ${isAnnual ? 'pr-label-active' : ''}`}
                id="labelAnnual"
              >
                Annual
              </span>
              <span className={`pr-save-badge ${isAnnual ? 'visible' : ''}`}>
                Save 20%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
           PRICING CARDS SLIDER
      ============================================= */}
      <section className="pr-cards-section">
        <div className="pr-container">
          {/* Slider Wrapper */}
          <div className="pr-slider-container">
            <div className="pr-slider">
              <div
                className="pr-track"
                id="pricingTrack"
                ref={trackRef}
                style={{
                  transform: `translateX(-${moveAmount}px)`,
                  transition: 'transform 0.4s ease',
                  display: 'flex',
                  gap: `${gap}px`,
                }}
              >
                {pricingPlans.map((plan, i) => (
                  <div
                    key={i}
                    className={`pr-card pr-visible ${plan.isPopular ? 'pr-card-popular active' : ''}`}
                    style={{ flex: `0 0 ${cardWidth}px` }}
                  >
                    {plan.isPopular && (
                      <div className="pr-popular-badge">
                        <i className="fa-solid fa-star"></i> Most Popular
                      </div>
                    )}
                    <div className={`pr-card-icon ${plan.iconClass}`}>
                      <i className={`fa-solid ${plan.icon}`}></i>
                    </div>
                    <div className="pr-card-top">
                      <h3 className="pr-card-title">{plan.title}</h3>
                      <p className="pr-card-sub">{plan.sub}</p>
                      <div className="pr-price-wrap">
                        <span className="pr-currency">₹</span>
                        <span className="pr-amount">
                          {isAnnual ? plan.annual : plan.monthly}
                        </span>
                        <span className="pr-period">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="pr-features">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <i className="fa-solid fa-circle-check"></i> {feat}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact/"
                      className={`pr-btn ${plan.isPopular ? 'pr-btn-primary' : ''}`}
                    >
                      Get Quote <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className="pr-arrow pr-arrow-left"
              id="prevSlide"
              aria-label="Previous service"
              disabled={currentIndex === 0}
              onClick={prevSlide}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="pr-arrow pr-arrow-right"
              id="nextSlide"
              aria-label="Next service"
              disabled={currentIndex >= maxIndex}
              onClick={nextSlide}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Slider Dots */}
          <div className="pr-dots" id="sliderDots">
            {Array.from({ length: totalDots }).map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`pr-dot ${dotIdx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(dotIdx)}
              ></span>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="pr-trust-bar">
            <div className="pr-trust-item pr-visible">
              <i className="fa-solid fa-shield-halved"></i>
              <span>100% Secure Payment</span>
            </div>
            <div className="pr-trust-divider"></div>
            <div className="pr-trust-item pr-visible">
              <i className="fa-solid fa-rotate-left"></i>
              <span>Money-Back Guarantee</span>
            </div>
            <div className="pr-trust-divider"></div>
            <div className="pr-trust-item pr-visible">
              <i className="fa-solid fa-headset"></i>
              <span>24/7 Dedicated Support</span>
            </div>
            <div className="pr-trust-divider"></div>
            <div className="pr-trust-item pr-visible">
              <i className="fa-solid fa-certificate"></i>
              <span>Certified Professionals</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
           FAQ SECTION
      ============================================= */}
      <section className="pr-faq-section">
        <div className="pr-container">
          <div className="pr-faq-header">
            <span className="pr-section-tag">
              <i className="fa-solid fa-circle-question"></i> FAQ
            </span>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>Everything you need to know about our pricing and services.</p>
          </div>

          <div className="pr-faq-grid">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`pr-faq-item pr-visible ${isOpen ? 'open' : ''}`}>
                  <button
                    className="pr-faq-q"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <i className="fa-solid fa-chevron-down pr-faq-icon"></i>
                  </button>
                  <div
                    className="pr-faq-a"
                    style={{
                      maxHeight: isOpen ? '250px' : '0',
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

      {/* =============================================
           CTA SECTION
      ============================================= */}
      <section className="pr-cta-section">
        <div className="pr-orb pr-cta-orb-1"></div>
        <div className="pr-orb pr-cta-orb-2"></div>
        <div className="pr-container">
          <div className="pr-cta-inner">
            <div className="pr-cta-icon">
              <i className="fa-solid fa-rocket"></i>
            </div>
            <h2>Ready to Start Your <span>Project?</span></h2>
            <p>Book a free 30-minute consultation and let's build something amazing together.</p>
            <div className="pr-cta-btns">
              <Link to="/booking/" className="pr-cta-btn-primary">
                <i className="fa-solid fa-calendar-check"></i>
                Book Free Consultation
              </Link>
              <Link to="/contact/" className="pr-cta-btn-outline">
                <i className="fa-solid fa-envelope"></i>
                Send a Message
              </Link>
            </div>
            <div className="pr-cta-trust">
              <span><i className="fa-solid fa-check"></i> No commitment required</span>
              <span><i className="fa-solid fa-check"></i> Free project estimate</span>
              <span><i className="fa-solid fa-check"></i> Response within 2 hours</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
