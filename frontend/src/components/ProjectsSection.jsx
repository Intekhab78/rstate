import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const GOLD = "#CF974A";

const fallbackProjects = [
  {
    id: "fb-1",
    title: "Road Development",
    category: "Infrastructure",
    image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "fb-2",
    title: "Residential Development",
    category: "Residential",
    image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "fb-3",
    title: "Heavy Infrastructure",
    category: "Civil Works",
    image_url: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "fb-4",
    title: "Structural Construction",
    category: "Construction",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "fb-5",
    title: "Project Development",
    category: "Infrastructure",
    image_url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=90",
  },
  {
    id: "fb-6",
    title: "Commercial Construction",
    category: "Commercial",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=90",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API Projects
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects from backend");
        }
        const data = await response.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setProjectsList(data.data);
          } else {
            // Fallback to static items if DB has no records yet
            setProjectsList(fallbackProjects);
          }
          setError(null);
        }
      } catch (err) {
        console.warn("API fetch error in ProjectsSection, using fallback data:", err.message);
        if (isMounted) {
          setError(err.message);
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

  // Intersection Observer for Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
      id="projects"
      className="relative w-full overflow-hidden bg-[#211F1E] text-white"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#171615]/75" />

      {/* Gold ambient glow */}
      <div
        className="pointer-events-none absolute right-[-15%] top-[-10%] h-[650px] w-[650px] rounded-full blur-[150px]"
        style={{
          backgroundColor: GOLD,
          opacity: 0.13,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:py-24 lg:px-10 xl:py-28">
        {/* HEADER */}
        <div
          className={`
            transform
            transition-all
            duration-[1000ms]
            ease-out
            ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            }
          `}
        >
          {/* Label */}
          <p
            className="mb-3 text-sm font-medium sm:text-base"
            style={{ color: GOLD }}
          >
            Our Diverse Portfolio
          </p>

          {/* Heading */}
          <h2
            className="
              text-4xl
              leading-[0.95]
              tracking-[-2px]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[62px]
              xl:text-[68px]
            "
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
            }}
          >
            EXPLORE RECENT WORK
          </h2>
        </div>

        {/* PROJECT GRID */}
        {loading ? (
          <div className="mt-14 text-center py-12 text-[#CF974A] text-sm animate-pulse">
            Loading latest projects from API...
          </div>
        ) : (
          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-5
              sm:mt-16
              sm:grid-cols-2
              lg:grid-cols-3
              lg:gap-7
            "
          >
            {projectsList.map((project, index) => {
              const projectImg =
                project.image_url ||
                project.image ||
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=90";

              return (
                <article
                  key={project.id || project.title || index}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[15px]
                    bg-[#302D2B]
                    transform
                    transition-all
                    duration-1000
                    ease-out
                    ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay: visible
                      ? `${250 + index * 130}ms`
                      : "0ms",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[1.55/1] overflow-hidden">
                    <img
                      src={projectImg}
                      alt={project.title}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[900ms]
                        ease-out
                        group-hover:scale-110
                      "
                    />

                    {/* Image darkening */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/5
                        transition-all
                        duration-500
                        group-hover:bg-black/25
                      "
                    />

                    {/* Gold hover gradient */}
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                      style={{
                        background: `linear-gradient(
                          180deg,
                          transparent 45%,
                          ${GOLD}55 100%
                        )`,
                      }}
                    />

                    {/* Category */}
                    <div
                      className="
                        absolute
                        left-5
                        top-5
                        rounded-full
                        bg-black/45
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-white
                        backdrop-blur-sm
                      "
                    >
                      {project.category || "Project"}
                    </div>

                    {/* Hover arrow */}
                    <div
                      className="
                        absolute
                        bottom-5
                        right-5
                        flex
                        h-11
                        w-11
                        translate-y-4
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                      style={{
                        color: GOLD,
                      }}
                    >
                      <ArrowRight size={19} />
                    </div>
                  </div>

                  {/* Project title */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-[#292624]
                      px-5
                      py-4
                    "
                  >
                    <h3
                      className="text-[16px] text-white sm:text-[17px]"
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {project.title}
                    </h3>

                    <span
                      className="
                        h-[6px]
                        w-[6px]
                        rounded-full
                      "
                      style={{
                        backgroundColor: GOLD,
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* BUTTON */}
        <div
          className={`
            mt-10
            transform
            transition-all
            duration-1000
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
          style={{
            transitionDelay: visible ? "1200ms" : "0ms",
          }}
        >
          <a
            href="/project"
            className="
              group
              inline-flex
              items-center
              gap-4
              rounded-lg
              px-7
              py-4
              text-[15px]
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
            style={{
              backgroundColor: GOLD,
            }}
          >
            View All Projects
            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </div>
      </div>

      {/* BOTTOM DECORATIVE IMAGE */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[170px]
          w-full
          opacity-20
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=2200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />
    </section>
  );
};

export default ProjectsSection;