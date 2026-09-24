import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/api.js";
import {
  Handshake,
  ShieldCheck,
  Users,
  MessageSquare,
  HardHat,
  Lightbulb,
  Building2,
  Wrench,
  Ruler,
  Shield,
  CheckCircle2,
  ArrowRight,
  Layers
} from "lucide-react";

const GOLD = "#CF974A";

const fallbackValues = [
  {
    icon: "Handshake",
    title: "Lasting Relationships",
    description:
      "We prioritize building strong, long-term partnerships with clients, stakeholders, and communities through trust and mutual respect.",
  },
  {
    icon: "ShieldCheck",
    title: "Professional Work Ethic",
    description:
      "Every team member upholds the highest standards of professionalism, integrity, and accountability in everything we do.",
  },
  {
    icon: "Users",
    title: "Teamwork",
    description:
      "Collaboration across all levels—from architects to on-site crews—ensures seamless execution and innovative solutions.",
  },
  {
    icon: "MessageSquare",
    title: "Transparent Communication",
    description:
      "Open dialogue and regular updates keep everyone informed, aligned, and confident throughout the project lifecycle.",
  },
  {
    icon: "HardHat",
    title: "Safety First",
    description:
      "We maintain rigorous safety protocols and training programs to protect every person on site, every single day.",
  },
  {
    icon: "Lightbulb",
    title: "Innovation & Efficiency",
    description:
      "We embrace modern techniques, sustainable practices, and smart technologies to deliver projects faster and better.",
  },
];

const iconMap = {
  Handshake,
  ShieldCheck,
  Users,
  MessageSquare,
  HardHat,
  Lightbulb,
  Building2,
  Wrench,
  Ruler,
  Shield,
  CheckCircle2,
  Layers
};

const CoreValues = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic API State
  const [label, setLabel] = useState("What Drives Us");
  const [title, setTitle] = useState("OUR CORE VALUES");
  const [description, setDescription] = useState(
    "We build every project on clear principles that guide how we plan, communicate, and deliver."
  );
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85"
  );
  const [btnText, setBtnText] = useState("Learn more about our approach");
  const [btnLink, setBtnLink] = useState("#about");
  const [valuesList, setValuesList] = useState(fallbackValues);

  // Fetch Core Values from Backend API
  useEffect(() => {
    let isMounted = true;
    const fetchCoreValues = async () => {
      try {
        const res = await apiFetch("/core-values");
        if (!res.ok) throw new Error("Failed to fetch core values API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const d = json.data;
          if (d.label !== undefined) setLabel(d.label);
          if (d.title !== undefined) setTitle(d.title);
          if (d.description !== undefined) setDescription(d.description);
          if (d.bg_image !== undefined) setBgImage(d.bg_image);
          if (d.btn_text !== undefined) setBtnText(d.btn_text);
          if (d.btn_link !== undefined) setBtnLink(d.btn_link);
          if (Array.isArray(d.items)) setValuesList(d.items);
        }
      } catch (err) {
        console.warn("Core Values API fetch error, using fallbacks:", err.message);
      }
    };

    fetchCoreValues();
    return () => {
      isMounted = false;
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="core-values"
      className="relative min-h-screen overflow-hidden bg-[#101827]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className={`
          absolute inset-0
          bg-cover
          bg-center
          transition-all
          duration-[1800ms]
          ease-out
          ${isVisible ? "scale-100 opacity-100" : "scale-110 opacity-0"}
        `}
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />

      {/* DARK BLUE OVERLAY */}
      <div className="absolute inset-0 bg-[#071326]/80" />

      {/* GOLD GRADIENT ON RIGHT */}
      <div
        className="absolute inset-y-0 right-0 w-[55%] opacity-50 pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            ${GOLD}33 55%,
            ${GOLD}88 100%
          )`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 xl:py-24">

        {/* SECTION INTRO */}
        <div
          className={`
            max-w-[620px]
            transform
            transition-all
            duration-[1000ms]
            ease-out
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }
          `}
        >
          {/* Small label */}
          <div
            className="mb-3 text-sm font-medium"
            style={{ color: GOLD }}
          >
            {label}
          </div>

          {/* Heading */}
          <h2
            className="
              max-w-[600px]
              text-4xl
              font-normal
              leading-[0.95]
              tracking-[-2px]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[64px]
            "
          >
            {title.includes(" ") ? (
              <>
                {title.substring(0, title.indexOf(" "))}
                <br />
                <span className="font-medium">
                  {title.substring(title.indexOf(" ") + 1)}
                </span>
              </>
            ) : (
              <span className="font-medium">{title}</span>
            )}
          </h2>

          {/* Description */}
          <p
            className="
              mt-7
              max-w-[600px]
              text-base
              leading-7
              text-gray-200
              sm:text-[17px]
            "
          >
            {description}
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {valuesList.map((value, index) => {
            const IconComponent =
              typeof value.icon === "string"
                ? iconMap[value.icon] || Handshake
                : value.icon || Handshake;

            return (
              <div
                key={(value.title || "") + index}
                className={`
                  group
                  min-h-[225px]
                  rounded-lg
                  border
                  border-white/15
                  bg-[#142039]/75
                  p-7
                  backdrop-blur-[3px]
                  transition-all
                  duration-700
                  ease-out
                  hover:-translate-y-2
                  hover:border-[#CF974A]/50
                  hover:bg-[#182641]/90
                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-24 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: isVisible
                    ? `${250 + index * 150}ms`
                    : "0ms",
                }}
              >
                {/* Icon */}
                <div
                  className="
                    mb-5
                    flex
                    h-[46px]
                    w-[46px]
                    items-center
                    justify-center
                    rounded-lg
                    border
                  "
                  style={{
                    color: GOLD,
                    borderColor: `${GOLD}66`,
                    backgroundColor: `${GOLD}18`,
                  }}
                >
                  <IconComponent
                    size={22}
                    strokeWidth={1.7}
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    text-[18px]
                    font-medium
                    tracking-[-0.3px]
                    text-white
                  "
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-[1.65]
                    text-gray-300
                  "
                >
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* DYNAMIC CTA BUTTON */}
        {btnText && btnText.trim().length > 0 && (
          <div
            className={`
              mt-11
              transform
              transition-all
              duration-700
              ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }
            `}
            style={{
              transitionDelay: isVisible ? "1200ms" : "0ms",
            }}
          >
            <a
              href={btnLink || "#about"}
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-lg
                border
                px-6
                py-4
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#CF974A]
              "
              style={{
                borderColor: `${GOLD}99`,
              }}
            >
              {btnText}

              <ArrowRight
                size={17}
                style={{ color: GOLD }}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        )}

      </div>
    </section>
  );
};

export default CoreValues;
