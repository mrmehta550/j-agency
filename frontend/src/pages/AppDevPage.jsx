import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from '../components/SEO';

export default function AppDevPage() {
  const [activeScreen, setActiveScreen] = useState("ecom");

  // Calculator states
  const [platforms, setPlatforms] = useState({ ios: true, android: true });
  const [features, setFeatures] = useState({
    auth: true,
    push: true,
    payment: false,
    database: false,
    admin: true,
  });

  const [minPrice, setMinPrice] = useState(4500);
  const [maxPrice, setMaxPrice] = useState(8500);
  const [timelineText, setTimelineText] = useState("4 - 6 Weeks");

  useEffect(() => {
    
  }, []);

  // Recalculate price and timeline when inputs change
  useEffect(() => {
    const selectedPlatforms = Object.keys(platforms).filter((k) => platforms[k]);
    if (selectedPlatforms.length === 0) {
      setMinPrice(0);
      setMaxPrice(0);
      setTimelineText("0 Weeks");
      return;
    }

    const basePlatformCost = 2500;
    const hybridDiscount = 1200;
    let platformCost = selectedPlatforms.length * basePlatformCost;
    if (selectedPlatforms.length === 2) {
      platformCost -= hybridDiscount;
    }

    const featureCosts = {
      auth: 800,
      push: 500,
      payment: 1200,
      database: 1000,
      admin: 1500,
    };

    let featuresCost = 0;
    let complexFeaturesCount = 0;

    Object.keys(features).forEach((k) => {
      if (features[k]) {
        featuresCost += featureCosts[k] || 0;
        if (["payment", "database", "admin"].includes(k)) {
          complexFeaturesCount++;
        }
      }
    });

    const totalBase = platformCost + featuresCost;
    const totalMin = Math.round(totalBase * 0.95);
    const totalMax = Math.round(totalBase * 1.25);

    let minWeeks = selectedPlatforms.length === 1 ? 3 : 4;
    let maxWeeks = selectedPlatforms.length === 1 ? 5 : 6;

    minWeeks += complexFeaturesCount;
    maxWeeks += Math.round(complexFeaturesCount * 1.5);

    setMinPrice(totalMin);
    setMaxPrice(totalMax);
    setTimelineText(`${minWeeks} - ${maxWeeks} Weeks`);
  }, [platforms, features]);

  const togglePlatform = (p) => {
    setPlatforms((prev) => ({ ...prev, [p]: !prev[p] }));
  };

  const toggleFeature = (f) => {
    setFeatures((prev) => ({ ...prev, [f]: !prev[f] }));
  };

  return (
    <main>
      <SEO
        title="Mobile App Development Services — iOS & Android | Magency Studio"
        description="Custom cross-platform and native mobile app development using Flutter, React Native, Swift, and Kotlin. Scalable, intuitive mobile experiences for iOS and Android."
        canonical="https://www.magencystudio.in/app"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/web-dev' }, { name: 'App Development', url: '/app' }]}
        schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Mobile Application Development',
        description: 'Custom cross-platform and native mobile app development using Flutter, React Native, Swift, and Kotlin. Scalable, intuitive mobile experiences for iOS and Android.',
        provider: {
          '@type': 'Organization',
          name: 'Magency Studio',
          url: 'https://www.magencystudio.in/',
        },
        areaServed: 'Worldwide',
      }}
      />

      {/* MOBILE HERO SECTION */}
      <section className="app-hero">
        <div className="app-hero-glow"></div>
        <div className="app-container">
          <div className="app-hero-grid">
            {/* Left: Hero Text */}
            <div className="app-hero-content">
              <span className="app-badge">
                <i className="fa-solid fa-mobile-screen-button"></i> Premium App Engineering
              </span>
              <h1>Build Scalable & <br /><span>Stunning Mobile Apps</span></h1>
              <p>
                We design and develop high-performance, custom mobile applications for iOS and Android. From native Swift & Kotlin development to powerful cross-platform Flutter engines, we turn your app ideas into scalable business realities.
              </p>

              <div className="app-hero-bullets">
                <div className="bullet-item"><i className="fa-solid fa-circle-check"></i> Clean architecture</div>
                <div className="bullet-item"><i className="fa-solid fa-circle-check"></i> High-speed load times</div>
                <div className="bullet-item"><i className="fa-solid fa-circle-check"></i> Google/Apple Store deployment</div>
                <div className="bullet-item"><i className="fa-solid fa-circle-check"></i> UI/UX micro-interactions</div>
              </div>

              <div className="app-hero-ctas">
                <a href="#calculator" className="app-btn-primary">Calculate App Cost <i className="fa-solid fa-calculator"></i></a>
                <Link to="/case-study" className="app-btn-secondary">View Case Studies</Link>
              </div>
            </div>

            {/* Right: Beautiful Mockup Container */}
            <div className="app-hero-visual">
              <div className="app-visual-blob"></div>
              <div className="floating-device-wrapper">
                <div className="smartphone-frame">
                  <div className="smartphone-notch"></div>
                  <div className="smartphone-screen-display">
                    <div className="sim-app-header">
                      <div className="sim-profile">
                        <div className="sim-avatar">M</div>
                        <div>
                          <h5>Welcome to Magency</h5>
                          <span>Client Hub Pro</span>
                        </div>
                      </div>
                      <button className="sim-notif" aria-label="Notifications"><i className="fa-solid fa-bell"></i></button>
                    </div>

                    <div className="sim-card">
                      <span>Active Project Stats</span>
                      <h3>$12,450.00</h3>
                      <div className="sim-status">
                        <span className="status-dot"></span> In Development (82%)
                      </div>
                    </div>

                    <div className="sim-row-grid">
                      <div className="sim-grid-item">
                        <i className="fa-solid fa-code"></i>
                        <span>Swift Engine</span>
                      </div>
                      <div className="sim-grid-item">
                        <i className="fa-solid fa-bolt"></i>
                        <span>Fast APIs</span>
                      </div>
                    </div>

                    <div className="sim-chart-mock">
                      <div className="chart-bar" style={{ height: "40%" }}></div>
                      <div className="chart-bar" style={{ height: "60%" }}></div>
                      <div className="chart-bar" style={{ height: "50%" }}></div>
                      <div className="chart-bar" style={{ height: "85%" }}></div>
                      <div className="chart-bar" style={{ height: "70%" }}></div>
                    </div>

                    <div className="sim-nav">
                      <span className="active"><i className="fa-solid fa-house"></i></span>
                      <span><i className="fa-solid fa-chart-simple"></i></span>
                      <span><i className="fa-solid fa-user"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="app-capabilities">
        <div className="app-container">
          <div className="app-section-header">
            <span className="app-badge">Our Expertise</span>
            <h2>Tailored Mobile Platforms</h2>
            <p>We leverage cutting-edge tech stacks to build robust mobile products targeting your exact audience.</p>
          </div>

          <div className="capabilities-grid">
            <div className="capability-card">
              <div className="cap-icon ios-icon"><i className="fa-brands fa-apple"></i></div>
              <h3>iOS Development</h3>
              <p>Native Swift & SwiftUI applications engineered specifically for Apple devices, conforming perfectly to Apple's Human Interface Guidelines.</p>
              <span className="tech-tag">Swift</span>
              <span className="tech-tag">SwiftUI</span>
              <span className="tech-tag">Combine</span>
            </div>

            <div className="capability-card">
              <div className="cap-icon android-icon"><i className="fa-brands fa-android"></i></div>
              <h3>Android Development</h3>
              <p>Native Kotlin & Jetpack Compose apps optimizing performance, system utilities, and responsiveness across all Android device architectures.</p>
              <span className="tech-tag">Kotlin</span>
              <span className="tech-tag">Jetpack Compose</span>
              <span className="tech-tag">Coroutines</span>
            </div>

            <div className="capability-card">
              <div className="cap-icon flutter-icon"><i className="fa-solid fa-layer-group"></i></div>
              <h3>Hybrid Apps (Flutter)</h3>
              <p>High-fidelity, cross-platform apps developed using a single codebase. Flutter and React Native allow us to ship fast without duplicating budgets.</p>
              <span className="tech-tag">Flutter</span>
              <span className="tech-tag">React Native</span>
              <span className="tech-tag">Dart</span>
            </div>

            <div className="capability-card">
              <div className="cap-icon pwa-icon"><i className="fa-solid fa-globe"></i></div>
              <h3>Progressive Web Apps</h3>
              <p>Lightweight mobile solutions accessible instantly via web browsers, featuring offline database synchronization, cache-control, and push notifications.</p>
              <span className="tech-tag">PWA</span>
              <span className="tech-tag">Workbox</span>
              <span className="tech-tag">Service Workers</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MOCKUP PLAYGROUND */}
      <section className="mockup-playground">
        <div className="app-container">
          <div className="playground-grid">
            <div className="playground-content">
              <span className="app-badge">Interactive Preview</span>
              <h2>Explore App Interfaces</h2>
              <p>Click the options below to experience different pre-designed interfaces simulated live inside our smartphone framework mockup.</p>

              <div className="screen-selector-tabs">
                <button
                  className={`selector-tab ${activeScreen === "ecom" ? "active" : ""}`}
                  onClick={() => setActiveScreen("ecom")}
                >
                  <i className="fa-solid fa-cart-shopping"></i> E-commerce / Shop
                </button>
                <button
                  className={`selector-tab ${activeScreen === "chat" ? "active" : ""}`}
                  onClick={() => setActiveScreen("chat")}
                >
                  <i className="fa-solid fa-comments"></i> Real-time Chat / Social
                </button>
                <button
                  className={`selector-tab ${activeScreen === "health" ? "active" : ""}`}
                  onClick={() => setActiveScreen("health")}
                >
                  <i className="fa-solid fa-heart-pulse"></i> Health & Tracking
                </button>
              </div>
            </div>

            <div className="playground-device-col">
              <div className="smartphone-frame shadow-effect">
                <div className="smartphone-notch"></div>
                <div className="smartphone-screen-display screen-bg-white" id="interactive-screen-container">
                  {/* Default Ecom Screen */}
                  <div className={`sim-screen ${activeScreen === "ecom" ? "active" : ""}`} id="screen-ecom" style={{ display: activeScreen === "ecom" ? "block" : "none" }}>
                    <div className="screen-header">
                      <h4>TrendShop</h4>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="screen-hero-banner">
                      <span>New Arrivals</span>
                      <h3>Summer Collection</h3>
                    </div>
                    <div className="screen-list">
                      <div className="screen-item">
                        <div className="item-img"><i className="fa-solid fa-shirt"></i></div>
                        <div className="item-info">
                          <h5>Premium Tee</h5>
                          <span>$29.00</span>
                        </div>
                        <button className="item-btn" aria-label="Add Tee"><i className="fa-solid fa-plus"></i></button>
                      </div>
                      <div className="screen-item">
                        <div className="item-img"><i className="fa-solid fa-glasses"></i></div>
                        <div className="item-info">
                          <h5>Sunglasses</h5>
                          <span>$45.00</span>
                        </div>
                        <button className="item-btn" aria-label="Add Sunglasses"><i className="fa-solid fa-plus"></i></button>
                      </div>
                    </div>
                  </div>

                  {/* Chat Screen */}
                  <div className={`sim-screen ${activeScreen === "chat" ? "active" : ""}`} id="screen-chat" style={{ display: activeScreen === "chat" ? "block" : "none" }}>
                    <div className="screen-header">
                      <h4>Messages</h4>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className="chat-threads">
                      <div className="chat-thread">
                        <div className="thread-avatar av-blue">VK</div>
                        <div className="thread-content">
                          <h5>Vishal Kumar</h5>
                          <p>The code is deployed perfectly.</p>
                        </div>
                        <span className="thread-time">12:30 PM</span>
                      </div>
                      <div className="chat-thread">
                        <div className="thread-avatar av-purple">JK</div>
                        <div className="thread-content">
                          <h5>Jashanpreet Kaur</h5>
                          <p>Check out the UI review updates.</p>
                        </div>
                        <span className="thread-time">Yesterday</span>
                      </div>
                      <div className="chat-thread">
                        <div className="thread-avatar av-green">C</div>
                        <div className="thread-content">
                          <h5>Active Client</h5>
                          <p>Can we scale our Flutter app?</p>
                        </div>
                        <span className="thread-time">Yesterday</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Screen */}
                  <div className={`sim-screen ${activeScreen === "health" ? "active" : ""}`} id="screen-health" style={{ display: activeScreen === "health" ? "block" : "none" }}>
                    <div className="screen-header">
                      <h4>Fitness Tracker</h4>
                      <i className="fa-solid fa-gear"></i>
                    </div>
                    <div className="health-progress-circle">
                      <div className="circle-inner">
                        <h3>8,450</h3>
                        <span>Steps Today</span>
                      </div>
                    </div>
                    <div className="health-stats-cards">
                      <div className="health-stat-card">
                        <i className="fa-solid fa-fire text-red"></i>
                        <span>340 kcal</span>
                      </div>
                      <div className="health-stat-card">
                        <i className="fa-solid fa-stopwatch text-blue"></i>
                        <span>45 mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COST CALCULATOR */}
      <section className="app-calculator-section" id="calculator">
        <div className="app-container">
          <div className="app-section-header">
            <span className="app-badge">Cost Estimator</span>
            <h2>Estimate Your Project Budget</h2>
            <p>Pick the platforms and specific features you want in your mobile app, and get an instant cost and development timeline range.</p>
          </div>

          <div className="calculator-wrapper">
            <div className="calculator-inputs">
              {/* Step 1: Platforms */}
              <div className="calc-step-box">
                <h4>1. Target Platforms</h4>
                <div className="calc-options-grid">
                  <label className="calc-pill">
                    <input
                      type="checkbox"
                      name="platform"
                      value="ios"
                      checked={platforms.ios}
                      onChange={() => togglePlatform("ios")}
                    />
                    <span className="pill-content">
                      <i className="fa-brands fa-apple"></i> iOS App
                    </span>
                  </label>
                  <label className="calc-pill">
                    <input
                      type="checkbox"
                      name="platform"
                      value="android"
                      checked={platforms.android}
                      onChange={() => togglePlatform("android")}
                    />
                    <span className="pill-content">
                      <i className="fa-brands fa-android"></i> Android App
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 2: Features */}
              <div className="calc-step-box">
                <h4>2. Core Features</h4>
                <div className="calc-features-list">
                  <label className="calc-check-row">
                    <input
                      type="checkbox"
                      name="feature"
                      value="auth"
                      checked={features.auth}
                      onChange={() => toggleFeature("auth")}
                    />
                    <span className="custom-check"></span>
                    <span className="check-label-text">User Authentication (Sign Up/Login, OTP, Google/Apple Login)</span>
                  </label>
                  <label className="calc-check-row">
                    <input
                      type="checkbox"
                      name="feature"
                      value="push"
                      checked={features.push}
                      onChange={() => toggleFeature("push")}
                    />
                    <span className="custom-check"></span>
                    <span className="check-label-text">Push Notifications (Firebase Notification Hub)</span>
                  </label>
                  <label className="calc-check-row">
                    <input
                      type="checkbox"
                      name="feature"
                      value="payment"
                      checked={features.payment}
                      onChange={() => toggleFeature("payment")}
                    />
                    <span className="custom-check"></span>
                    <span className="check-label-text">Stripe / Apple Pay Payment Integrations</span>
                  </label>
                  <label className="calc-check-row">
                    <input
                      type="checkbox"
                      name="feature"
                      value="database"
                      checked={features.database}
                      onChange={() => toggleFeature("database")}
                    />
                    <span className="custom-check"></span>
                    <span className="check-label-text">Database Sync (Offline Storage & Real-Time sync)</span>
                  </label>
                  <label className="calc-check-row">
                    <input
                      type="checkbox"
                      name="feature"
                      value="admin"
                      checked={features.admin}
                      onChange={() => toggleFeature("admin")}
                    />
                    <span className="custom-check"></span>
                    <span className="check-label-text">Admin Panel Dashboard (To manage app data, users, and logs)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="calculator-results">
              <div className="results-inner-card">
                <h3>Estimated Project Cost</h3>
                <div className="price-range">
                  <span id="price-min">${minPrice.toLocaleString()}</span> - <span id="price-max">${maxPrice.toLocaleString()}</span>
                </div>
                <div className="timeline-estimate">
                  <i className="fa-solid fa-calendar-days"></i> Delivery Timeline: <strong id="timeline-text">{timelineText}</strong>
                </div>
                <hr />
                <p className="calc-disclaimer">
                  *This estimate is calculated dynamically based on average industry project scope and complexity. Contact us for a highly detailed and tailored proposal.
                </p>
                <Link to="/booking" className="calc-book-btn">
                  Book Free Consultation <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="app-process-section">
        <div className="app-container">
          <div className="app-section-header">
            <span className="app-badge">Our Workflow</span>
            <h2>App Development Roadmap</h2>
            <p>From strategic wireframes to active App Store publishing, we build apps systematically for long-term success.</p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-num">01</div>
              <h4>Blueprint & Wireframes</h4>
              <p>We map out the application's user flows, database structures, and high-fidelity wireframes using Figma.</p>
            </div>

            <div className="process-step">
              <div className="step-num">02</div>
              <h4>UI/UX Styling</h4>
              <p>We construct detailed design systems, theme sets, and smooth animations optimized for touch screen actions.</p>
            </div>

            <div className="process-step">
              <div className="step-num">03</div>
              <h4>Agile Coding</h4>
              <p>Our developers write scalable Swift, Kotlin, or Dart code, integrating secure databases and REST APIs.</p>
            </div>

            <div className="process-step">
              <div className="step-num">04</div>
              <h4>QA Testing & Launch</h4>
              <p>We perform security assessments and beta test via TestFlight, before launching on Apple App & Google Play Store.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="app-cta-banner">
        <div className="app-container">
          <div className="cta-banner-wrapper">
            <h2>Have a Premium App Idea?</h2>
            <p>Let's collaborate! Partner with Magencystudio experts to design and develop your custom iOS and Android products.</p>
            <div className="cta-banner-buttons">
              <Link to="/contact" className="cta-btn-primary">Start Your Project <i className="fa-solid fa-paper-plane"></i></Link>
              <a href="https://wa.me/919999999999" className="cta-btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
