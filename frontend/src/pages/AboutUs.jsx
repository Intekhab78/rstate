import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/api.js";
import {
    ArrowDownRight,
    ArrowRight,
    Check,
    Handshake,
    HardHat,
    Leaf,
    MessageSquare,
    ShieldCheck,
    Users,
    Wrench,
    Award,
    Building2,
    ClipboardCheck,
    Ruler,
    Search,
    CircleCheck,
    Lightbulb
} from "lucide-react";

const GOLD = "#CF974A";
const DARK = "#111827";

// Helper map for dynamic Lucide icons
const iconMap = {
    Building2,
    Wrench,
    Ruler,
    HardHat,
    ShieldCheck,
    Users,
    Handshake,
    MessageSquare,
    Search,
    ClipboardCheck,
    CircleCheck,
    Check,
    Award,
    Leaf,
    Lightbulb
};

function renderIcon(iconName, size = 17, color = GOLD) {
    const Component = iconMap[iconName] || Building2;
    return <Component size={size} style={{ color }} />;
}

/* =========================================================
   REVEAL COMPONENT
========================================================= */

function Reveal({
    children,
    className = "",
    direction = "up",
    delay = 0,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("about-visible");
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.12,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const directionClass =
        direction === "left"
            ? "about-from-left"
            : direction === "right"
                ? "about-from-right"
                : direction === "scale"
                    ? "about-from-scale"
                    : "about-from-up";

    return (
        <div
            ref={ref}
            className={`about-reveal ${directionClass} ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* =========================================================
   SMALL LABEL
========================================================= */

function SectionLabel({ children }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <span
                className="h-[2px] w-8"
                style={{ backgroundColor: GOLD }}
            />
            <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
            >
                {children}
            </span>
        </div>
    );
}

// Fallback initial data
const defaultAboutData = {
    hero: {
        enabled: true,
        badge1: 'About Saffpoll',
        badge2: '20+ Years Experience',
        title_line1: 'Building with',
        title_highlight1: 'experience.',
        title_line2: 'Delivering with',
        title_highlight2: 'purpose.',
        description: 'Saffpoll is a trusted building contractor with more than 20 years of experience delivering residential, commercial, renovation and construction solutions.',
        btn1_text: 'Our Story',
        btn1_link: '#our-story',
        btn2_text: 'Why Saffpoll',
        btn2_link: '#why-saffpoll',
        hero_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85',
        exp_card_label: 'Experience',
        exp_card_value: '20+',
        exp_card_subtext: 'Years of Experience',
        pills: [
            { id: 'p1', enabled: true, icon: 'Building2', label: 'Residential' },
            { id: 'p2', enabled: true, icon: 'Wrench', label: 'Commercial' },
            { id: 'p3', enabled: true, icon: 'Ruler', label: 'Renovation' }
        ]
    },
    story: {
        enabled: true,
        section_label: 'Our Story',
        section_title: 'Our Journey Since 1998',
        section_description: 'From a small beginning to a trusted building contractor, Saffpoll has grown through experience, quality workmanship and long-term client relationships.',
        timeline: [
            {
                id: 'st_1998',
                enabled: true,
                year_tag: '1998',
                title: 'The Beginning',
                description: 'Saffpoll began with a clear purpose: to provide dependable construction solutions built on workmanship, quality materials and professional execution.',
                image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85'
            },
            {
                id: 'st_exp',
                enabled: true,
                year_tag: 'EXPERIENCE',
                title: 'Growing Through Experience',
                description: 'Over the years, our capabilities have expanded across residential construction, commercial projects, renovation and extensions, allowing us to serve different project requirements with the same commitment to quality.',
                image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85'
            },
            {
                id: 'st_today',
                enabled: true,
                year_tag: 'TODAY',
                title: 'A Trusted Building Partner',
                description: 'Today, Saffpoll combines experienced professionals, modern techniques and a client-focused approach to deliver projects with attention to quality, timelines and expectations.',
                image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85'
            }
        ]
    },
    mission: {
        enabled: true,
        tag: 'Our Mission',
        title: 'Quality Work.\nClear Communication.\nReliable Delivery.',
        description: "Our goal is to understand every client's vision, execute with care, maintain quality throughout the project and deliver work that meets expectations.",
        bg_image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=2200&q=85'
    },
    people: {
        enabled: true,
        section_label: 'Our People',
        section_title: 'The People Behind Saffpoll',
        section_description: 'Experienced professionals working together to plan, coordinate and deliver construction projects with care.',
        image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=85',
        highlight_title: 'Experienced people.\nOne shared standard.',
        highlight_description: 'Saffpoll works with a team of architects, designers, builders and project managers who bring practical experience to every stage of construction.',
        cards: [
            {
                id: 'pp_1',
                enabled: true,
                icon: 'Users',
                title: 'Experienced Professionals',
                description: 'Skilled architects, engineers and managers who guide projects from concept to completion.'
            },
            {
                id: 'pp_2',
                enabled: true,
                icon: 'HardHat',
                title: 'Skilled Execution',
                description: 'On-site teams dedicated to maintaining construction quality, safety standards and precise execution.'
            }
        ]
    }
};

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutUs() {
    const [pageData, setPageData] = useState(defaultAboutData);

    useEffect(() => {
        const fetchAboutPage = async () => {
            try {
                const response = await apiFetch('/about-page');
                const data = await response.json();
                if (data.success && data.data) {
                    setPageData((prev) => ({
                        hero: { ...prev.hero, ...data.data.hero },
                        story: { ...prev.story, ...data.data.story },
                        mission: { ...prev.mission, ...data.data.mission },
                        people: { ...prev.people, ...data.data.people }
                    }));
                }
            } catch (err) {
                console.error("Error fetching dynamic About Us page data:", err);
            }
        };

        fetchAboutPage();
    }, []);

    const { hero, story, mission, people } = pageData;

    const visiblePills = (hero.pills || []).filter((p) => p.enabled !== false);
    const visibleTimeline = (story.timeline || []).filter((t) => t.enabled !== false);
    const visiblePeopleCards = (people.cards || []).filter((c) => c.enabled !== false);

    return (
        <main className="overflow-hidden bg-white">
            {/* Page Animations */}
            <style>{`
        .about-reveal {
          opacity: 0;
          transition:
            opacity 800ms cubic-bezier(.22,1,.36,1),
            transform 800ms cubic-bezier(.22,1,.36,1);
        }

        .about-from-up {
          transform: translateY(45px);
        }

        .about-from-left {
          transform: translateX(-55px);
        }

        .about-from-right {
          transform: translateX(55px);
        }

        .about-from-scale {
          transform: scale(.94);
        }

        .about-visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }

        .about-image {
          transition: transform 800ms cubic-bezier(.22,1,.36,1);
        }

        .about-image-wrap:hover .about-image {
          transform: scale(1.045);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .about-image {
            transition: none;
          }
        }
      `}</style>

            {/* =====================================================
          01 — ABOUT HERO
      ====================================================== */}
            {hero.enabled !== false && (
                <section className="relative min-h-[calc(100vh-90px)] overflow-hidden bg-[#f5f6f7]">
                    <div
                        className="absolute right-0 top-0 h-full w-[5px]"
                        style={{ backgroundColor: GOLD }}
                    />

                    <div className="mx-auto grid min-h-[calc(100vh-90px)] max-w-[1500px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
                        {/* LEFT */}
                        <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 xl:px-20">
                            <div className="max-w-[650px]">
                                <Reveal direction="left">
                                    <div className="mb-7 flex flex-wrap items-center gap-3">
                                        {hero.badge1 && (
                                            <span className="bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#111827] shadow-sm">
                                                {hero.badge1}
                                            </span>
                                        )}

                                        {hero.badge1 && hero.badge2 && (
                                            <span className="text-sm" style={{ color: GOLD }}>
                                                •
                                            </span>
                                        )}

                                        {hero.badge2 && (
                                            <span className="bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#111827] shadow-sm">
                                                {hero.badge2}
                                            </span>
                                        )}
                                    </div>
                                </Reveal>

                                <Reveal direction="left" delay={100}>
                                    <h1 className="text-[46px] font-semibold leading-[1.04] tracking-[-2.5px] text-[#111827] sm:text-[58px] lg:text-[64px] xl:text-[72px]">
                                        {hero.title_line1 || 'Building with'}{' '}
                                        <span style={{ color: GOLD }}>
                                            {hero.title_highlight1 || 'experience.'}
                                        </span>
                                        <br />
                                        {hero.title_line2 || 'Delivering with'}{' '}
                                        <span style={{ color: GOLD }}>
                                            {hero.title_highlight2 || 'purpose.'}
                                        </span>
                                    </h1>
                                </Reveal>

                                <Reveal direction="left" delay={200}>
                                    <p className="mt-8 max-w-[570px] text-[16px] font-normal leading-7 text-[#52627A] sm:text-[17px]">
                                        {hero.description}
                                    </p>
                                </Reveal>

                                <Reveal direction="left" delay={300}>
                                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                        {hero.btn1_text && (
                                            <a
                                                href={hero.btn1_link || '#our-story'}
                                                className="group inline-flex items-center justify-center gap-3 rounded-md px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                style={{ backgroundColor: DARK }}
                                            >
                                                {hero.btn1_text}
                                                <ArrowRight
                                                    size={17}
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                            </a>
                                        )}

                                        {hero.btn2_text && (
                                            <a
                                                href={hero.btn2_link || '#why-saffpoll'}
                                                className="inline-flex items-center justify-center gap-3 rounded-md border border-[#182235] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#182235] transition-all duration-300 hover:border-[#CF974A] hover:text-[#CF974A]"
                                            >
                                                {hero.btn2_text}
                                            </a>
                                        )}
                                    </div>
                                </Reveal>

                                {/* Feature pills */}
                                {visiblePills.length > 0 && (
                                    <Reveal direction="up" delay={400}>
                                        <div className="mt-10 flex flex-wrap gap-3">
                                            {visiblePills.map((pill, idx) => (
                                                <div key={pill.id || idx} className="flex items-center gap-2 rounded-md bg-[#fff8ef] px-4 py-3">
                                                    {renderIcon(pill.icon, 17, GOLD)}
                                                    <span className="text-[12px] font-medium text-[#172033]">
                                                        {pill.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Reveal>
                                )}
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <Reveal direction="right" className="relative min-h-[460px] lg:min-h-full">
                            <div className="absolute inset-4 overflow-hidden rounded-[28px] lg:inset-y-10 lg:left-0 lg:right-10">
                                <img
                                    src={hero.hero_image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85'}
                                    alt="Saffpoll construction project"
                                    className="about-image h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/75 via-transparent to-transparent" />

                                {/* Experience card */}
                                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 sm:left-9 sm:right-9">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                            {hero.exp_card_label || 'Experience'}
                                        </p>
                                        <p className="mt-1 text-[34px] font-semibold tracking-[-1px] text-white">
                                            {hero.exp_card_value || '20+'}
                                        </p>
                                        <p className="text-[12px] font-medium text-white/75">
                                            {hero.exp_card_subtext || 'Years of Experience'}
                                        </p>
                                    </div>

                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-full"
                                        style={{ backgroundColor: GOLD }}
                                    >
                                        <ArrowDownRight size={24} color="white" />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}

            {/* =====================================================
          02 — OUR STORY / JOURNEY
      ====================================================== */}
            {story.enabled !== false && (
                <section id="our-story" className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                    <div className="mx-auto max-w-[1200px]">
                        <Reveal>
                            <div className="text-center">
                                <SectionLabel>{story.section_label || 'Our Story'}</SectionLabel>
                                <h2 className="text-[36px] font-semibold tracking-[-1.8px] text-[#111827] sm:text-[48px]">
                                    {story.section_title || 'Our Journey Since 1998'}
                                </h2>
                                <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-[#52627A]">
                                    {story.section_description}
                                </p>
                            </div>
                        </Reveal>

                        {/* Timeline */}
                        {visibleTimeline.length > 0 && (
                            <div className="relative mt-20">
                                <div
                                    className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 lg:block"
                                    style={{ backgroundColor: `${GOLD}55` }}
                                />

                                <div className="space-y-20 lg:space-y-28">
                                    {visibleTimeline.map((item, idx) => {
                                        const isEven = idx % 2 === 0;
                                        return (
                                            <div key={item.id || idx} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
                                                <Reveal direction={isEven ? "left" : "left"} className={!isEven ? "order-2 lg:order-1" : ""}>
                                                    {isEven ? (
                                                        <div className="about-image-wrap overflow-hidden rounded-[22px]">
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.title}
                                                                className="about-image h-[350px] w-full object-cover sm:h-[420px]"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="lg:pr-8 lg:text-right">
                                                            <span
                                                                className="inline-flex rounded-md bg-[#fff4e8] px-4 py-2 text-[11px] font-semibold"
                                                                style={{ color: GOLD }}
                                                            >
                                                                {item.year_tag || 'MILESTONE'}
                                                            </span>
                                                            <h3 className="mt-6 text-[28px] font-semibold tracking-[-1px] text-[#111827] sm:text-[34px]">
                                                                {item.title}
                                                            </h3>
                                                            <p className="mt-5 text-[15px] leading-7 text-[#52627A]">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </Reveal>

                                                <Reveal direction={isEven ? "right" : "right"} className={!isEven ? "order-1 lg:order-2" : ""}>
                                                    {isEven ? (
                                                        <div className="lg:pl-8">
                                                            <span
                                                                className="inline-flex rounded-md px-4 py-2 text-[11px] font-semibold text-white"
                                                                style={{ backgroundColor: GOLD }}
                                                            >
                                                                {item.year_tag || 'MILESTONE'}
                                                            </span>
                                                            <h3 className="mt-6 text-[28px] font-semibold tracking-[-1px] text-[#111827] sm:text-[34px]">
                                                                {item.title}
                                                            </h3>
                                                            <p className="mt-5 text-[15px] leading-7 text-[#52627A]">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="about-image-wrap overflow-hidden rounded-[22px]">
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.title}
                                                                className="about-image h-[350px] w-full object-cover sm:h-[420px]"
                                                            />
                                                        </div>
                                                    )}
                                                </Reveal>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* =====================================================
          03 — MISSION
      ====================================================== */}
            {mission.enabled !== false && (
                <section className="relative overflow-hidden">
                    <div className="relative min-h-[570px]">
                        <img
                            src={mission.bg_image || 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=2200&q=85'}
                            alt="Saffpoll construction site mission"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-[#111c2e]/95 via-[#111c2e]/80 to-[#CF974A]/75" />

                        <div className="relative mx-auto flex min-h-[570px] max-w-[1200px] items-center justify-center px-6 py-20 text-center">
                            <Reveal>
                                <div className="max-w-[1000px]">
                                    <p
                                        className="text-[12px] font-semibold uppercase tracking-[0.22em]"
                                        style={{ color: GOLD }}
                                    >
                                        {mission.tag || 'Our Mission'}
                                    </p>

                                    <h2 className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-[-2px] text-white sm:text-[54px] lg:text-[64px]">
                                        {(mission.title || '').split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i < (mission.title || '').split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </h2>

                                    <p className="mx-auto mt-7 max-w-[800px] text-[15px] font-normal leading-7 text-white/80 sm:text-[17px]">
                                        {mission.description}
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
          04 — PEOPLE / TEAM
      ====================================================== */}
            {people.enabled !== false && (
                <section className="bg-[#f7f8f9] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                    <div className="mx-auto max-w-[1200px]">
                        <Reveal>
                            <div className="text-center">
                                <SectionLabel>{people.section_label || 'Our People'}</SectionLabel>
                                <h2 className="text-[36px] font-semibold tracking-[-1.8px] text-[#111827] sm:text-[48px]">
                                    {people.section_title || 'The People Behind Saffpoll'}
                                </h2>
                                <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-7 text-[#52627A]">
                                    {people.section_description}
                                </p>
                            </div>
                        </Reveal>

                        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                            <Reveal direction="left">
                                <div className="about-image-wrap overflow-hidden rounded-[24px]">
                                    <img
                                        src={people.image_url || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=85'}
                                        alt="Construction professionals working together"
                                        className="about-image h-[420px] w-full object-cover sm:h-[500px]"
                                    />
                                </div>
                            </Reveal>

                            <Reveal direction="right">
                                <div>
                                    <h3 className="text-[32px] font-semibold tracking-[-1.2px] text-[#111827] sm:text-[40px]">
                                        {(people.highlight_title || '').split('\n').map((l, i) => (
                                            <React.Fragment key={i}>
                                                {l}
                                                {i < (people.highlight_title || '').split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </h3>

                                    <p className="mt-6 text-[15px] leading-7 text-[#52627A]">
                                        {people.highlight_description}
                                    </p>

                                    {visiblePeopleCards.length > 0 && (
                                        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {visiblePeopleCards.map((card, idx) => (
                                                <div key={card.id || idx} className="rounded-xl border border-[#e3e5e8] bg-white p-5">
                                                    {renderIcon(card.icon, 23, GOLD)}
                                                    <h4 className="mt-4 text-[16px] font-semibold text-[#111827]">
                                                        {card.title}
                                                    </h4>
                                                    <p className="mt-2 text-[13px] leading-6 text-[#64748b]">
                                                        {card.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
          05 — VALUES / QUALITY
      ====================================================== */}
            <section id="why-saffpoll" className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        <Reveal direction="left">
                            <div className="about-image-wrap overflow-hidden rounded-[24px]">
                                <img
                                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=85"
                                    alt="Construction team and site safety"
                                    className="about-image h-[500px] w-full object-cover"
                                />
                            </div>
                        </Reveal>

                        <Reveal direction="right">
                            <div>
                                <SectionLabel>What We Stand For</SectionLabel>
                                <h2 className="text-[36px] font-semibold leading-[1.08] tracking-[-1.7px] text-[#111827] sm:text-[48px]">
                                    Quality in every
                                    <br />
                                    stage of the work.
                                </h2>

                                <p className="mt-6 text-[15px] leading-7 text-[#52627A]">
                                    We are committed to high-quality workmanship, reliable materials, modern techniques and professional standards throughout every project.
                                </p>

                                <div className="mt-9 space-y-6">
                                    <Value
                                        icon={<ShieldCheck size={21} />}
                                        title="Quality Commitment"
                                        text="We focus on high-quality workmanship, suitable materials and modern construction techniques."
                                    />
                                    <Value
                                        icon={<Handshake size={21} />}
                                        title="Client Satisfaction"
                                        text="We work to understand the client's vision, deliver on time and stay aligned with expectations."
                                    />
                                    <Value
                                        icon={<Leaf size={21} />}
                                        title="Sustainable Practices"
                                        text="We embrace sustainable and eco-friendly materials and methods wherever practical."
                                    />
                                    <Value
                                        icon={<Award size={21} />}
                                        title="Proven Results"
                                        text="More than two decades of experience have shaped our approach to dependable project delivery."
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =====================================================
          06 — WHAT WE DO
      ====================================================== */}
            <section className="bg-[#f7f8f9] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-[1200px]">
                    <Reveal>
                        <div className="text-center">
                            <SectionLabel>Our Capabilities</SectionLabel>
                            <h2 className="text-[36px] font-semibold tracking-[-1.8px] text-[#111827] sm:text-[48px]">
                                Built Around Your Requirements
                            </h2>
                            <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-[#52627A]">
                                From new construction to renovation and extensions, our services are designed around different project needs.
                            </p>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Capability
                            delay={0}
                            icon={<Building2 size={25} />}
                            number="01"
                            title="Residential Construction"
                            text="Construction solutions designed around quality, practical execution and the needs of residential clients."
                        />
                        <Capability
                            delay={120}
                            icon={<HardHat size={25} />}
                            number="02"
                            title="Commercial Projects"
                            text="Professional construction support for commercial requirements with attention to standards, timelines and execution."
                        />
                        <Capability
                            delay={240}
                            icon={<Wrench size={25} />}
                            number="03"
                            title="Renovation & Extensions"
                            text="Thoughtful renovation and extension work that improves existing spaces while respecting the original structure."
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
          07 — HOW WE WORK
      ====================================================== */}
            <section className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-[1200px]">
                    <Reveal>
                        <div className="text-center">
                            <SectionLabel>Our Approach</SectionLabel>
                            <h2 className="text-[36px] font-semibold tracking-[-1.8px] text-[#111827] sm:text-[48px]">
                                How Saffpoll Works
                            </h2>
                            <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-7 text-[#52627A]">
                                A practical process that keeps the project organised from the first conversation through final delivery.
                            </p>
                        </div>
                    </Reveal>

                    <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <Process
                            number="01"
                            icon={<MessageSquare size={23} />}
                            title="Understand"
                            text="We begin by understanding your requirements, vision, scope and expectations."
                            delay={0}
                        />
                        <Process
                            number="02"
                            icon={<ClipboardCheck size={23} />}
                            title="Plan"
                            text="Our team works through the project requirements, planning and practical considerations."
                            delay={120}
                        />
                        <Process
                            number="03"
                            icon={<Wrench size={23} />}
                            title="Build"
                            text="We execute the work using skilled professionals, quality materials and modern techniques."
                            delay={240}
                        />
                        <Process
                            number="04"
                            icon={<Check size={23} />}
                            title="Deliver"
                            text="We complete quality checks and work toward a smooth and satisfactory handover."
                            delay={360}
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
          08 — WHY TRUST
      ====================================================== */}
            <section className="bg-[#f7f8f9] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="mx-auto max-w-[1200px]">
                    <Reveal>
                        <div className="text-center">
                            <SectionLabel>Why Saffpoll</SectionLabel>
                            <h2 className="text-[36px] font-semibold tracking-[-1.8px] text-[#111827] sm:text-[48px]">
                                Built on Experience & Trust
                            </h2>
                        </div>
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <TrustCard
                            icon={<Award size={25} />}
                            title="20+ Years Experience"
                            text="More than two decades of experience in construction and project delivery."
                            delay={0}
                        />
                        <TrustCard
                            icon={<ShieldCheck size={25} />}
                            title="Quality Focus"
                            text="A consistent commitment to workmanship, materials, equipment and construction standards."
                            delay={120}
                        />
                        <TrustCard
                            icon={<Handshake size={25} />}
                            title="Client Satisfaction"
                            text="We focus on understanding your vision, meeting expectations and building lasting relationships."
                            delay={240}
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
          09 — CTA
      ====================================================== */}
            <section className="relative overflow-hidden bg-[#1c1b1a]">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=2200&q=85)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <div className="absolute inset-0 bg-[#111827]/80" />

                <div className="relative mx-auto max-w-[1100px] px-6 py-20 text-center sm:px-8 lg:py-24">
                    <Reveal>
                        <p
                            className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                            style={{ color: GOLD }}
                        >
                            Let's Build Together
                        </p>

                        <h2 className="mx-auto mt-5 max-w-[850px] text-[38px] font-semibold leading-[1.08] tracking-[-1.7px] text-white sm:text-[50px]">
                            Have a project in mind?
                            <br />
                            Let's talk.
                        </h2>

                        <p className="mx-auto mt-6 max-w-[650px] text-[15px] leading-7 text-white/65">
                            Talk with the Saffpoll team about your residential, commercial, renovation or construction requirement.
                        </p>

                        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="tel:+919810464083"
                                className="inline-flex items-center justify-center gap-3 rounded-md px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                                style={{ backgroundColor: GOLD }}
                            >
                                Call +91 98104 64083
                            </a>

                            <a
                                href="mailto:firoz@saffpoll.com"
                                className="inline-flex items-center justify-center gap-3 rounded-md border border-white/35 px-7 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:border-[#CF974A] hover:text-[#CF974A]"
                            >
                                Send an Enquiry
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}

/* Helper Components */

function Value({ icon, title, text }) {
    return (
        <div className="flex gap-4">
            <div
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff4e8]"
                style={{ color: GOLD }}
            >
                {icon}
            </div>
            <div>
                <h4 className="text-[16px] font-semibold text-[#111827]">
                    {title}
                </h4>
                <p className="mt-1.5 text-[13px] leading-6 text-[#64748b]">
                    {text}
                </p>
            </div>
        </div>
    );
}

function Capability({ icon, number, title, text, delay }) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("about-visible");
                    observer.unobserve(element);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="about-reveal about-from-up group relative overflow-hidden rounded-2xl border border-[#e2e5e8] bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4e8]"
                    style={{ color: GOLD }}
                >
                    {icon}
                </div>
                <span className="text-[11px] font-semibold text-[#cbd0d6]">
                    {number}
                </span>
            </div>

            <h3 className="mt-7 text-[21px] font-semibold tracking-[-0.5px] text-[#111827]">
                {title}
            </h3>

            <p className="mt-3 text-[14px] leading-7 text-[#64748b]">
                {text}
            </p>

            <div
                className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: GOLD }}
            />
        </div>
    );
}

function Process({ number, icon, title, text, delay }) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("about-visible");
                    observer.unobserve(element);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="about-reveal about-from-up text-center"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div
                className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
                style={{ backgroundColor: GOLD }}
            >
                {icon}
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#111827] text-[9px] font-semibold text-white">
                    {number}
                </span>
            </div>

            <h3 className="mt-6 text-[18px] font-semibold text-[#111827]">
                {title}
            </h3>

            <p className="mx-auto mt-3 max-w-[250px] text-[13px] leading-6 text-[#64748b]">
                {text}
            </p>
        </div>
    );
}

function TrustCard({ icon, title, text, delay }) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add("about-visible");
                    observer.unobserve(element);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="about-reveal about-from-up overflow-hidden rounded-2xl border border-[#e0e3e7] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="p-7">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4e8]"
                    style={{ color: GOLD }}
                >
                    {icon}
                </div>

                <h3 className="mt-6 text-[20px] font-semibold text-[#111827]">
                    {title}
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#64748b]">
                    {text}
                </p>
            </div>

            <div
                className="h-[4px] w-full"
                style={{ backgroundColor: GOLD }}
            />
        </div>
    );
}
