import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/api.js";
import {
  Award,
  Clock3,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";

const GOLD = "#CF974A";

const iconMap = {
  Award,
  Clock3,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
};

const defaultCards = [
  {
    id: "card_exp",
    enabled: true,
    type: "experience",
    badge: "01",
    tag: "Experience",
    title: "Our Experience",
    description:
      "With over 20 years of experience in the building industry, Saffpoll has established itself as a reliable and trusted contractor. Our team has worked on a variety of projects, from residential renovations to large-scale commercial construction.",
    image_url:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "card_quality",
    enabled: true,
    type: "quality",
    icon: "ShieldCheck",
    tag: "Quality",
    title: "Our Commitment to Quality",
    description:
      "At Saffpoll, we are committed to delivering high-quality workmanship on every project. We use quality materials and equipment, and ensure our team stays up-to-date with the latest building techniques and industry standards.",
    image_url:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "card_team",
    enabled: true,
    type: "team_banner",
    tag: "A Team of Experts",
    title: "Skilled people working together to deliver exceptional results.",
    image_url:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "card_rel",
    enabled: true,
    type: "relationships",
    icon: "Handshake",
    tag: "Relationships",
    title: "Our Client Satisfaction",
    description:
      "Our clients' satisfaction is our top priority. We work closely with them to ensure that their vision is fully realized and that the project is completed on time and within budget. We strive to exceed their expectations and build long-lasting relationships.",
    pills: ["On time", "Within budget", "Long-term relationships"],
  },
  {
    id: "card_hero",
    enabled: true,
    type: "hero_feature",
    badge: "Saffpoll",
    tag: "Expert Building Contractor Services",
    title: "Building spaces with quality and purpose.",
    image_url:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
    pills: ["Residential", "Commercial", "Renovation"],
  },
  {
    id: "card_why_work",
    enabled: true,
    type: "why_work",
    icon: "Users",
    tag: "Why Work With Us",
    title: "Built around your needs.",
    description:
      "Personalized service tailored to your unique needs, experienced professionals dedicated to your success, and proven results that speak for themselves.",
  },
];

const defaultStats = [
  {
    id: "stat_exp",
    enabled: true,
    tag: "Experience",
    stat: "20+",
    unit: "Years",
    subtext: "Building since 1998",
  },
  {
    id: "stat_services",
    enabled: true,
    icon: "Award",
    stat: "3",
    unit: "Core Services",
    bullets: [
      "Residential Construction",
      "Commercial Projects",
      "Renovation & Extensions",
    ],
  },
];

const defaultBottomValues = [
  {
    id: "val_1",
    enabled: true,
    icon: "Award",
    title: "Personalized Service",
    description: "Service tailored to your unique needs.",
  },
  {
    id: "val_2",
    enabled: true,
    icon: "Users",
    title: "Experienced Professionals",
    description: "A dedicated team focused on your success.",
  },
  {
    id: "val_3",
    enabled: true,
    icon: "ShieldCheck",
    title: "Proven Results",
    description: "Results that speak for themselves.",
  },
  {
    id: "val_4",
    enabled: true,
    icon: "Leaf",
    title: "Sustainable Practices",
    description: "Eco-friendly materials and construction methods.",
  },
];

/* =========================================================
   SCROLL REVEAL
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
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let hiddenClass = "translate-y-10 opacity-0";
  if (direction === "left") hiddenClass = "-translate-x-10 opacity-0";
  if (direction === "right") hiddenClass = "translate-x-10 opacity-0";

  return (
    <div
      ref={ref}
      className={`
        transform
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${visible ? "translate-x-0 translate-y-0 opacity-100" : hiddenClass}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyChooseSaffpoll() {
  const [tag, setTag] = useState("Why Saffpoll");
  const [title, setTitle] = useState("Why Choose Saffpoll");
  const [description, setDescription] = useState(
    "Experience, quality, transparency and a commitment to delivering construction projects that create lasting value."
  );

  const [cards, setCards] = useState(defaultCards);
  const [stats, setStats] = useState(defaultStats);
  const [bottomValues, setBottomValues] = useState(defaultBottomValues);

  // Fetch API Data
  useEffect(() => {
    let isMounted = true;
    const fetchWhyChoose = async () => {
      try {
        const res = await apiFetch("/why-choose");
        if (!res.ok) throw new Error("Failed to fetch Why Choose API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const d = json.data;
          if (d.tag !== undefined) setTag(d.tag);
          if (d.title !== undefined) setTitle(d.title);
          if (d.description !== undefined) setDescription(d.description);
          if (Array.isArray(d.cards)) setCards(d.cards);
          if (Array.isArray(d.stats)) setStats(d.stats);
          if (Array.isArray(d.bottom_values)) setBottomValues(d.bottom_values);
        }
      } catch (err) {
        console.warn("WhyChoose API fetch error, using fallbacks:", err.message);
      }
    };

    fetchWhyChoose();
    return () => {
      isMounted = false;
    };
  }, []);

  const isItemEnabled = (val) =>
    val !== false && val !== 0 && val !== "false" && val !== "0" && val !== null;

  // Filter enabled items
  const activeCards = cards.filter((c) => isItemEnabled(c.enabled));
  const activeStats = stats.filter((s) => isItemEnabled(s.enabled));
  const activeBottomValues = bottomValues.filter((v) => isItemEnabled(v.enabled));

  // Distribute active cards into Left / Right columns
  const leftCards = activeCards.filter((c) =>
    ["experience", "quality", "team_banner", "relationships"].includes(c.type)
  );
  const rightCards = activeCards.filter((c) =>
    ["hero_feature", "why_work"].includes(c.type)
  );
  // Include any custom added cards into left list if not explicit right type
  const customCards = activeCards.filter(
    (c) =>
      ![
        "experience",
        "quality",
        "team_banner",
        "relationships",
        "hero_feature",
        "why_work",
      ].includes(c.type)
  );
  const finalLeftCards = [...leftCards, ...customCards];

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-20 sm:py-24 lg:py-28">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -right-[250px] top-[180px] h-[600px] w-[600px] rounded-full opacity-[0.05] blur-[100px]"
        style={{ backgroundColor: GOLD }}
      />
      <div
        className="pointer-events-none absolute -left-[250px] bottom-[100px] h-[500px] w-[500px] rounded-full opacity-[0.035] blur-[100px]"
        style={{ backgroundColor: GOLD }}
      />

      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            HEADER
        ====================================================== */}
        {(tag || title || description) && (
          <Reveal className="mb-14 text-center lg:mb-16">
            {tag && (
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 sm:w-16" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.28em] sm:text-[11px]"
                  style={{ color: GOLD }}
                >
                  {tag}
                </span>
                <span className="h-px w-10 sm:w-16" style={{ backgroundColor: GOLD }} />
              </div>
            )}

            {title && (
              <h2 className="font-['DM_Sans'] text-[42px] font-light leading-[1.05] tracking-[-2px] text-[#171717] sm:text-[52px] lg:text-[62px]">
                {title.includes("Saffpoll") ? (
                  <>
                    {title.substring(0, title.indexOf("Saffpoll"))}
                    <span style={{ color: GOLD }}>Saffpoll</span>
                    {title.substring(title.indexOf("Saffpoll") + 8)}
                  </>
                ) : (
                  title
                )}
              </h2>
            )}

            {description && (
              <p className="mx-auto mt-5 max-w-[650px] text-[14px] leading-7 text-gray-500 sm:text-[15px]">
                {description}
              </p>
            )}
          </Reveal>
        )}

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.92fr]">

          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {finalLeftCards.map((card, idx) => {
              const IconComp = iconMap[card.icon] || ShieldCheck;

              if (card.type === "team_banner") {
                return (
                  <Reveal key={card.id || idx} direction="left" delay={100 + idx * 80}>
                    <div className="group relative h-[280px] overflow-hidden rounded-2xl sm:h-[340px]">
                      {card.image_url && (
                        <img
                          src={card.image_url}
                          alt={card.title || "Team image"}
                          className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-7 left-7 right-7">
                        {card.tag && (
                          <p
                            className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em]"
                            style={{ color: GOLD }}
                          >
                            {card.tag}
                          </p>
                        )}
                        {card.title && (
                          <h3 className="max-w-[650px] text-[27px] font-light leading-tight tracking-[-0.8px] text-white sm:text-[34px]">
                            {card.title}
                          </h3>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={card.id || idx} direction="left" delay={100 + idx * 80}>
                  <article className="group relative overflow-hidden rounded-2xl border border-[#e7e4df] bg-white p-6 shadow-[0_8px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8">
                    <div className="flex gap-5">
                      {/* Badge / Icon */}
                      {card.badge ? (
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
                          style={{ backgroundColor: GOLD }}
                        >
                          {card.badge}
                        </div>
                      ) : (
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: GOLD }}
                        >
                          <IconComp size={20} strokeWidth={1.7} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-5">
                          <div>
                            {card.tag && (
                              <p
                                className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em]"
                                style={{ color: GOLD }}
                              >
                                {card.tag}
                              </p>
                            )}
                            {card.title && (
                              <h3 className="text-[23px] font-medium tracking-[-0.6px] text-[#171717] sm:text-[26px]">
                                {card.title}
                              </h3>
                            )}
                          </div>

                          {card.image_url && (
                            <img
                              src={card.image_url}
                              alt={card.title || "Card preview"}
                              className="h-[75px] w-[105px] shrink-0 rounded-lg object-cover transition duration-700 group-hover:scale-105 sm:h-[90px] sm:w-[125px]"
                            />
                          )}
                        </div>

                        {card.description && (
                          <p className="mt-5 max-w-[650px] text-[12px] leading-6 text-gray-500 sm:text-[13px]">
                            {card.description}
                          </p>
                        )}

                        {Array.isArray(card.pills) && card.pills.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {card.pills.map((pill, pIdx) => (
                              <span key={pIdx} className="flex items-center gap-2 text-[10px] font-medium text-gray-600">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                                {pill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: GOLD }}
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* Hero Feature Image Card */}
            {rightCards.map((card, idx) => {
              if (card.type === "hero_feature") {
                return (
                  <Reveal key={card.id || idx} direction="right" delay={120}>
                    <article className="group relative h-[430px] overflow-hidden rounded-2xl sm:h-[500px] lg:h-[515px]">
                      {card.image_url && (
                        <img
                          src={card.image_url}
                          alt={card.title || "Interior showcase"}
                          className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                      {card.badge && (
                        <div className="absolute left-7 top-7">
                          <span className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                            {card.badge}
                          </span>
                        </div>
                      )}

                      <div
                        className="absolute right-7 top-7 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ backgroundColor: GOLD }}
                      >
                        <ArrowUpRight size={19} />
                      </div>

                      <div className="absolute bottom-8 left-7 right-7">
                        {card.tag && (
                          <p
                            className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em]"
                            style={{ color: GOLD }}
                          >
                            {card.tag}
                          </p>
                        )}
                        {card.title && (
                          <h3 className="max-w-[650px] text-[31px] font-light leading-[1.08] tracking-[-1px] text-white sm:text-[40px]">
                            {card.title}
                          </h3>
                        )}
                        {Array.isArray(card.pills) && card.pills.length > 0 && (
                          <div className="mt-5 flex items-center gap-2 text-[10px] text-white/75">
                            {card.pills.map((pill, pIdx) => (
                              <React.Fragment key={pIdx}>
                                {pIdx > 0 && <span>•</span>}
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                                {pill}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              }

              const IconComp = iconMap[card.icon] || Users;
              return (
                <Reveal key={card.id || idx} direction="right" delay={380}>
                  <article className="group overflow-hidden rounded-2xl border border-[#e7e4df] bg-white p-7 shadow-[0_8px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8">
                    <div className="flex gap-5">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
                      >
                        <IconComp size={21} strokeWidth={1.6} />
                      </div>

                      <div>
                        {card.tag && (
                          <p
                            className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em]"
                            style={{ color: GOLD }}
                          >
                            {card.tag}
                          </p>
                        )}
                        {card.title && (
                          <h3 className="text-[24px] font-medium tracking-[-0.7px] text-[#171717]">
                            {card.title}
                          </h3>
                        )}
                        {card.description && (
                          <p className="mt-3 max-w-[600px] text-[12px] leading-6 text-gray-500 sm:text-[13px]">
                            {card.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            {/* STAT CARDS (YEARS & CORE SERVICES) */}
            {activeStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {activeStats.map((stat, sIdx) => {
                  const StatIcon = iconMap[stat.icon] || Award;
                  if (stat.subtext !== undefined) {
                    return (
                      <Reveal key={stat.id || sIdx} direction="right" delay={220}>
                        <div
                          className="relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl p-7 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-9"
                          style={{ backgroundColor: GOLD }}
                        >
                          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/20" />
                          <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/20" />
                          {stat.tag && (
                            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                              {stat.tag}
                            </p>
                          )}
                          {stat.stat && (
                            <div className="text-[65px] font-light leading-none tracking-[-3px] sm:text-[75px]">
                              {stat.stat}
                            </div>
                          )}
                          {stat.unit && (
                            <div className="mt-2 text-[27px] font-light tracking-[-1px] sm:text-[31px]">
                              {stat.unit}
                            </div>
                          )}
                          {stat.subtext && (
                            <div className="mt-4 text-[10px] text-white/70">{stat.subtext}</div>
                          )}
                        </div>
                      </Reveal>
                    );
                  }

                  return (
                    <Reveal key={stat.id || sIdx} direction="right" delay={300}>
                      <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-[#242321] p-7 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-9">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full"
                          style={{ backgroundColor: "rgba(207,151,74,0.15)", color: GOLD }}
                        >
                          <StatIcon size={21} strokeWidth={1.6} />
                        </div>
                        <div>
                          {stat.stat && (
                            <div className="text-[45px] font-light leading-none tracking-[-2px]">
                              {stat.stat}
                            </div>
                          )}
                          {stat.unit && (
                            <div className="mt-2 text-[20px] font-light leading-tight text-white/90">
                              {stat.unit}
                            </div>
                          )}
                          {Array.isArray(stat.bullets) && stat.bullets.length > 0 && (
                            <div className="mt-4 space-y-1 text-[9px] leading-5 text-white/50">
                              {stat.bullets.map((b, bIdx) => (
                                <p key={bIdx}>{b}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            BOTTOM VALUES (4 GRID)
        ====================================================== */}
        {activeBottomValues.length > 0 && (
          <Reveal delay={450}>
            <div className="mt-10 border-t border-[#dedbd5] pt-9 lg:mt-12 lg:pt-10">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {activeBottomValues.map((val, vIdx) => {
                  const ValIcon = iconMap[val.icon] || Award;
                  return (
                    <div
                      key={val.id || vIdx}
                      className={`group flex gap-4 ${
                        vIdx > 0
                          ? "border-t border-[#e4e1dc] pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
                          : ""
                      }`}
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${GOLD}15`, color: GOLD }}
                      >
                        <ValIcon size={18} strokeWidth={1.6} />
                      </div>

                      <div>
                        {val.title && (
                          <h4 className="text-[13px] font-medium text-[#171717]">
                            {val.title}
                          </h4>
                        )}
                        {val.description && (
                          <p className="mt-1 text-[11px] leading-5 text-gray-500">
                            {val.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
