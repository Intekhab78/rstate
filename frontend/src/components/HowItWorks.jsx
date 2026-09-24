import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ClipboardList,
  Wrench,
  CircleCheck,
  HardHat,
  Building2,
  Ruler,
  Shield,
  Layers,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

const GOLD = "#CF974A";

const iconMap = {
  Search,
  ClipboardList,
  Wrench,
  CircleCheck,
  HardHat,
  Building2,
  Ruler,
  Shield,
  Layers,
  CheckCircle2
};

const fallbackSteps = [
  {
    number: "01",
    title: "Land Assessment",
    icon: "Search",
    description:
      "We conduct a detailed land assessment including location analysis, soil testing, survey, access roads, zoning regulations, and feasibility studies to ensure the project's success.",
    points: [
      "Land survey & measurements",
      "Soil and terrain study",
      "Legal and zoning review",
      "Market feasibility",
    ],
  },
  {
    number: "02",
    title: "Planning & Design",
    icon: "ClipboardList",
    description:
      "Our expert planning team designs approved layouts that include well-planned plots, internal roads, drainage systems, open spaces, amenities, and future expansion considerations.",
    points: [
      "Plot division & layout design",
      "Road width & network planning",
      "Parks, open areas & amenities",
      "Government layout approvals",
    ],
  },
  {
    number: "03",
    title: "Construction & Infrastructure",
    icon: "Wrench",
    description:
      "We execute complete civil and infrastructure works using quality materials, skilled manpower, and modern equipment to create durable and value-driven developments.",
    points: [
      "Earthwork & leveling",
      "BT / CC roads",
      "Underground drainage & stormwater",
      "Water pipelines & overhead tanks",
      "Electrical lines & street lighting",
      "Compound walls & entrance gates",
    ],
  },
  {
    number: "04",
    title: "Final Handover",
    icon: "CircleCheck",
    description:
      "After completing all infrastructure works, we ensure quality checks, final approvals, and smooth handover of the developed venture to landowners or clients.",
    points: [
      "Final inspections & quality checks",
      "Approval coordination",
      "Plot marking & documentation",
      "Project handover",
    ],
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic API State
  const [title, setTitle] = useState("How Saffpoll Works");
  const [subtitle, setSubtitle] = useState(
    "From initial assessment to final handover, here's exactly how we plan, develop, and deliver every project."
  );
  const [bottomText, setBottomText] = useState(
    "We understand land development, follow approvals, deliver quality roads & infrastructure, and remain reliable throughout the process."
  );
  const [bottomSubtext, setBottomSubtext] = useState(
    "We're with you at every step, ensuring transparency and quality."
  );
  const [stepsList, setStepsList] = useState(fallbackSteps);

  // Fetch data from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchHowItWorks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/how-it-works");
        if (!res.ok) throw new Error("Failed to fetch How It Works API");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const d = json.data;
          if (d.title !== undefined) setTitle(d.title);
          if (d.subtitle !== undefined) setSubtitle(d.subtitle);
          if (d.bottom_text !== undefined) setBottomText(d.bottom_text);
          if (d.bottom_subtext !== undefined) setBottomSubtext(d.bottom_subtext);
          if (Array.isArray(d.steps)) setStepsList(d.steps);
        }
      } catch (err) {
        console.warn("HowItWorks API fetch error, using fallbacks:", err.message);
      }
    };

    fetchHowItWorks();
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
        threshold: 0.12,
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
      id="how-it-works"
      className="w-full overflow-hidden bg-white"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:py-24 lg:px-10 xl:py-28">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div
          className={`
            mx-auto
            max-w-[900px]
            text-center
            transform
            transition-all
            duration-1000
            ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-12 opacity-0"
            }
          `}
        >
          <h2
            className="
              text-4xl
              leading-tight
              tracking-[-1.8px]
              text-[#171717]
              sm:text-5xl
              md:text-[52px]
            "
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="
                mx-auto
                mt-5
                max-w-[850px]
                text-base
                leading-7
                text-[#596579]
                sm:text-lg
              "
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* =====================================================
            STEPS
        ===================================================== */}

        <div className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:mt-20 lg:gap-8">

          {stepsList.map((step, index) => {
            const IconComponent =
              typeof step.icon === "string"
                ? iconMap[step.icon] || HelpCircle
                : step.icon || HelpCircle;

            /*
              Even cards come from LEFT.
              Odd cards come from RIGHT.
            */
            const animationClass =
              index % 2 === 0
                ? "md:-translate-x-20"
                : "md:translate-x-20";

            return (
              <article
                key={(step.number || "") + index}
                className={`
                  group
                  relative
                  min-h-[440px]
                  overflow-hidden
                  rounded-[18px]
                  border
                  border-gray-100
                  bg-white
                  p-7
                  shadow-[0_12px_35px_rgba(20,30,45,0.08)]
                  transition-all
                  duration-1000
                  ease-out

                  hover:-translate-y-2
                  hover:shadow-[0_20px_45px_rgba(20,30,45,0.12)]

                  ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : `${animationClass} opacity-0`
                  }
                `}
                style={{
                  transitionDelay: isVisible
                    ? `${200 + index * 180}ms`
                    : "0ms",
                }}
              >

                {/* =================================================
                    SUBTLE TOP RIGHT BACKGROUND
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    h-[130px]
                    w-[130px]
                    rounded-bl-[100%]
                    opacity-[0.04]
                    transition-all
                    duration-500
                    group-hover:scale-125
                  "
                  style={{
                    backgroundColor: GOLD,
                  }}
                />

                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="relative flex items-start gap-5">

                  {/* ICON BOX */}

                  <div
                    className="
                      flex
                      h-[80px]
                      w-[80px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-[18px]
                      shadow-[0_6px_14px_rgba(0,0,0,0.12)]
                      transition-all
                      duration-500
                      group-hover:-translate-y-1
                      group-hover:scale-105
                    "
                    style={{
                      backgroundColor: GOLD,
                    }}
                  >
                    <IconComponent
                      size={40}
                      strokeWidth={1.8}
                      color="white"
                    />
                  </div>

                  {/* STEP + TITLE */}

                  <div className="pt-1">

                    {step.number && (
                      <span
                        className="
                          inline-flex
                          rounded-full
                          px-4
                          py-1.5
                          text-[13px]
                          font-semibold
                        "
                        style={{
                          color: GOLD,
                          backgroundColor: "#FCF4E8",
                        }}
                      >
                        STEP {step.number}
                      </span>
                    )}

                    <h3
                      className="
                        mt-3
                        text-[25px]
                        leading-tight
                        tracking-[-0.8px]
                        text-[#171717]
                        sm:text-[27px]
                      "
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                {step.description && (
                  <p
                    className="
                      relative
                      mt-10
                      text-[16px]
                      leading-[1.65]
                      text-[#596579]
                      sm:text-[17px]
                    "
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                    }}
                  >
                    {step.description}
                  </p>
                )}

                {/* =================================================
                    BULLET POINTS
                ================================================= */}

                {Array.isArray(step.points) && step.points.length > 0 && (
                  <ul className="relative mt-7 space-y-4">

                    {step.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="
                          flex
                          items-start
                          gap-3
                          text-[15px]
                          leading-6
                          text-[#26364D]
                          sm:text-[16px]
                        "
                      >
                        {/* Gold bullet */}

                        <span
                          className="
                            mt-[9px]
                            h-[7px]
                            w-[7px]
                            shrink-0
                            rounded-full
                          "
                          style={{
                            backgroundColor: GOLD,
                          }}
                        />

                        <span>{point}</span>
                      </li>
                    ))}

                  </ul>
                )}

                {/* =================================================
                    GOLD BOTTOM LINE
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    w-0
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                  style={{
                    backgroundColor: GOLD,
                  }}
                />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        {(bottomText || bottomSubtext) && (
          <div
            className={`
              mx-auto
              mt-16
              max-w-[1050px]
              text-center
              transform
              transition-all
              duration-1000
              ease-out
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
            style={{
              transitionDelay: isVisible ? "1000ms" : "0ms",
            }}
          >
            {bottomText && (
              <p
                className="
                  text-lg
                  leading-8
                  text-[#171717]
                  sm:text-xl
                "
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                }}
              >
                {bottomText}
              </p>
            )}

            {bottomSubtext && (
              <p
                className="
                  mt-2
                  text-base
                  text-[#697586]
                  sm:text-lg
                "
              >
                {bottomSubtext}
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default HowItWorks;