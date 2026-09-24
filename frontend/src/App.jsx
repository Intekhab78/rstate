import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CoreValues from "./components/CoreValues";
import HowItWorks from "./components/HowItWorks";
import ProjectsSection from "./components/ProjectsSection";
import WhyChooseSaffpoll from "./components/WhyChooseSaffpoll";
import ContactCTA from "./components/ContactCTA";
import FooterSection from "./components/FooterSection";
import AboutUs from "./pages/AboutUs";
import Project from "./pages/Project";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import AdminApp from "./admin/AdminApp";

// Scroll to top or scroll to target anchor hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

// Home Page Layout
function Home() {
  return (
    <>
      <HeroSection />
      <CoreValues />
      <HowItWorks />
      <ProjectsSection />
      <WhyChooseSaffpoll />
      <ContactCTA />
    </>
  );
}

// Public Website Layout wrapper with Navbar and Footer
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
      <FooterSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin CMS Portal (Isolated from public header/footer) */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public Website Routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}

export default App;