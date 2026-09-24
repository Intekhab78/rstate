import React, { useEffect, useState } from "react";
import {
  Building2,
  HardHat,
  Factory,
  MapPin,
  Flag,
  Wrench,
  Ruler,
  Shield,
  CheckCircle2,
  Tag
} from "lucide-react";
import { apiFetch } from "../utils/api.js";

const GOLD = "#CF974A";
const GOLD_TRANSLUCENT = "rgba(207, 151, 74, 0.82)";

const fallbackSlides = [
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90",
];

const fallbackServices = [
  { title: "New Delhi", icon: "Building2" },
  { title: "Residential Construction", icon: "HardHat" },
  { title: "Commercial Projects", icon: "Factory" },
  { title: "Renovation & Extensions", icon: "MapPin" },
  { title: "Delhi NCR", icon: "Flag" },
];

const iconMap = {
  Building2,
  HardHat,
  Factory,
  MapPin,
  Flag,
  Wrench,
  Ruler,
  Shield,
  CheckCircle2,
  Tag
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic API State
  const [welcomeTitle, setWelcomeTitle] = useState("Welcome to");
  const [companyName, setCompanyName] = useState("Saffpoll");
  const [subtitle, setSubtitle] = useState("EXPERT BUILDING CONTRACTOR SERVICES");
  const [slides, setSlides] = useState(fallbackSlides);
  const [services, setServices] = useState(fallbackServices);

  // Fetch Hero Data from Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchHero = async () => {
      try {
        const res = await apiFetch("/hero");
        if (!res.ok) throw new Error("Failed to fetch hero API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const d = json.data;
          if (d.welcome_title) setWelcomeTitle(d.welcome_title);
          if (d.company_name) setCompanyName(d.company_name);
          if (d.subtitle) setSubtitle(d.subtitle);
          if (Array.isArray(d.slides) && d.slides.length > 0) setSlides(d.slides);
          if (Array.isArray(d.pills) && d.pills.length > 0) setServices(d.pills);
        }
      } catch (err) {
        console.warn("Hero API fetch error, using fallbacks:", err.message);
      }
    };

    fetchHero();
    return () => {
      isMounted = false;
    };
  }, []);

  // Slide Auto-play and Window Resize Listeners
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const timer = setInterval(() => {
      setCurrent((prev) => (slides.length > 0 ? (prev + 1) % slides.length : 0));
    }, 4000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative min-h-[560px] md:min-h-[640px] md:h-[calc(100vh-90px)] w-full overflow-hidden bg-white py-10 md:py-0"
    >
      {/* 1. RIGHT IMAGE SLIDESHOW */}
      <div
        className={`absolute inset-0 z-10 ${
          isMobile ? "opacity-25" : "opacity-100"
        }`}
        style={{
          clipPath: isMobile
            ? "none"
            : "polygon(44% 0%, 100% 0%, 100% 100%, 36% 100%)",
        }}
      >
        {slides.map((image, index) => (
          <img
            key={image + index}
            src={image}
            alt="Saffpoll construction"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* 2. TRANSLUCENT GOLD DIAGONAL STRIP (DESKTOP) */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundColor: GOLD_TRANSLUCENT,
            clipPath: "polygon(44% 0%, 53% 0%, 45% 100%, 36% 100%)",
          }}
        />
      )}

      {/* 3. HERO CONTENT AREA */}
      <div className="relative z-30 flex h-full w-full items-center">
        <div className="flex w-full max-w-[1700px] flex-col justify-center px-4 sm:px-8 md:pl-12 lg:pl-16 xl:pl-24">
          
          {/* TITLE BANNER */}
          <div className="relative mb-6 sm:mb-8 md:mb-10 max-w-[640px]">
            {/* Soft Grey Backdrop Strip */}
            <div
              className="absolute -left-10 sm:-left-20 top-0 h-full w-[125%] bg-[rgba(239,242,246,0.95)] md:bg-[rgba(239,242,246,0.90)]"
              style={{
                clipPath: isMobile
                  ? "none"
                  : "polygon(0 0, 96% 0, 88% 100%, 0 100%)",
              }}
            />

            <div className="relative py-4 sm:py-6 px-2 sm:px-4">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-normal tracking-[-1px] sm:tracking-[-2px] text-[#161616] leading-tight sm:leading-tight"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                {welcomeTitle}{" "}
                <span
                  style={{ color: GOLD, fontWeight: 500 }}
                >
                  {companyName}
                </span>
              </h1>
              <p
                className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium uppercase tracking-[3px] sm:tracking-[5px]"
                style={{ color: GOLD, fontFamily: '"DM Sans", sans-serif' }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* LIST BUTTONS / SERVICES PILLS */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3.5 max-w-full">
            {services.map((service, index) => {
              const IconComponent =
                typeof service.icon === "string"
                  ? iconMap[service.icon] || Building2
                  : service.icon || Building2;

              return (
                <div
                  key={(service.title || "") + index}
                  className="group relative inline-flex items-center max-w-full"
                >
                  {/* Main Grey Card */}
                  <div className="flex h-[42px] sm:h-[48px] md:h-[50px] items-center gap-3 sm:gap-4 bg-[#f5f5f5] pl-3.5 sm:pl-5 pr-4 sm:pr-6 rounded-l-xs shadow-2xs">
                    <IconComponent
                      size={19}
                      strokeWidth={1.8}
                      style={{ color: GOLD }}
                      className="shrink-0"
                    />
                    <span
                      className="text-[13px] sm:text-[15px] md:text-[16px] font-medium text-[#161616] whitespace-nowrap tracking-tight"
                      style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                      {service.title}
                    </span>
                  </div>

                  {/* Slanted Accent Tab */}
                  <div
                    className="h-[42px] sm:h-[48px] md:h-[50px] w-[14px] sm:w-[18px] md:w-[20px] -skew-x-[20deg] origin-bottom-left -ml-[2px] shrink-0"
                    style={{ backgroundColor: GOLD }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 4. SLIDER INDICATORS */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-10 z-50 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="h-[4px] cursor-pointer transition-all duration-500"
            style={{
              width: current === index ? "32px" : "14px",
              backgroundColor:
                current === index ? GOLD : "rgba(255,255,255,0.85)",
            }}
          />
        ))}
      </div>
    </section>
  );
}