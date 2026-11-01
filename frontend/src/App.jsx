import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Shared Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

// Main Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import TechPage from "./pages/TechPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AppDevPage from "./pages/AppDevPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";

// Service Pages
import WebDevPage from "./pages/WebDevPage";
import UiUxPage from "./pages/UiUxPage";
import SeoPage from "./pages/SeoPage";
import AiSolutionPage from "./pages/AiSolutionPage";
import DigitalMarketingPage from "./pages/DigitalMarketingPage";
import MaintenancePage from "./pages/MaintenancePage";
import LogoDesignPage from "./pages/LogoDesignPage";
import VideoEditingPage from "./pages/VideoEditingPage";

function NotFoundPage() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <span style={{ fontSize: "72px", fontWeight: "800", color: "#6366f1", display: "block", lineHeight: "1" }}>404</span>
        <h1 style={{ fontSize: "32px", color: "#ffffff", marginTop: "16px", marginBottom: "12px" }}>Page Not Found</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", marginBottom: "28px" }}>
          The page you are looking for doesn't exist, was renamed, or has been temporarily moved.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "50px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(99, 102, 241, 0.35)",
          }}
        >
          <i className="fa-solid fa-house"></i>
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/price" element={<PricingPage />} />
        <Route path="/price/" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/" element={<BookingPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/blog/:slug/" element={<BlogDetailPage />} />
        <Route path="/technology" element={<TechPage />} />
        <Route path="/technology/" element={<TechPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy/" element={<PrivacyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/terms-and-conditions/" element={<TermsPage />} />
        <Route path="/app" element={<AppDevPage />} />
        <Route path="/app/" element={<AppDevPage />} />

        {/* Case Studies */}
        <Route path="/case-study" element={<CaseStudyPage />} />
        <Route path="/case-study/" element={<CaseStudyPage />} />
        <Route path="/case-study/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/case-study/:slug/" element={<CaseStudyDetailPage />} />
        {/* Legacy casestudy route alias */}
        <Route path="/casestudy/case-study" element={<CaseStudyPage />} />
        <Route path="/casestudy/case-study/" element={<CaseStudyPage />} />
        <Route path="/casestudy/case-study/:slug" element={<CaseStudyDetailPage />} />
        <Route path="/casestudy/case-study/:slug/" element={<CaseStudyDetailPage />} />

        {/* Service Pages */}
        <Route path="/services/web-dev" element={<WebDevPage />} />
        <Route path="/services/web-dev/" element={<WebDevPage />} />
        <Route path="/services/ui-ux" element={<UiUxPage />} />
        <Route path="/services/ui-ux/" element={<UiUxPage />} />
        <Route path="/services/seo-optimization" element={<SeoPage />} />
        <Route path="/services/seo-optimization/" element={<SeoPage />} />
        <Route path="/services/ai-solution" element={<AiSolutionPage />} />
        <Route path="/services/ai-solution/" element={<AiSolutionPage />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
        <Route path="/services/digital-marketing/" element={<DigitalMarketingPage />} />
        <Route path="/services/maintenance" element={<MaintenancePage />} />
        <Route path="/services/maintenance/" element={<MaintenancePage />} />
        <Route path="/services/logo-design" element={<LogoDesignPage />} />
        <Route path="/services/logo-design/" element={<LogoDesignPage />} />
        <Route path="/services/video-editing" element={<VideoEditingPage />} />
        <Route path="/services/video-editing/" element={<VideoEditingPage />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
