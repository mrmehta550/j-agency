import React, { Suspense, lazy, useEffect } from "react";
import { pingBackend } from "./api/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Shared Layout Components (eager for instant shell render)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

// Home page loaded directly for fastest First Contentful Paint
import HomePage from "./pages/HomePage";

// Code-split all secondary routes for instant SPA loading (<2s)
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const TechPage = lazy(() => import("./pages/TechPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AppDevPage = lazy(() => import("./pages/AppDevPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));

// Service Pages (lazy)
const WebDevPage = lazy(() => import("./pages/WebDevPage"));
const UiUxPage = lazy(() => import("./pages/UiUxPage"));
const SeoPage = lazy(() => import("./pages/SeoPage"));
const AiSolutionPage = lazy(() => import("./pages/AiSolutionPage"));
const DigitalMarketingPage = lazy(() => import("./pages/DigitalMarketingPage"));
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));
const LogoDesignPage = lazy(() => import("./pages/LogoDesignPage"));
const VideoEditingPage = lazy(() => import("./pages/VideoEditingPage"));

function PageLoader() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: "36px",
        height: "36px",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotFoundPage() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <span style={{ fontSize: "72px", fontWeight: "800", color: "#6366f1", display: "block", lineHeight: "1" }}>404</span>
        <h1 style={{ fontSize: "32px", color: "#0f172a", marginTop: "16px", marginBottom: "12px" }}>Page Not Found</h1>
        <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6", marginBottom: "28px" }}>
          The page you are looking for doesn't exist, was renamed, or has been temporarily moved.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "50px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.35)",
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
  useEffect(() => {
    pingBackend();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
