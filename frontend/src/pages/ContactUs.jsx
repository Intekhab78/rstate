import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Shield,
  Wrench,
  HelpCircle,
  Sparkles,
  Award,
  FileText,
} from "lucide-react";

const GOLD = "#CF974A";

const iconMap = {
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Shield,
  Wrench,
  HelpCircle,
  Sparkles,
  Award,
  FileText,
};

const isItemEnabled = (val) =>
  val !== false && val !== 0 && val !== "false" && val !== "0" && val !== null && val !== undefined;

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
  if (!children) return null;
  return (
    <div
      className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#CF974A]" : "text-[#CF974A]"
      }`}
    >
      <span className="h-[2px] w-8 bg-[#CF974A]" />
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon: IconComponent,
  label,
  children,
  href,
  delay,
}) {
  const Icon = IconComponent || Phone;
  const content = (
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

  if (href) {
    return (
      <Reveal direction="up" delay={delay}>
        <a href={href} className="block h-full">
          {content}
        </a>
      </Reveal>
    );
  }

  return (
    <Reveal direction="up" delay={delay}>
      {content}
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
   MAIN COMPONENT
========================================================= */

export default function ContactUs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
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
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact-page");
        if (!res.ok) throw new Error("Failed to fetch Contact Page API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setContent(json.data);
        }
      } catch (err) {
        console.error("Error fetching contact-page content:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContent();
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
      await fetch("http://localhost:5000/api/enquiries", {
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
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-white font-['DM_Sans']">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#CF974A] border-t-transparent" />
      </div>
    );
  }

  if (!content) {
    return null;
  }

  // Filtered lists with resilient key mappings
  const rawCards = Array.isArray(content.contact_cards) ? content.contact_cards : [];
  const visibleCards = rawCards.filter((c) => isItemEnabled(c.enabled));

  const rawServices = Array.isArray(content.form_settings?.service_options)
    ? content.form_settings.service_options
    : [];
  const serviceOptions = rawServices.filter((s) => isItemEnabled(s.enabled));

  const rawActions = Array.isArray(content.quick_actions)
    ? content.quick_actions
    : Array.isArray(content.quick_actions?.actions)
    ? content.quick_actions.actions
    : [];
  const visibleActions = rawActions.filter((a) => isItemEnabled(a.enabled));

  const rawFaqs = Array.isArray(content.faqs)
    ? content.faqs
    : Array.isArray(content.faqs?.items)
    ? content.faqs.items
    : [];
  const visibleFaqs = rawFaqs.filter((f) => isItemEnabled(f.enabled));

  const showHero = isItemEnabled(content.hero?.enabled);
  const showCards = visibleCards.length > 0;
  const showFormSection =
    isItemEnabled(content.form_settings?.enabled) ||
    isItemEnabled(content.office_info?.enabled) ||
    visibleActions.length > 0;
  const showMapSection = isItemEnabled(content.map?.enabled);
  const showFaqSection = isItemEnabled(content.faqs?.enabled !== false) && visibleFaqs.length > 0;
  const showFinalCta = isItemEnabled(content.final_cta?.enabled);

  // Hero fields
  const heroTag = content.hero?.tag || content.hero?.tagline || "";
  const heroTitle = content.hero?.title || content.hero?.title_line1 || "";
  const heroDesc = content.hero?.subtitle || content.hero?.description || "";
  const heroBg = content.hero?.bg_image || content.hero?.bg_image_url || "";
  const heroButtons = Array.isArray(content.hero?.buttons)
    ? content.hero.buttons.filter((b) => isItemEnabled(b.enabled))
    : [];

  return (
    <main className="overflow-hidden bg-white font-['DM_Sans'] text-[#111827]">
      {/* =====================================================
          HERO
      ===================================================== */}
      {showHero && (
        <section className="relative min-h-[590px] overflow-hidden md:min-h-[650px]">
          {heroBg && (
            <img
              src={heroBg}
              alt="Saffpoll construction team"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

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
              {heroTag && (
                <Reveal direction="down">
                  <div className="mb-5 flex justify-center md:justify-start">
                    <SectionLabel light>{heroTag}</SectionLabel>
                  </div>
                </Reveal>
              )}

              {heroTitle && (
                <Reveal direction="left" delay={120}>
                  <h1 className="text-[48px] font-semibold leading-[0.98] tracking-[-2.5px] text-white sm:text-[62px] md:text-[78px] lg:text-[92px]">
                    {heroTitle}
                  </h1>
                </Reveal>
              )}

              {heroDesc && (
                <Reveal direction="up" delay={240}>
                  <p className="mx-auto mt-7 max-w-[760px] text-[17px] leading-8 text-slate-200 md:mx-0 md:text-[19px]">
                    {heroDesc}
                  </p>
                </Reveal>
              )}

              <Reveal direction="up" delay={360}>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                  {heroButtons.length > 0 ? (
                    heroButtons.map((btn, bIdx) => {
                      const BtnIcon = iconMap[btn.icon] || ArrowUpRight;
                      const isOutline = btn.style === "outline";
                      return (
                        <a
                          key={btn.id || bIdx}
                          href={btn.link || btn.href || "#"}
                          className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-1 ${
                            isOutline
                              ? "border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-[#CF974A] hover:text-[#CF974A]"
                              : "bg-[#CF974A] text-white shadow-lg shadow-[#CF974A]/20 hover:bg-[#b9803d]"
                          }`}
                        >
                          {btn.text}
                          <BtnIcon size={18} />
                        </a>
                      );
                    })
                  ) : (
                    <>
                      {isItemEnabled(content.hero?.btn1_enabled) && content.hero?.btn1_text && (
                        <a
                          href={content.hero.btn1_link || "#contact-form"}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CF974A] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#CF974A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9803d]"
                        >
                          {content.hero.btn1_text}
                          <ArrowUpRight size={18} />
                        </a>
                      )}

                      {isItemEnabled(content.hero?.btn2_enabled) && content.hero?.btn2_text && (
                        <a
                          href={content.hero.btn2_link || "tel:+919810464083"}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CF974A] hover:text-[#CF974A]"
                        >
                          <Phone size={17} />
                          {content.hero.btn2_text}
                        </a>
                      )}
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-[#CF974A]" />
        </section>
      )}

      {/* =====================================================
          CONTACT INFO CARDS
      ===================================================== */}
      {showCards && (
        <section className="relative bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
            <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-${Math.min(visibleCards.length, 4)}`}>
              {visibleCards.map((card, idx) => {
                const IconComponent = iconMap[card.icon] || Phone;
                const lines = Array.isArray(card.lines)
                  ? card.lines
                  : [card.text1, card.text2].filter(Boolean);

                return (
                  <ContactCard
                    key={card.id || idx}
                    icon={IconComponent}
                    label={card.label}
                    href={card.href || card.link}
                    delay={idx * 100}
                  >
                    {lines.map((line, lIdx) => (
                      <span
                        key={lIdx}
                        className={lIdx === 0 ? "block" : "mt-1 block text-sm font-medium text-slate-500"}
                      >
                        {line}
                      </span>
                    ))}
                  </ContactCard>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FORM + OFFICE
      ===================================================== */}
      {showFormSection && (
        <section id="contact-form" className="bg-[#f7f8fa] py-20 md:py-28">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              {/* FORM */}
              {isItemEnabled(content.form_settings?.enabled) && (
                <Reveal direction="left">
                  <div>
                    {(content.form_settings.tag || content.form_settings.tagline) && (
                      <SectionLabel>
                        {content.form_settings.tag || content.form_settings.tagline}
                      </SectionLabel>
                    )}

                    {content.form_settings.title && (
                      <h2 className="max-w-[600px] text-[40px] font-semibold leading-[1.05] tracking-[-1.5px] text-[#111827] sm:text-[48px]">
                        {content.form_settings.title}
                      </h2>
                    )}

                    {content.form_settings.description && (
                      <p className="mt-5 max-w-[620px] text-[16px] leading-7 text-slate-600">
                        {content.form_settings.description}
                      </p>
                    )}

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

                      {serviceOptions.length > 0 && (
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
                              {serviceOptions.map((opt, oIdx) => (
                                <option key={opt.id || oIdx} value={opt.value || opt.label}>
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
                      )}

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
                            {submitting ? "Sending..." : "Send Message"}
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
              )}

              {/* RIGHT SIDE */}
              <Reveal direction="right" delay={150}>
                <div className="lg:pt-8 space-y-8">
                  {/* Office Card */}
                  {isItemEnabled(content.office_info?.enabled) && (
                    <div>
                      {(content.office_info.tag || content.office_info.tagline) && (
                        <SectionLabel>
                          {content.office_info.tag || content.office_info.tagline}
                        </SectionLabel>
                      )}

                      {content.office_info.title && (
                        <h3 className="text-[34px] font-semibold tracking-[-1px] text-[#111827]">
                          {content.office_info.title}
                        </h3>
                      )}

                      {content.office_info.description && (
                        <p className="mt-4 text-[15px] leading-7 text-slate-600">
                          {content.office_info.description}
                        </p>
                      )}

                      <div className="mt-8 overflow-hidden rounded-2xl bg-[#111827] shadow-[0_25px_60px_rgba(17,24,39,0.18)]">
                        {(content.office_info.image_url || content.office_info.image) && (
                          <div className="relative h-[260px] overflow-hidden">
                            <img
                              src={content.office_info.image_url || content.office_info.image}
                              alt="Saffpoll office location"
                              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#111827]/65" />
                            <div className="absolute inset-0 flex items-end p-7">
                              <div>
                                {(content.office_info.badge || content.office_info.badge_text) && (
                                  <span className="inline-flex rounded-full bg-[#CF974A] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                    {content.office_info.badge || content.office_info.badge_text}
                                  </span>
                                )}
                                {(content.office_info.heading || content.office_info.city_heading) && (
                                  <h4 className="mt-3 text-2xl font-semibold text-white">
                                    {content.office_info.heading || content.office_info.city_heading}
                                  </h4>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-5 p-7">
                          {(Array.isArray(content.office_info.address_lines)
                            ? content.office_info.address_lines.join(", ")
                            : content.office_info.address_val) && (
                            <div className="flex gap-4">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                                <MapPin size={20} />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                                  Address
                                </p>
                                <p className="mt-1 text-sm font-medium leading-6 text-slate-300">
                                  {Array.isArray(content.office_info.address_lines)
                                    ? content.office_info.address_lines.join(", ")
                                    : content.office_info.address_val}
                                </p>
                              </div>
                            </div>
                          )}

                          {Array.isArray(content.office_info.phones) &&
                            content.office_info.phones.length > 0 && (
                              <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                                  <Phone size={20} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                                    Phone
                                  </p>
                                  {content.office_info.phones.map((ph, pIdx) => (
                                    <a
                                      key={pIdx}
                                      href={`tel:${ph.replace(/\s+/g, "")}`}
                                      className="mt-1 block text-sm font-semibold text-white transition-colors hover:text-[#CF974A]"
                                    >
                                      {ph}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                          {(content.office_info.email || content.office_info.email_val) && (
                            <div className="flex gap-4">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A]">
                                <Mail size={20} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#CF974A]">
                                  Email
                                </p>
                                <a
                                  href={`mailto:${content.office_info.email || content.office_info.email_val}`}
                                  className="mt-1 block break-all text-sm font-semibold text-white transition-colors hover:text-[#CF974A]"
                                >
                                  {content.office_info.email || content.office_info.email_val}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  {visibleActions.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(17,24,39,0.07)]">
                      <h4 className="text-xl font-semibold text-[#111827]">
                        {content.quick_actions?.title || "Quick Actions"}
                      </h4>

                      <div className="mt-5 space-y-3">
                        {visibleActions.map((act, aIdx) => {
                          const ActIcon = iconMap[act.icon] || Phone;
                          return (
                            <a
                              key={act.id || aIdx}
                              href={act.link || act.href || "#"}
                              className="group flex items-center gap-4 rounded-xl bg-[#f7f8fa] p-4 transition-all duration-300 hover:bg-[#CF974A]/10"
                            >
                              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A] transition-all group-hover:bg-[#CF974A] group-hover:text-white">
                                <ActIcon size={19} />
                              </span>
                              <span>
                                <span className="block text-sm font-bold text-[#111827]">
                                  {act.title}
                                </span>
                                {act.subtitle && (
                                  <span className="mt-1 block text-xs font-medium text-slate-500">
                                    {act.subtitle}
                                  </span>
                                )}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          MAP
      ===================================================== */}
      {showMapSection && (
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
            <Reveal direction="up">
              <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  {(content.map.tag || content.map.tagline) && (
                    <SectionLabel>{content.map.tag || content.map.tagline}</SectionLabel>
                  )}
                  {content.map.title && (
                    <h2 className="text-[38px] font-semibold tracking-[-1.3px] text-[#111827] sm:text-[48px]">
                      {content.map.title}
                    </h2>
                  )}
                </div>

                {(content.map.maps_url || content.map.btn_link) && (
                  <a
                    href={content.map.maps_url || content.map.btn_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CF974A] px-5 py-3 text-sm font-bold text-[#CF974A] transition-all duration-300 hover:bg-[#CF974A] hover:text-white"
                  >
                    Open in Maps
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </Reveal>

            {content.map.embed_url && (
              <Reveal direction="up" delay={120}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_55px_rgba(17,24,39,0.09)]">
                  <iframe
                    title="Saffpoll office location"
                    src={content.map.embed_url}
                    className="h-[360px] w-full border-0 md:h-[470px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          FAQ
      ===================================================== */}
      {showFaqSection && (
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
                  Quick answers to common questions about Saffpoll, our services, and getting started with a project.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 space-y-4">
              {visibleFaqs.map((faq, index) => (
                <Reveal key={faq.id || index} direction="up" delay={index * 80}>
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
      )}

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      {showFinalCta && (
        <section className="relative overflow-hidden bg-[#111827] py-20 md:py-28">
          {/* Ambient gold */}
          <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#CF974A]/15 blur-[120px]" />
          <div className="absolute left-0 top-0 h-px w-full bg-[#CF974A]" />

          <div className="relative z-10 mx-auto max-w-[1050px] px-5 text-center sm:px-8">
            <Reveal direction="up">
              {(content.final_cta.tag || content.final_cta.tagline) && (
                <SectionLabel light>{content.final_cta.tag || content.final_cta.tagline}</SectionLabel>
              )}

              {content.final_cta.title && (
                <h2 className="mt-4 text-[42px] font-semibold leading-[1.05] tracking-[-1.5px] text-white sm:text-[56px] md:text-[68px]">
                  {content.final_cta.title}
                </h2>
              )}

              {(content.final_cta.subtitle || content.final_cta.description) && (
                <p className="mx-auto mt-6 max-w-[700px] text-[16px] leading-7 text-slate-300 md:text-[18px]">
                  {content.final_cta.subtitle || content.final_cta.description}
                </p>
              )}

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                {Array.isArray(content.final_cta.buttons) && content.final_cta.buttons.length > 0 ? (
                  content.final_cta.buttons
                    .filter((b) => isItemEnabled(b.enabled))
                    .map((btn, bIdx) => {
                      const BtnIcon = iconMap[btn.icon] || ArrowUpRight;
                      const isOutline = btn.style === "outline";
                      return (
                        <a
                          key={btn.id || bIdx}
                          href={btn.link || btn.href || "#"}
                          className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1 ${
                            isOutline
                              ? "border border-white/25 bg-white/5 text-white hover:border-[#CF974A] hover:text-[#CF974A]"
                              : "bg-[#CF974A] text-white hover:bg-[#b9803d]"
                          }`}
                        >
                          {btn.text}
                          <BtnIcon size={18} />
                        </a>
                      );
                    })
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}