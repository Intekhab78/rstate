import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  HardHat,
  Home,
  Layers3,
  Map,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Target,
  Truck,
  Wrench,
} from "lucide-react";

/* =========================================================
   SAFFPOLL SERVICES PAGE
   Brand Gold: #CF974A
   Main Dark : #111827
   Font      : DM Sans
========================================================= */

const GOLD = "#CF974A";
const DARK = "#111827";

/* =========================================================
   ONLINE IMAGES

   Direct images.unsplash.com URLs are used instead of
   source.unsplash.com so the browser gets the image directly.
========================================================= */

const images = {
  hero:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=90",

  building:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=90",

  venture:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90",

  civil:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=90",

  quality:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=90",

  team:
    "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1800&q=90",

  planning:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90",
};

/* =========================================================
   REVEAL ANIMATION
========================================================= */

function Reveal({
  children,
  delay = 0,
  direction = "up",
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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translateY(45px)",
    down: "translateY(-45px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transitionProperty: "opacity, transform",
        transitionDuration: "850ms",
        transitionTimingFunction:
          "cubic-bezier(0.22, 1, 0.36, 1)",
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
    <div
      className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        light ? "text-[#CF974A]" : "text-[#CF974A]"
      }`}
    >
      <span className="h-[2px] w-8 bg-[#CF974A]" />
      <span>{children}</span>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

function ServicesHero() {
  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-[#111827]">
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Saffpoll construction services"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#07101d]/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07101d]/90 via-[#07101d]/70 to-[#07101d]/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07101d]/80 via-transparent to-[#07101d]/30" />
      </div>

      {/* Gold edge */}
      <div className="absolute left-0 top-0 z-20 h-full w-[4px] bg-[#CF974A]" />

      {/* Decorative architectural lines */}
      <div className="pointer-events-none absolute right-[10%] top-0 hidden h-full w-px bg-white/10 lg:block" />
      <div className="pointer-events-none absolute right-[25%] top-0 hidden h-full w-px bg-white/5 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-[1400px] items-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="w-full max-w-[1000px]">
          <Reveal direction="up">
            <div className="mb-6 text-center lg:text-left">
              <span className="inline-flex rounded-full border border-[#CF974A]/50 bg-[#CF974A]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CF974A]">
                Our Services
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} direction="left">
            <h1 className="text-center text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white lg:text-left">
              COMPREHENSIVE
              <br />
              CONSTRUCTION{" "}
              <span className="text-[#CF974A]">
                SOLUTIONS
              </span>
            </h1>
          </Reveal>

          <Reveal delay={220} direction="up">
            <p className="mx-auto mt-8 max-w-[720px] text-center text-[15px] leading-7 text-white/75 sm:text-[18px] lg:mx-0 lg:text-left">
              From residential and commercial construction to
              renovation, development, and civil works, Saffpoll
              delivers practical construction solutions with
              experienced professionals and a strong focus on
              quality.
            </p>
          </Reveal>

          <Reveal delay={320} direction="up">
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <ServicePill icon={<Building2 size={16} />}>
                Building Construction
              </ServicePill>

              <ServicePill icon={<Map size={16} />}>
                Venture Development
              </ServicePill>

              <ServicePill icon={<Truck size={16} />}>
                Civil Works
              </ServicePill>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50 md:flex">
        <span>Explore Services</span>
        <span className="h-8 w-px bg-[#CF974A]" />
      </div>
    </section>
  );
}

function ServicePill({ children, icon }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
      <span className="text-[#CF974A]">{icon}</span>
      {children}
    </div>
  );
}

/* =========================================================
   SERVICE DATA
========================================================= */

const services = [
  {
    number: "01",
    label: "SERVICE 1",
    title: "Building Construction",
    subtitle:
      "Quality construction solutions for residential and commercial buildings",

    description:
      "Saffpoll delivers construction services with a focus on quality workmanship, reliable materials, experienced professionals, and practical project execution. From residential work to commercial construction, we work closely with clients to bring their vision to life.",

    points: [
      "Residential Construction",
      "Commercial Projects",
      "Structural & Building Works",
      "Renovation & Extensions",
    ],

    image: images.building,
    icon: <Building2 size={30} />,
  },

  {
    number: "02",
    label: "SERVICE 2",
    title: "Venture Developments",
    subtitle:
      "Planned developments designed around practical infrastructure and long-term value",

    description:
      "For development-oriented projects, the focus is on thoughtful planning, practical layouts, infrastructure coordination, and a clear execution strategy. This service content is tailored to the direction shown in your reference design and complements Saffpoll's construction capabilities.",

    points: [
      "Site & Development Planning",
      "Residential Layout Concepts",
      "Infrastructure Coordination",
      "Development Execution",
    ],

    image: images.venture,
    icon: <Map size={30} />,
  },

  {
    number: "03",
    label: "SERVICE 3",
    title: "Civil Works",
    subtitle:
      "Infrastructure and civil engineering work delivered with practical execution",

    description:
      "Civil works can include groundwork, site preparation, roads, drainage, utility coordination, and supporting infrastructure. Projects are approached with appropriate equipment, skilled manpower, quality materials, and attention to execution standards.",

    points: [
      "Site Development & Earthwork",
      "Road & Access Works",
      "Drainage & Utility Works",
      "Infrastructure Execution",
    ],

    image: images.civil,
    icon: <HardHat size={30} />,
  },
];

/* =========================================================
   SERVICE SECTION
========================================================= */

function ServiceSection({ service, index }) {
  const reversed = index % 2 === 1;

  return (
    <section
      className={`px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${
        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <Reveal direction={reversed ? "right" : "left"}>
          <div className="group relative">
            <div className="relative overflow-hidden rounded-[20px] shadow-[0_25px_60px_rgba(17,24,39,0.12)]">
              <div className="aspect-[1.12/0.86] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              {/* Service icon */}
              <div className="absolute bottom-6 left-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#CF974A] text-white shadow-xl shadow-black/15 transition-transform duration-500 group-hover:-translate-y-2">
                {service.icon}
              </div>
            </div>

            {/* Decorative gold line */}
            <div
              className={`absolute -bottom-3 ${
                reversed ? "right-8" : "left-8"
              } h-[3px] w-24 bg-[#CF974A] transition-all duration-500 group-hover:w-40`}
            />
          </div>
        </Reveal>

        {/* Content */}
        <Reveal direction={reversed ? "left" : "right"} delay={120}>
          <div>
            <span className="inline-flex rounded-full bg-[#CF974A]/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#CF974A]">
              {service.label}
            </span>

            <div className="mt-5 flex items-start gap-4">
              <span className="hidden text-[70px] font-semibold leading-none tracking-[-0.07em] text-[#CF974A]/10 sm:block">
                {service.number}
              </span>

              <div>
                <h2 className="text-[clamp(2.3rem,4.5vw,4.3rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#111827]">
                  {service.title}
                </h2>

                <p className="mt-5 text-[17px] font-medium leading-7 text-[#31425c]">
                  {service.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[14px] leading-7 text-[#596579] sm:text-[15px]">
              {service.description}
            </p>

            <div className="mt-7 space-y-4">
              {service.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#CF974A] text-[#CF974A]">
                    <CheckCircle2 size={14} />
                  </span>

                  <span className="text-[14px] font-medium text-[#243854] sm:text-[15px]">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="mailto:firoz@saffpoll.com"
              className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-[#CF974A] px-7 py-4 text-[13px] font-semibold text-white shadow-lg shadow-[#CF974A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b9823e]"
            >
              Get a Quote
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   WHY CHOOSE
========================================================= */

const reasons = [
  {
    icon: <ShieldCheck size={25} />,
    title: "20+ Years Experience",
    text: "More than two decades of experience in the building industry.",
  },
  {
    icon: <HardHat size={25} />,
    title: "Experienced Team",
    text: "Architects, designers, builders, and project managers working together.",
  },
  {
    icon: <Clock3 size={25} />,
    title: "Timely Execution",
    text: "A practical approach focused on completing projects to agreed expectations.",
  },
  {
    icon: <CheckCircle2 size={25} />,
    title: "Quality Assurance",
    text: "High-quality workmanship using suitable materials, equipment, and techniques.",
  },
  {
    icon: <Target size={25} />,
    title: "Client-Focused",
    text: "Personalized service built around the client's requirements and vision.",
  },
  {
    icon: <Layers3 size={25} />,
    title: "Complete Solutions",
    text: "Construction, commercial projects, residential work, and renovations.",
  },
];

function WhyChooseSection() {
  return (
    <section className="bg-[#f6f7f8] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal direction="up">
          <div className="mx-auto max-w-[800px] text-center">
            <SectionLabel>Why Saffpoll</SectionLabel>

            <h2 className="text-[clamp(2.5rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#111827]">
              WHY CHOOSE
              <br />
              <span className="text-[#CF974A]">SAFFPOLL?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[700px] text-[15px] leading-7 text-[#596579] sm:text-[17px]">
              We combine experience, quality workmanship, personalized
              service, and experienced professionals to deliver
              construction projects with confidence.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              delay={index * 90}
              direction={index % 2 === 0 ? "up" : "scale"}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[#e7e9ec] bg-white p-7 shadow-[0_5px_20px_rgba(17,24,39,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#CF974A]/35 hover:shadow-[0_20px_45px_rgba(17,24,39,0.08)]">
                {/* Decorative circle */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#CF974A]/5 transition-transform duration-500 group-hover:scale-[2]" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#CF974A]/15 text-[#CF974A] transition-all duration-300 group-hover:bg-[#CF974A] group-hover:text-white">
                  {reason.icon}
                </div>

                <h3 className="relative mt-7 text-[20px] font-semibold tracking-[-0.02em] text-[#111827]">
                  {reason.title}
                </h3>

                <p className="relative mt-3 text-[14px] leading-7 text-[#637084]">
                  {reason.text}
                </p>

                <div className="relative mt-6 h-[2px] w-8 bg-[#CF974A] transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS TIMELINE
========================================================= */

const process = [
  {
    number: "01",
    title: "Consultation & Planning",
    text: "Understanding requirements, site conditions, project goals, and creating a practical project plan.",
    icon: <MessageCircle size={19} />,
  },
  {
    number: "02",
    title: "Design & Coordination",
    text: "Developing the appropriate design direction and coordinating the practical requirements of the project.",
    icon: <Ruler size={19} />,
  },
  {
    number: "03",
    title: "Execution",
    text: "On-site construction using quality materials, suitable equipment, and experienced professionals.",
    icon: <HardHat size={19} />,
  },
  {
    number: "04",
    title: "Quality Check",
    text: "Reviewing workmanship and project details to maintain the expected quality standards.",
    icon: <ClipboardCheck size={19} />,
  },
  {
    number: "05",
    title: "Handover",
    text: "Final delivery with project completion, communication, and continued support where required.",
    icon: <CheckCircle2 size={19} />,
  },
];

function ProcessSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal direction="up">
          <div className="text-center">
            <SectionLabel>Our Process</SectionLabel>

            <h2 className="text-[clamp(2.5rem,5vw,4.3rem)] font-semibold leading-none tracking-[-0.045em] text-[#111827]">
              HOW WE DELIVER
            </h2>

            <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-[#596579] sm:text-[17px]">
              A straightforward approach designed to keep communication,
              quality, and project execution clear at every stage.
            </p>
          </div>
        </Reveal>

        {/* Desktop timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#CF974A]/30" />

          <div className="space-y-16">
            {process.map((item, index) => {
              const left = index % 2 === 0;

              return (
                <div
                  key={item.number}
                  className="relative grid min-h-[190px] grid-cols-2"
                >
                  <Reveal
                    direction={left ? "left" : "right"}
                    delay={index * 100}
                    className={left ? "pr-16" : "col-start-2 pl-16"}
                  >
                    <div
                      className={`relative rounded-2xl bg-[#f7f8f9] p-8 shadow-sm ${
                        left ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`absolute top-6 text-[70px] font-semibold leading-none tracking-[-0.07em] text-[#CF974A]/15 ${
                          left ? "right-7" : "left-7"
                        }`}
                      >
                        {item.number}
                      </div>

                      <div className="relative pt-5">
                        <h3 className="text-[22px] font-semibold tracking-[-0.025em] text-[#111827]">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-[14px] leading-7 text-[#637084]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  {/* Timeline circle */}
                  <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#CF974A] text-white shadow-[0_8px_25px_rgba(207,151,74,0.3)]">
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-0 left-[18px] top-0 w-[2px] bg-[#CF974A]/30" />

          <div className="space-y-8">
            {process.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 90}
                direction="left"
              >
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#CF974A] text-white shadow-md">
                    {item.icon}
                  </div>

                  <div className="rounded-2xl bg-[#f7f8f9] p-6">
                    <div className="text-[13px] font-semibold tracking-[0.12em] text-[#CF974A]">
                      STEP {item.number}
                    </div>

                    <h3 className="mt-2 text-[20px] font-semibold text-[#111827]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[14px] leading-6 text-[#637084]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERTISE STRIP
========================================================= */

function ExpertiseSection() {
  return (
    <section className="relative overflow-hidden bg-[#111827] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="absolute inset-0">
        <img
          src={images.quality}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#111827]/85" />
      </div>

      <div className="relative mx-auto grid max-w-[1250px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal direction="left">
          <SectionLabel light>Built Around Quality</SectionLabel>

          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            EXPERIENCE
            <br />
            <span className="text-[#CF974A]">MATTERS.</span>
          </h2>

          <p className="mt-6 max-w-[570px] text-[15px] leading-7 text-white/65 sm:text-[17px]">
            Saffpoll has more than 20 years of experience in the
            building industry, working across residential renovations
            and large-scale commercial construction.
          </p>

          <div className="mt-7 h-[2px] w-20 bg-[#CF974A]" />
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ExpertiseCard
              icon={<ShieldCheck size={22} />}
              title="Quality Workmanship"
            />

            <ExpertiseCard
              icon={<UsersIcon />}
              title="Experienced Professionals"
            />

            <ExpertiseCard
              icon={<Clock3 size={22} />}
              title="Client Satisfaction"
            />

            <ExpertiseCard
              icon={<Wrench size={22} />}
              title="Modern Techniques"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function UsersIcon() {
  return <Building2 size={22} />;
}

function ExpertiseCard({ icon, title }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CF974A]/40 hover:bg-white/[0.09]">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#CF974A]/15 text-[#CF974A] transition-all duration-300 group-hover:bg-[#CF974A] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-[16px] font-semibold text-white">
        {title}
      </h3>
    </div>
  );
}

/* =========================================================
   CTA
========================================================= */

function ServicesCTA() {
  return (
    <section className="relative overflow-hidden bg-[#CF974A] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* Architectural pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute left-[12%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[30%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[70%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[88%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 top-[28%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[72%] h-px w-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-[950px] text-center">
        <Reveal direction="up">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/75">
            Let's Build Together
          </div>

          <h2 className="mt-5 text-[clamp(2.7rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
            READY TO START
            <br />
            YOUR PROJECT?
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-white/90 sm:text-[18px]">
            Talk to Saffpoll about your residential, commercial,
            renovation, development, or construction requirement.
          </p>
        </Reveal>

        <Reveal delay={160} direction="up">
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:firoz@saffpoll.com"
              className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center gap-2 rounded-lg bg-white px-7 text-[14px] font-semibold text-[#CF974A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#111827] hover:text-white"
            >
              Contact Us Now
              <ArrowRight size={18} />
            </a>

            <a
              href="tel:+919810464083"
              className="inline-flex min-h-[56px] min-w-[210px] items-center justify-center gap-2 rounded-lg border-2 border-white px-7 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#CF974A]"
            >
              Call +91 98104 64083
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Services() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="overflow-hidden bg-white font-['DM_Sans',sans-serif]">
      <ServicesHero />

      {services.map((service, index) => (
        <ServiceSection
          key={service.number}
          service={service}
          index={index}
        />
      ))}

      <WhyChooseSection />

      <ProcessSection />

      <ExpertiseSection />

      <ServicesCTA />
    </main>
  );
}