import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="ma-footer">
      {/* Back To Top Button */}
      <button
        id="backToTop"
        className={`ma-footer-btn-top ${showBackToTop ? 'show' : ''}`}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      <div className="ma-footer-container">
        <div className="ma-footer-grid">
          {/* COMPANY */}
          <div className="ma-footer-company">
            <Link to="/" className="ma-footer-logo" aria-label="Magency Studio Home">
              <OptimizedImage src="/images/favicon.png" alt="Magency Studio Logo" className="ma-footer-logo-img" />
              <span className="logo-brand">
                <span className="logo-brand-main">Magency</span>
                <span className="logo-brand-accent">Studio</span>
              </span>
            </Link>

            <p className="ma-footer-desc">
              Magency Studio is a full-service digital agency helping startups, businesses, and enterprises build modern websites, AI automation, mobile applications, UI/UX design, branding, SEO, cloud solutions, and digital marketing strategies that drive measurable business growth.
            </p>

            <div className="ma-footer-socials">
              <a href="https://facebook.com/magencystudio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/magencystudio.in" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/company/magencystudio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/magencystudio" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="ma-footer-column">
            <h3 className="ma-footer-title">Quick Links</h3>
            <ul className="ma-footer-contact">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about/">About Us</Link></li>
              <li><Link to="/services/web-dev/">Services</Link></li>
              <li><Link to="/price/">Pricing</Link></li>
              <li><Link to="/blogs/">Blog</Link></li>
              <li><Link to="/booking/">Book Consultation</Link></li>
              <li><Link to="/contact/">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="ma-footer-column">
            <h3 className="ma-footer-title">Our Services</h3>
            <ul className="ma-footer-contact">
              <li><Link to="/services/web-dev/">Website Development</Link></li>
              <li><Link to="/services/ai-solution/">AI Automation</Link></li>
              <li><Link to="/services/ui-ux/">UI / UX Design</Link></li>
              <li><Link to="/services/seo-optimization/">SEO Optimization</Link></li>
              <li><Link to="/app/">Mobile App Development</Link></li>
              <li><Link to="/services/logo-design/">Brand Identity</Link></li>
              <li><Link to="/technology/">Cloud Solutions</Link></li>
              <li><Link to="/services/digital-marketing/">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="ma-footer-column">
            <h3 className="ma-footer-title">Contact Us</h3>
            <ul className="ma-footer-contact">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <a href="https://maps.google.com/?q=Punjab,India" target="_blank" rel="noopener noreferrer">
                  Punjab, India
                </a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+919942637897">+91 9942637897</a>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:hello@magencystudio.com">hello@magencystudio.com</a>
              </li>
              <li>
                <i className="fa-brands fa-whatsapp"></i>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="ma-footer-bottom">
          <div className="ma-footer-copy">
            © <span id="currentYear">{currentYear}</span> <strong>Magencystudio</strong>. All Rights Reserved. Designed & Developed by <strong>Magencystudio</strong>.
          </div>
          <div className="ma-footer-legal">
            <Link to="/privacy/">Privacy Policy</Link>
            <Link to="/terms-and-conditions/">Terms & Conditions</Link>
            <Link to="/about/">About</Link>
            <Link to="/contact/">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
