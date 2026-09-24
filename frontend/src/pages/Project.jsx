import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/api.js";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  HardHat,
  Home,
  Layers3,
  Mail,
  Phone,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";

/* =========================================================
   Saffpoll Project Page
   Brand:
   Gold  : #CF974A
   Dark  : #171717
   Font  : DM Sans
========================================================= */

const GOLD = "#CF974A";
const DARK = "#171717";

/* =========================================================
   ONLINE IMAGES & FALLBACKS
========================================================= */

const images = {
  hero:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=90",
  residential:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
  commercial:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
  renovation:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",
  construction:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=90",
  planning:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=90",
  sustainable:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=90",
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
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translateY(45px)",
    down: "translateY(-45px)",
    left: "translateX(-55px)",
    right: "translateX(55px)",
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
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
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

function SectionLabel({ children, dark = false }) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-[#CF974A]" : "text-[#CF974A]"
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

function ProjectHero() {
  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-[#171717]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Saffpoll construction project"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Gold architectural line */}
      <div className="absolute left-0 top-0 h-full w-[5px] bg-[#CF974A]" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] max-w-[1450px] items-center px-6 py-24 sm:px-10 lg:px-16">
        <div className="max-w-[1050px]">
          <Reveal direction="left">
            <div className="mb-7 flex flex-wrap gap-2">
              {[
                "RESIDENTIAL",
                "COMMERCIAL",
                "RENOVATION & EXTENSIONS",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} direction="left">
            <h1 className="max-w-[1100px] text-[clamp(3.4rem,7.5vw,7.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-white">
              PROJECTS
              <br />
              <span style={{ color: GOLD }}>BUILT TO LAST.</span>
            </h1>
          </Reveal>

          <Reveal delay={220} direction="up">
            <p className="mt-8 max-w-[680px] text-[16px] leading-7 text-white/80 sm:text-[18px]">
              Delivering quality construction solutions with experienced
              professionals, reliable execution, and a commitment to lasting
              value.
            </p>
          </Reveal>

          {/* Hero stats */}
          <Reveal delay={320} direction="up">
            <div className="mt-10 grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-3">
              <HeroStat
                number="20+"
                label="Years Experience"
                icon={<Clock3 size={18} />}
              />

              <HeroStat
                number="3"
                label="Core Services"
                icon={<Layers3 size={18} />}
              />

              <HeroStat
                number="100%"
                label="Quality Focus"
                icon={<ShieldCheck size={18} />}
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 md:flex">
        <span>Explore Projects</span>
        <span className="h-8 w-px bg-[#CF974A]" />
      </div>
    </section>
  );
}

function HeroStat({ number, label, icon }) {
  return (
    <div className="group rounded-xl border border-white/15 bg-white/[0.09] px-5 py-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#CF974A]/50 hover:bg-white/[0.13]">
      <div className="flex items-center gap-3">
        <div className="text-[#CF974A]">{icon}</div>

        <div>
          <div className="text-[28px] font-semibold leading-none text-[#CF974A] sm:text-[32px]">
            {number}
          </div>

          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white/70">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT GALLERY (DYNAMIC API FETCH)
========================================================= */

const fallbackProjects = [
  {
    id: "fb-1",
    title: "Residential Construction",
    category: "Residential",
    description:
      "Quality homes planned and built around client requirements, functionality, and lasting value.",
    image_url: images.residential,
    icon: <Home size={21} />,
  },
  {
    id: "fb-2",
    title: "Commercial Projects",
    category: "Commercial",
    description:
      "Professional commercial construction solutions with attention to timelines, safety, and execution.",
    image_url: images.commercial,
    icon: <Building2 size={21} />,
  },
  {
    id: "fb-3",
    title: "Renovation & Extensions",
    category: "Renovation",
    description:
      "Existing spaces transformed through thoughtful extensions, improvements, and modern construction.",
    image_url: images.renovation,
    icon: <Wrench size={21} />,
  },
  {
    id: "fb-4",
    title: "Construction Execution",
    category: "Building Works",
    description:
      "From groundwork to finishing, every stage is approached with experienced teams and quality materials.",
    image_url: images.construction,
    icon: <HardHat size={21} />,
  },
  {
    id: "fb-5",
    title: "Planning & Development",
    category: "Planning",
    description:
      "Coordinated planning and project execution designed to keep construction clear, practical, and efficient.",
    image_url: images.planning,
    icon: <Ruler size={21} />,
  },
  {
    id: "fb-6",
    title: "Sustainable Building",
    category: "Responsible Construction",
    description:
      "Construction approaches that consider sustainable materials and environmentally responsible methods.",
    image_url: images.sustainable,
    icon: <CheckCircle2 size={21} />,
  },
];

function ProjectsGallery() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiFetch("/projects");
        if (!res.ok) throw new Error("API response error");
        const data = await res.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setProjectsList(data.data);
          } else {
            setProjectsList(fallbackProjects);
          }
        }
      } catch (err) {
        if (isMounted) {
          setProjectsList(fallbackProjects);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#f7f7f6] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <Reveal direction="up">
          <div className="text-center">
            <SectionLabel>Our Portfolio</SectionLabel>

            <h2 className="text-[clamp(2.4rem,5vw,4.4rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-[#171717]">
              OUR PROJECTS
            </h2>

            <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-[#5b6470] sm:text-[17px]">
              From residential construction to commercial projects and
              renovations, Saffpoll delivers practical construction solutions
              with quality at every stage.
            </p>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-14 text-center py-12 text-[#CF974A] font-medium text-sm animate-pulse">
            Loading project portfolio from database...
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {projectsList.map((project, index) => (
              <Reveal
                key={project.id || project.title || index}
                delay={index * 100}
                direction={index % 2 === 0 ? "up" : "scale"}
              >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const projectImg =
    project.image_url ||
    project.image ||
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=90";

  return (
    <article className="group relative overflow-hidden rounded-[18px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
      {/* Image */}
      <div className="relative aspect-[1.12/1] overflow-hidden">
        <img
          src={projectImg}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        {/* Gold glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#CF974A]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category */}
        <div className="absolute left-5 top-5">
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {project.category || "Construction"}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-[-8px] items-center justify-center rounded-full bg-[#CF974A] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {project.icon || <Building2 size={21} />}
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#CF974A]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#CF974A]">
              Saffpoll
            </span>
          </div>

          <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[25px]">
            {project.title}
          </h3>

          {project.description && (
            <p className="mt-2 max-h-0 overflow-hidden text-[13px] leading-6 text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Gold bottom line */}
      <div className="h-[4px] w-0 bg-[#CF974A] transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

/* =========================================================
   STATS STRIP
========================================================= */

const statistics = [
  {
    number: "20+",
    label: "Years Experience",
  },
  {
    number: "3",
    label: "Core Services",
  },
  {
    number: "1998",
    label: "Founded",
  },
  {
    number: "100%",
    label: "Commitment to Quality",
  },
];

function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#dfe2e6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      {/* subtle architectural background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-[10%] top-0 h-full w-px bg-black" />
        <div className="absolute left-[25%] top-0 h-full w-px bg-black" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-black" />
        <div className="absolute left-[75%] top-0 h-full w-px bg-black" />
        <div className="absolute right-[10%] top-0 h-full w-px bg-black" />
      </div>

      <div className="relative mx-auto grid max-w-[1250px] grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-8">
        {statistics.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 120}
            direction="up"
            className="text-center"
          >
            <div className="text-[42px] font-semibold leading-none tracking-[-0.04em] text-[#CF974A] sm:text-[50px] lg:text-[58px]">
              {stat.number}
            </div>

            <div className="mt-3 text-[12px] font-medium uppercase tracking-[0.1em] text-[#273142] sm:text-[13px]">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT APPROACH
========================================================= */

const approach = [
  {
    number: "01",
    title: "Understand",
    text: "We begin by understanding the client's requirements, project vision, site conditions, and expectations.",
    icon: <Ruler size={23} />,
  },
  {
    number: "02",
    title: "Plan",
    text: "Our experienced professionals coordinate planning, materials, timelines, and the practical requirements of execution.",
    icon: <Layers3 size={23} />,
  },
  {
    number: "03",
    title: "Build",
    text: "Our team executes the work with quality materials, appropriate equipment, and established construction practices.",
    icon: <HardHat size={23} />,
  },
  {
    number: "04",
    title: "Deliver",
    text: "We stay focused on quality, timelines, communication, and delivering a finished project that meets the client's vision.",
    icon: <CheckCircle2 size={23} />,
  },
];

function ApproachSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1250px]">
        <Reveal direction="left">
          <div className="max-w-[720px]">
            <SectionLabel>How We Work</SectionLabel>

            <h2 className="text-[clamp(2.3rem,5vw,4.2rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em] text-[#171717]">
              FROM VISION
              <br />
              <span className="text-[#CF974A]">TO COMPLETION.</span>
            </h2>

            <p className="mt-6 max-w-[650px] text-[15px] leading-7 text-[#5b6470] sm:text-[17px]">
              Saffpoll combines experienced professionals, quality materials,
              modern techniques, and a client-focused approach to deliver
              construction projects with confidence.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {approach.map((item, index) => (
            <Reveal
              key={item.number}
              delay={index * 110}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-[#e7e7e7] bg-[#fafafa] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#CF974A]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#CF974A]/10 transition-transform duration-500 group-hover:scale-[2.2]" />

                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CF974A] text-white shadow-lg shadow-[#CF974A]/20">
                    {item.icon}
                  </div>

                  <span className="text-[46px] font-semibold leading-none tracking-[-0.06em] text-[#171717]/[0.08]">
                    {item.number}
                  </span>
                </div>

                <div className="relative mt-7">
                  <h3 className="text-[24px] font-semibold tracking-[-0.025em] text-[#171717]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-[#626b77]">
                    {item.text}
                  </p>
                </div>

                <div className="relative mt-6 h-[2px] w-10 bg-[#CF974A] transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   QUALITY / TRUST SECTION
========================================================= */

function QualitySection() {
  return (
    <section className="overflow-hidden bg-[#171717] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1380px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-[22px]">
            <img
              src={images.construction}
              alt="Saffpoll construction work"
              loading="lazy"
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="border-l-2 border-[#CF974A] pl-5">
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#CF974A]">
                  Saffpoll
                </div>

                <div className="mt-1 text-[20px] font-semibold text-white">
                  Building with purpose.
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={150}>
          <SectionLabel>Why Saffpoll</SectionLabel>

          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em] text-white">
            QUALITY
            <br />
            <span className="text-[#CF974A]">YOU CAN TRUST.</span>
          </h2>

          <p className="mt-7 max-w-[650px] text-[15px] leading-7 text-white/65 sm:text-[17px]">
            With more than two decades of experience in the building industry,
            Saffpoll has worked across residential renovations and
            large-scale commercial construction.
          </p>

          <div className="mt-9 space-y-5">
            <TrustPoint
              title="Experienced Professionals"
              text="Architects, designers, builders, and project managers work together to deliver projects."
            />

            <TrustPoint
              title="Quality Workmanship"
              text="We focus on quality materials, equipment, modern techniques, and established industry standards."
            />

            <TrustPoint
              title="Client-Focused Service"
              text="We work closely with clients to understand their vision and deliver within agreed expectations."
            />

            <TrustPoint
              title="Sustainable Practices"
              text="Where possible, Saffpoll uses eco-friendly materials and construction methods."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustPoint({ title, text }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#CF974A]/15 text-[#CF974A]">
        <CheckCircle2 size={17} />
      </div>

      <div>
        <h3 className="text-[16px] font-semibold text-white">{title}</h3>

        <p className="mt-1 text-[13px] leading-6 text-white/55">{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   CTA
========================================================= */

function ProjectCTA() {
  return (
    <section className="relative overflow-hidden bg-[#CF974A] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {/* architectural pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute left-[15%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[35%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[65%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[85%] top-0 h-full w-px bg-white" />

        <div className="absolute left-0 top-[30%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[70%] h-px w-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-[1000px] text-center">
        <Reveal direction="up">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/75">
            Start Your Project
          </div>

          <h2 className="mt-5 text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            LET'S BUILD
            <br />
            YOUR VISION.
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-7 text-white/90 sm:text-[18px]">
            Have a residential, commercial, renovation, or construction
            requirement? Talk with the Saffpoll team about your project.
          </p>
        </Reveal>

        <Reveal delay={180} direction="up">
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:firoz@saffpoll.com"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg bg-white px-7 text-[14px] font-semibold text-[#CF974A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] hover:text-white"
            >
              <Mail size={18} />
              Start a Project
            </a>

            <a
              href="tel:+919810464083"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-lg border-2 border-white px-7 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#CF974A]"
            >
              <Phone size={18} />
              Call +91 98104 64083
            </a>
          </div>
        </Reveal>

        <Reveal delay={300} direction="up">
          <div className="mt-8 text-[12px] font-medium text-white/75">
            +91 85959 64083 &nbsp; • &nbsp; firoz@saffpoll.com
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Project() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="overflow-hidden bg-white font-['DM_Sans',sans-serif]">
      <ProjectHero />

      <ProjectsGallery />

      <StatsSection />

      <ApproachSection />

      <QualitySection />

      <ProjectCTA />
    </main>
  );
}
