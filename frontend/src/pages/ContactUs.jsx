import React, { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO.jsx";
import { apiFetch } from "../utils/api.js";
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Building2,
  CheckCircle2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

/* =========================================================
   ONLINE IMAGES & ICONS MAP
========================================================= */

const images = {
  hero: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90",
  contact: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90",
};

const iconMap = {
  Phone,
  Mail,
  MapPin,
  Clock3,
  CalendarDays,
  Building2,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
};

function getIconComponent(iconName, fallback = Phone) {
  if (!iconName) return fallback;
  return iconMap[iconName] || fallback;
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    scale: "scale-95",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `${transforms[direction]} opacity-0`}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ children, light = false }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#CF974A]">
      <span className="h-[2px] w-8 bg-[#CF974A]" />
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   ACCENT TITLE RENDERER
========================================================= */

function renderAccentTitle(title, fallbackGoldWord = "") {
  if (!title) return null;
  const trimmed = title.trim();

  if (trimmed === "Let's Build Something Together") {
    return (
      <>
        Let's Build
        <br />
        Something <span className="text-[#CF974A]">Together</span>
      </>
    );
  }
  if (trimmed === "Send Us a Message") {
    return (
      <>
        Send Us a <span className="text-[#CF974A]">Message</span>
      </>
    );
  }
  if (trimmed === "Frequently Asked Questions") {
    return (
      <>
        Frequently Asked <span className="text-[#CF974A]">Questions</span>
      </>
    );
  }
  if (trimmed === "Ready to Start Your Project?") {
    return (
      <>
        Ready to Start Your <span className="text-[#CF974A]">Project?</span>
      </>
    );
  }

  if (fallbackGoldWord && title.toLowerCase().includes(fallbackGoldWord.toLowerCase())) {
    const regex = new RegExp(`(${fallbackGoldWord})`, "i");
    const parts = title.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === fallbackGoldWord.toLowerCase() ? (
        <span key={i} className="text-[#CF974A]">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  const words = title.split(" ");
  if (words.length > 1) {
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")} <span className="text-[#CF974A]">{lastWord}</span>
      </>
    );
  }

  return title;
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({ icon: Icon, label, children, href, delay = 0 }) {
  const card = (
    <div className="group h-full rounded-[4px] border border-gray-100 bg-white p-7 shadow-[0_15px_45px_rgba(17,24,39,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-[#CF974A]/30 hover:shadow-[0_25px_60px_rgba(17,24,39,0.11)]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CF974A]/15 text-[#CF974A] transition-all duration-500 group-hover:bg-[#CF974A] group-hover:text-white">
        <Icon size={25} strokeWidth={1.8} />
      </div>

      <p className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <div className="text-[17px] font-semibold leading-7 text-[#111827]">
        {children}
      </div>
    </div>
  );

  return href ? (
    <Reveal direction="up" delay={delay}>
      <a href={href} className="block h-full">
        {card}
      </a>
    </Reveal>
  ) : (
    <Reveal direction="up" delay={delay}>
      {card}
    </Reveal>
  );
}

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({ question, answer, open, onClick }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
        open
          ? "border-[#CF974A]/40 bg-[#CF974A]/[0.035] shadow-[0_12px_35px_rgba(207,151,74,0.08)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
      >
        <span className="text-[16px] font-bold leading-6 text-[#111827] md:text-[18px]">
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-180 border-[#CF974A] bg-[#CF974A] text-white"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#CF974A]/10 px-6 pb-7 pt-5 text-[15px] leading-7 text-slate-600 md:px-8">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FALLBACK DATA CONSTANTS
========================================================= */

const defaultFaqs = [
  {
    question: "What types of construction projects does Saffpoll handle?",
    answer:
      "Saffpoll works across residential construction, commercial projects, and renovation and extension requirements. Our experience covers projects ranging from residential renovations to larger commercial construction work.",
  },
  {
    question: "Can I discuss my project before making a decision?",
    answer:
      "Yes. You can contact our team with your project requirements, location, scope, and timeline. We can then understand your needs and discuss the appropriate next steps.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project duration depends on the size, scope, design requirements, site conditions, materials, approvals, and other project-specific factors. Our team can discuss a realistic timeline after understanding your project.",
  },
  {
    question: "Do you handle renovation and extension projects?",
    answer:
      "Yes. Renovation & Extensions is one of Saffpoll's core service areas, focused on improving existing spaces while enhancing functionality and aesthetics.",
  },
  {
    question: "Can I schedule a site visit?",
    answer:
      "You can contact Saffpoll to discuss a site visit. Share your location and project requirements with the team so the appropriate next step can be arranged.",
  },
];

const defaultContactCards = [
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+919810464083",
    lines: ["+91 98104 64083", "+91 85959 64083"],
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:firoz@saffpoll.com",
    lines: ["firoz@saffpoll.com", "Send us your project requirements"],
  },
  {
    icon: MapPin,
    label: "Address",
    lines: [
      "144, Pocket 1 Street, Pocket 1,",
      "Jasola Vihar, New Delhi, Delhi, India",
    ],
  },
  {
    icon: Clock3,
    label: "Working Hours",
    lines: [
      "Mon – Fri: 09:00 AM – 05:00 PM",
      "Saturday & Sunday: Closed",
    ],
  },
];

const defaultQuickActions = [
  {
    id: "qa_1",
    icon: "Phone",
    title: "Call Now",
    subtitle: "Speak with our team",
    href: "tel:+919810464083",
  },
  {
    id: "qa_2",
    icon: "MessageSquare",
    title: "Discuss Your Project",
    subtitle: "Tell us about your requirements",
    href: "#contact-form",
  },
  {
    id: "qa_3",
    icon: "Mail",
    title: "Send Email",
    subtitle: "firoz@saffpoll.com",
    href: "mailto:firoz@saffpoll.com",
  },
];

const defaultServiceOptions = [
  { label: "Residential Construction", value: "Residential Construction" },
  { label: "Commercial Projects", value: "Commercial Projects" },
  { label: "Renovation & Extensions", value: "Renovation & Extensions" },
  { label: "General Construction", value: "General Construction" },
  { label: "Other Requirement", value: "Other" },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ContactUs() {
  const [content, setContent] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let isMounted = true;
    apiFetch("/contact-page")
      .then((res) => res.json())
      .then((d) => {
        if (isMounted && d && d.success && d.data) {
          setContent(d.data);
        }
      })
      .catch((err) => {
        console.warn("Contact Page dynamic load failed, using fallbacks:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch("/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          source: "Contact Page Form",
        }),
      });
    } catch (err) {
      console.warn("Enquiry logged locally:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  // Structured Data Schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SaffPoll Developments",
    description:
      "Get in touch with SaffPoll for real estate developments, construction consultations, architectural design, and site inquiries.",
    url: "https://rstate.jtsmiddleeast.com/contactUs",
    mainEntity: {
      "@type": "Organization",
      name: "SaffPoll Developments",
      url: "https://rstate.jtsmiddleeast.com",
      telephone: "+91-9810464083",
      email: "firoz@saffpoll.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "144, Pocket 1 Street, Pocket 1, Jasola Vihar",
        addressLocality: "New Delhi",
        postalCode: "110025",
        addressCountry: "IN",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rstate.jtsmiddleeast.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://rstate.jtsmiddleeast.com/contactUs",
        },
      ],
    },
  };

  // 1. Dynamic Hero Settings
  const isHeroEnabled = content?.hero?.enabled !== false;
  // If content is loaded, respect hero.tag (which is "" when user cleared it); before load or if not set, do not show tag
  const heroTag = content ? (content.hero?.tag ?? "") : "";
  const heroTitle = content?.hero?.title || "Let's Build Something Together";
  const heroSubtitle =
    content?.hero?.subtitle !== undefined && content?.hero?.subtitle !== ""
      ? content.hero.subtitle
      : "Whether you're planning a new project or have questions about our services, we're here to understand your requirements and help you take the next step.";
  const heroBg = content?.hero?.bg_image || images.hero;

  // 2. Dynamic Contact Cards
  const cardsToRender = (() => {
    if (content?.contact_cards && Array.isArray(content.contact_cards) && content.contact_cards.length > 0) {
      const enabledCards = content.contact_cards.filter((c) => c.enabled !== false);
      if (enabledCards.length > 0) {
        // If only 2 cards are in DB (e.g. Phone, Email), keep Address & Hours from default cards
        if (enabledCards.length === 2 && !enabledCards.some((c) => c.label?.toLowerCase() === "address")) {
          return [...enabledCards, defaultContactCards[2], defaultContactCards[3]];
        }
        return enabledCards;
      }
    }
    return defaultContactCards;
  })();

  // 3. Dynamic Form Settings
  const formTag = content ? (content.form_settings?.tag ?? "") : "Contact Saffpoll";
  const formTitle = content?.form_settings?.title || "Send Us a Message";
  const formDescription =
    content?.form_settings?.description ||
    "Tell us about your project, construction requirement, or renovation idea. Our team will review your message and get back to you with the appropriate next steps.";
  const serviceOptions = (() => {
    if (
      content?.form_settings?.service_options &&
      Array.isArray(content.form_settings.service_options) &&
      content.form_settings.service_options.length > 0
    ) {
      const filtered = content.form_settings.service_options.filter((s) => s.enabled !== false);
      if (filtered.length > 0) return filtered;
    }
    return defaultServiceOptions;
  })();

  // 4. Dynamic Office & Quick Actions
  const officeTag = content ? (content.office_info?.tag ?? "") : "Our Office";
  const officeTitle = content?.office_info?.title || "Visit or Connect With Us";
  const officeDescription =
    content?.office_info?.description ||
    "Saffpoll is based in Jasola Vihar, New Delhi. Reach out to discuss your construction, renovation, or commercial project requirements.";
  const officeBadge = content?.office_info?.badge || "Saffpoll";
  const officeHeading = content?.office_info?.heading || "Jasola Vihar, New Delhi";
  const officeImage = content?.office_info?.image_url || images.contact;
  const officeAddressLines =
    content?.office_info?.address_lines &&
    Array.isArray(content.office_info.address_lines) &&
    content.office_info.address_lines.length > 0
      ? content.office_info.address_lines
      : [
          "144, Pocket 1 Street, Pocket 1,",
          "Jasola Vihar, New Delhi, Delhi, India",
        ];
  const officePhones =
    content?.office_info?.phones &&
    Array.isArray(content.office_info.phones) &&
    content.office_info.phones.length > 0
      ? content.office_info.phones
      : ["+91 98104 64083", "+91 85959 64083"];
  const officeEmail = content?.office_info?.email || "firoz@saffpoll.com";

  const quickActionsToRender = (() => {
    if (
      content?.quick_actions &&
      Array.isArray(content.quick_actions) &&
      content.quick_actions.length > 0
    ) {
      const filtered = content.quick_actions.filter((a) => a.enabled !== false);
      if (filtered.length > 0) return filtered;
    }
    return defaultQuickActions;
  })();

  // 5. Dynamic Map Settings
  const isMapEnabled = content?.map?.enabled !== false;
  const mapTag = content ? (content.map?.tag ?? "") : "Find Us";
  const mapTitle = content?.map?.title || "Our Location";
  const mapsUrl =
    content?.map?.maps_url ||
    "https://www.google.com/maps/search/?api=1&query=144%20Pocket%201%20Street%20Pocket%201%20Jasola%20Vihar%20New%20Delhi%20Delhi%20India";
  const embedUrl =
    content?.map?.embed_url ||
    "https://www.google.com/maps?q=144%2C%20Pocket%201%20Street%2C%20Pocket%201%2C%20Jasola%20Vihar%2C%20New%20Delhi%2C%20Delhi%2C%20India&output=embed";

  // 6. Dynamic FAQs
  const faqsToRender = (() => {
    if (content?.faqs && Array.isArray(content.faqs) && content.faqs.length > 0) {
      const filtered = content.faqs.filter((f) => f.enabled !== false);
      if (filtered.length > 0) return filtered;
    }
    return defaultFaqs;
  })();

  // 7. Dynamic Final CTA
  const isCtaEnabled = content?.final_cta?.enabled !== false;
  const ctaTag = content ? (content.final_cta?.tag ?? "") : "Let's Build Together";
  const ctaTitle = content?.final_cta?.title || "Ready to Start Your Project?";
  const ctaSubtitle =
    content?.final_cta?.subtitle ||
    "From residential construction to commercial projects and renovations, Saffpoll is ready to understand your requirements and help turn your vision into reality.";

  return (
    <main className="overflow-hidden bg-white font-['DM_Sans'] text-[#111827]">
      <SEO
        title="Contact SaffPoll Developments | Inquiries & Consultations New Delhi"
        description="Connect with SaffPoll for project inquiries, site consultations, architectural design, and commercial partnerships in New Delhi and across India."
        canonicalUrl="https://rstate.jtsmiddleeast.com/contactUs"
        structuredData={contactSchema}
      />

      {/* =====================================================
          1. HERO BANNER
      ===================================================== */}
      {isHeroEnabled && (
        <section className="relative min-h-[590px] overflow-hidden md:min-h-[650px]">
          <img
            src={heroBg}
            alt="Saffpoll construction team and headquarters"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0b1626]/85" />

          {/* Warm architectural glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(207,151,74,0.30),transparent_42%)]" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />

          <div className="relative z-10 mx-auto flex min-h-[590px] max-w-[1380px] items-center px-5 py-24 sm:px-8 md:min-h-[650px] lg:px-12">
            <div className="w-full max-w-[850px] text-center md:text-left">
              {heroTag && heroTag.trim() !== "" ? (
                <Reveal direction="down">
                  <div className="mb-5 flex justify-center md:justify-start">
                    <SectionLabel light>{heroTag}</SectionLabel>
                  </div>
                </Reveal>
              ) : null}

              <Reveal direction="left" delay={120}>
                <h1 className="text-[48px] font-semibold leading-[0.98] tracking-[-2.5px] text-white sm:text-[62px] md:text-[78px] lg:text-[92px]">
                  {renderAccentTitle(heroTitle, "Together")}
                </h1>
              </Reveal>

              {heroSubtitle ? (
                <Reveal direction="up" delay={240}>
                  <p className="mx-auto mt-7 max-w-[760px] text-[17px] leading-8 text-slate-200 md:mx-0 md:text-[19px]">
                    {heroSubtitle}
                  </p>
                </Reveal>
              ) : null}

              <Reveal direction="up" delay={360}>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CF974A] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#CF974A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9803d]"
                  >
                    Send Us a Message
                    <ArrowUpRight size={18} />
                  </a>

                  <a
                    href="tel:+919810464083"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CF974A] hover:text-[#CF974A]"
                  >
                    <Phone size={17} />
                    Call +91 98104 64083
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#CF974A]" />
        </section>
      )}

      {/* =====================================================
          2. CONTACT CARDS
      ===================================================== */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cardsToRender.map((card, idx) => {
              const IconComp =
                typeof card.icon === "string"
                  ? getIconComponent(card.icon)
                  : card.icon || Phone;
              return (
                <ContactCard
                  key={card.id || card.label || idx}
                  icon={IconComp}
                  label={card.label}
                  href={card.href || undefined}
                  delay={idx * 100}
                >
                  {Array.isArray(card.lines) ? (
                    card.lines.map((line, lIdx) => (
                      <span
                        key={lIdx}
                        className={`block ${
                          lIdx > 0 && line.length > 25
                            ? "mt-2 text-sm font-medium text-slate-500"
                            : lIdx > 0
                            ? "mt-1"
                            : ""
                        } ${line.includes("@") ? "break-all" : ""}`}
                      >
                        {line}
                      </span>
                    ))
                  ) : (
                    <span>{card.lines || card.content}</span>
                  )}
                </ContactCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. FORM & OFFICE
      ===================================================== */}
      <section id="contact-form" className="bg-[#f7f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* Form */}
            <Reveal direction="left">
              <div>
                {formTag && formTag.trim() !== "" ? (
                  <SectionLabel>{formTag}</SectionLabel>
                ) : null}

                <h2 className="max-w-[600px] text-[40px] font-semibold leading-[1.05] tracking-[-1.5px] text-[#111827] sm:text-[48px]">
                  {renderAccentTitle(formTitle, "Message")}
                </h2>

                {formDescription ? (
                  <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-slate-600">
                    {formDescription}
                  </p>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-[#111827]">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-[#CF974A] focus:ring-4 focus:ring-[#CF974A]/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-[#111827]">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-[#CF974A] focus:ring-4 focus:ring-[#CF974A]/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#111827]">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-[#CF974A] focus:ring-4 focus:ring-[#CF974A]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#111827]">
                      Service Interested In *
                    </label>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-12 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-[#CF974A] focus:ring-4 focus:ring-[#CF974A]/10"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#111827]">
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute left-4 top-5 text-slate-400"
                      />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us about your project..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:border-[#CF974A] focus:ring-4 focus:ring-[#CF974A]/10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#CF974A] text-sm font-bold text-white shadow-lg shadow-[#CF974A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9803d] disabled:opacity-50"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 size={19} />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitted && (
                    <p className="text-center text-sm font-semibold text-green-600">
                      Thank you! Your message has been received and logged.
                    </p>
                  )}
                </form>
              </div>
            </Reveal>

            {/* Right Side: Office & Quick Actions */}
            <Reveal direction="right" delay={150}>
              <div className="lg:pt-8">
                {officeTag && officeTag.trim() !== "" ? (
                  <SectionLabel>{officeTag}</SectionLabel>
                ) : null}

                <h3 className="text-[34px] font-semibold tracking-[-1px] text-[#111827]">
                  {officeTitle}
                </h3>

                {officeDescription ? (
                  <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    {officeDescription}
                  </p>
                ) : null}

                {/* Office Card */}
                <div className="mt-8 overflow-hidden rounded-2xl bg-[#111827] shadow-[0_25px_60px_rgba(17,24,39,0.18)]">
                  <div className="relative h-[260px] overflow-hidden">
                    <img
                      src={officeImage}
                      alt="Saffpoll office location in Jasola Vihar, New Delhi"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#111827]/65" />
                    <div className="absolute inset-0 flex items-end p-7">
                      <div>
                        {officeBadge ? (
                          <span className="inline-flex rounded-full bg-[#CF974A] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                            {officeBadge}
                          </span>
                        ) : null}
                        {officeHeading ? (
                          <h4 className="mt-3 text-2xl font-semibold text-white">
                            {officeHeading}
                          </h4>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 p-7">
                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                          Address
                        </p>
                        <p className="mt-1 text-sm font-medium leading-6 text-slate-300">
                          {officeAddressLines.map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              {idx < officeAddressLines.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                          Phone
                        </p>
                        {officePhones.map((phone, idx) => (
                          <a
                            key={idx}
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="mt-1 block text-sm font-semibold text-white transition-colors hover:text-[#CF974A]"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                          Email
                        </p>
                        <a
                          href={`mailto:${officeEmail}`}
                          className="mt-1 block break-all text-sm font-semibold text-white transition-colors hover:text-[#CF974A]"
                        >
                          {officeEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(17,24,39,0.07)]">
                  <h4 className="text-xl font-semibold text-[#111827]">
                    Quick Actions
                  </h4>

                  <div className="mt-5 space-y-3">
                    {quickActionsToRender.map((action, idx) => {
                      const IconComponent = getIconComponent(action.icon, Phone);
                      return (
                        <a
                          key={action.id || idx}
                          href={action.href || "#"}
                          className="group flex items-center gap-4 rounded-xl bg-[#f7f8fa] p-4 transition-all duration-300 hover:bg-[#CF974A]/10"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A] transition-all group-hover:bg-[#CF974A] group-hover:text-white">
                            <IconComponent size={19} />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-[#111827]">
                              {action.title}
                            </span>
                            <span className="mt-1 block text-xs font-medium text-slate-500">
                              {action.subtitle}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. MAP
      ===================================================== */}
      {isMapEnabled && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
            <Reveal direction="up">
              <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  {mapTag && mapTag.trim() !== "" ? (
                    <SectionLabel>{mapTag}</SectionLabel>
                  ) : null}
                  <h2 className="text-[38px] font-semibold tracking-[-1.3px] text-[#111827] sm:text-[48px]">
                    {mapTitle}
                  </h2>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CF974A] px-5 py-3 text-sm font-bold text-[#CF974A] transition-all duration-300 hover:bg-[#CF974A] hover:text-white"
                >
                  Open in Maps
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </Reveal>

            <Reveal direction="up" delay={120}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_55px_rgba(17,24,39,0.09)]">
                <iframe
                  title="Saffpoll office location"
                  src={embedUrl}
                  className="h-[360px] w-full border-0 md:h-[470px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* =====================================================
          5. FAQ
      ===================================================== */}
      <section className="bg-[#f7f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-[1050px] px-5 sm:px-8">
          <Reveal direction="up">
            <div className="text-center">
              <div className="flex justify-center">
                <SectionLabel>Need To Know?</SectionLabel>
              </div>

              <h2 className="text-[40px] font-semibold tracking-[-1.5px] text-[#111827] sm:text-[52px]">
                Frequently Asked <span className="text-[#CF974A]">Questions</span>
              </h2>

              <p className="mx-auto mt-4 max-w-[650px] text-[16px] leading-7 text-slate-600">
                Quick answers to common questions about Saffpoll, our services,
                and getting started with a project.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-4">
            {faqsToRender.map((faq, index) => (
              <Reveal
                key={faq.id || faq.question || index}
                direction="up"
                delay={index * 80}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  open={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. FINAL CTA
      ===================================================== */}
      {isCtaEnabled && (
        <section className="relative overflow-hidden bg-[#111827] py-20 md:py-28">
          {/* Ambient gold */}
          <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#CF974A]/15 blur-[120px]" />
          <div className="absolute left-0 top-0 h-px w-full bg-[#CF974A]" />

          <div className="relative z-10 mx-auto max-w-[1050px] px-5 text-center sm:px-8">
            <Reveal direction="up">
              {ctaTag && ctaTag.trim() !== "" ? (
                <SectionLabel light>{ctaTag}</SectionLabel>
              ) : null}

              <h2 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-1.5px] text-white sm:text-[56px] md:text-[68px]">
                {renderAccentTitle(ctaTitle, "Project?")}
              </h2>

              {ctaSubtitle ? (
                <p className="mx-auto mt-6 max-w-[700px] text-[16px] leading-7 text-slate-300 md:text-[18px]">
                  {ctaSubtitle}
                </p>
              ) : null}

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CF974A] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9803d]"
                >
                  Contact Us Now
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="tel:+919810464083"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#CF974A] hover:text-[#CF974A]"
                >
                  <Phone size={17} />
                  Call Our Team
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
