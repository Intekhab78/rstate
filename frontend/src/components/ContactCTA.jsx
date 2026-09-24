import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/api.js";
import { Phone, ArrowRight, Mail, MessageSquare, Send, Calendar } from "lucide-react";

const GOLD = "#CF974A";

const iconMap = {
  Phone,
  ArrowRight,
  Mail,
  MessageSquare,
  Send,
  Calendar,
};

const defaultTag = "Let's Build Together";
const defaultTitle = "Plan your next project with Saffpoll";
const defaultDescription =
  "Have a residential, commercial, renovation, or construction requirement? Talk directly with our team and let's discuss how we can bring your vision to life.";
const defaultBgImage =
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80";

const defaultButtons = [
  {
    id: "btn_call",
    enabled: true,
    text: "Call Now: +91 98104 64083",
    link: "tel:+919810464083",
    style: "outline",
    icon: "Phone",
  },
  {
    id: "btn_callback",
    enabled: true,
    text: "Request a Call Back",
    link: "mailto:firoz@saffpoll.com?subject=Project%20Enquiry",
    style: "filled",
    icon: "ArrowRight",
  },
];

const defaultContactDetails = [
  { id: "detail_1", enabled: true, text: "+91 98104 64083" },
  { id: "detail_2", enabled: true, text: "+91 85959 64083" },
  { id: "detail_3", enabled: true, text: "firoz@saffpoll.com" },
];

export default function ContactCTA() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Dynamic API State
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [tag, setTag] = useState(defaultTag);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [bgImage, setBgImage] = useState(defaultBgImage);
  const [buttons, setButtons] = useState(defaultButtons);
  const [contactDetails, setContactDetails] = useState(defaultContactDetails);

  // Fetch API Data
  useEffect(() => {
    let isMounted = true;
    const fetchContactCTA = async () => {
      try {
        const res = await apiFetch("/contact-cta");
        if (!res.ok) throw new Error("Failed to fetch Contact CTA API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const d = json.data;
          if (d.enabled !== undefined) setSectionEnabled(d.enabled);
          if (d.tag !== undefined) setTag(d.tag);
          if (d.title !== undefined) setTitle(d.title);
          if (d.description !== undefined) setDescription(d.description);
          if (d.bg_image !== undefined) setBgImage(d.bg_image);
          if (Array.isArray(d.buttons)) setButtons(d.buttons);
          if (Array.isArray(d.contact_details)) setContactDetails(d.contact_details);
        }
      } catch (err) {
        console.warn("ContactCTA API fetch error, using fallbacks:", err.message);
      }
    };

    fetchContactCTA();
    return () => {
      isMounted = false;
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const isItemEnabled = (val) =>
    val !== false && val !== 0 && val !== "false" && val !== "0" && val !== null;

  // Hide entire section if sectionEnabled is false / 0 / "false"
  if (!isItemEnabled(sectionEnabled)) {
    return null;
  }

  // Filter enabled buttons and contact details
  const activeButtons = buttons.filter((b) => isItemEnabled(b.enabled));
  const activeContactDetails = contactDetails.filter((d) => isItemEnabled(d.enabled));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1b1b1a] px-5 py-20 sm:px-8 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Gold glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.055] blur-[100px]"
          style={{
            backgroundColor: GOLD,
          }}
        />

        {/* Construction image texture */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.055]"
            style={{
              backgroundImage: `url('${bgImage}')`,
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1b1b1a]/90" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          DECORATIVE GOLD LINES
      ====================================================== */}

      <div
        className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-[1500ms] ease-out"
        style={{
          backgroundColor: GOLD,
          width: visible ? "100%" : "0%",
        }}
      />

      <div
        className="absolute bottom-0 right-0 h-[2px] w-0 transition-all duration-[1500ms] delay-300 ease-out"
        style={{
          backgroundColor: GOLD,
          width: visible ? "100%" : "0%",
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1100px] text-center">

        {/* Small label */}
        {tag && (
          <div
            className={`mb-5 transition-all duration-700 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em]">
              <span
                className="h-px w-8"
                style={{
                  backgroundColor: GOLD,
                }}
              />

              <span style={{ color: GOLD }}>{tag}</span>

              <span
                className="h-px w-8"
                style={{
                  backgroundColor: GOLD,
                }}
              />
            </span>
          </div>
        )}

        {/* Heading */}
        {title && (
          <h2
            className={`text-[30px] font-light leading-[1.15] tracking-[-1px] text-white transition-all duration-1000 sm:text-[40px] sm:tracking-[-1.5px] lg:text-[48px] ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: "100ms",
            }}
          >
            {title.includes("Saffpoll") ? (
              <>
                {title.substring(0, title.indexOf("Saffpoll"))}
                <span className="font-normal" style={{ color: GOLD }}>
                  Saffpoll
                </span>
                {title.substring(title.indexOf("Saffpoll") + 8)}
              </>
            ) : (
              title
            )}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p
            className={`mx-auto mt-5 max-w-[700px] text-[13px] font-light leading-6 text-white/55 transition-all duration-1000 sm:text-[15px] sm:leading-7 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: "200ms",
            }}
          >
            {description}
          </p>
        )}

        {/* =====================================================
            BUTTONS
        ====================================================== */}

        {activeButtons.length > 0 && (
          <div
            className={`mt-9 flex flex-col items-center justify-center gap-3 transition-all duration-1000 sm:flex-row sm:gap-4 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: "350ms",
            }}
          >
            {activeButtons.map((btn, bIdx) => {
              const IconComp = iconMap[btn.icon] || ArrowRight;
              const isOutline = btn.style === "outline";

              return (
                <a
                  key={btn.id || bIdx}
                  href={btn.link || "#"}
                  className={`group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-lg px-7 text-[13px] font-medium transition-all duration-300 sm:w-auto ${
                    isOutline
                      ? "border border-white/80 text-white hover:border-white hover:bg-white hover:text-[#1b1b1a] sm:min-w-[310px]"
                      : "text-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(207,151,74,0.25)] sm:min-w-[250px]"
                  }`}
                  style={
                    !isOutline
                      ? {
                          backgroundColor: GOLD,
                        }
                      : {}
                  }
                >
                  {isOutline ? (
                    <>
                      <IconComp
                        size={18}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:rotate-[-10deg]"
                      />
                      <span>{btn.text}</span>
                    </>
                  ) : (
                    <>
                      <span>{btn.text}</span>
                      <IconComp
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </a>
              );
            })}
          </div>
        )}

        {/* =====================================================
            CONTACT DETAILS PILLS
        ====================================================== */}

        {activeContactDetails.length > 0 && (
          <div
            className={`mt-8 flex flex-col items-center justify-center gap-3 text-[10px] text-white/35 transition-all duration-1000 sm:flex-row sm:gap-6 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: "500ms",
            }}
          >
            {activeContactDetails.map((detail, dIdx) => (
              <React.Fragment key={detail.id || dIdx}>
                {dIdx > 0 && (
                  <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
                )}
                <span>{detail.text}</span>
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
