import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdowns({});
  };

  const toggleDropdown = (key, e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setOpenDropdowns((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  // Close mobile drawer on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Scroll listener for sticky and auto-hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (scrollY > 120) {
        if (scrollY > lastScrollY.current) {
          setIsHide(true); // scrolling down
        } else {
          setIsHide(false); // scrolling up
        }
      } else {
        setIsHide(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when menu open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHide ? 'hide' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <img src="/images/favicon.png" alt="M Agency Logo" />
            <span>Magencystudio</span>
          </Link>

          <ul id="navMenu" className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li className={`dropdown ${openDropdowns['services'] ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown('services', e)}>
                Services
                <i className="fa-solid fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/services/web-dev/">Website Development</Link></li>
                <li><Link to="/app/">App Development</Link></li>
                <li><Link to="/services/ui-ux/">UI/UX Design</Link></li>
                <li><Link to="/services/seo-optimization/">SEO Optimization</Link></li>
                <li><Link to="/services/digital-marketing/">Digital Marketing</Link></li>
                <li><Link to="/services/ai-solution/">AI Solutions</Link></li>
                <li><Link to="/services/maintenance/">Maintenance</Link></li>
                <li><Link to="/services/logo-design/">Logo Design</Link></li>
                <li><Link to="/services/video-editing/">Video Editing</Link></li>
              </ul>
            </li>
            <li>
              <NavLink to="/price/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Packages
              </NavLink>
            </li>
            <li className={`dropdown ${openDropdowns['company'] ? 'open' : ''}`}>
              <a href="#" onClick={(e) => toggleDropdown('company', e)}>
                Company
                <i className="fa-solid fa-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/about/">About Us</Link></li>
                <li><Link to="/technology/">Technology</Link></li>
                <li><Link to="/blogs/">Blogs</Link></li>
              </ul>
            </li>
            <li className="nav-contact-item">
              <NavLink to="/contact/" className={({ isActive }) => `nav-contact-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="nav-right">
            <Link to="/booking/" className="quote-btn">
              Get Free Quote
            </Link>
            <button
              id="hamburgerBtn"
              className={`hamburger ${isOpen ? 'active' : ''}`}
              type="button"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls="navMenu"
              aria-label="Toggle navigation menu"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      <div
        className={`nav-overlay ${isOpen ? 'show' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
}
