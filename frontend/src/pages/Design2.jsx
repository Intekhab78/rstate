import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { apiFetch } from "../utils/api.js";
import defaultProjectData from "./projectData.jsx";
import SEO from "../components/SEO.jsx";
import { buildProjectSEO } from "../utils/seoHelpers.js";
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Building2,
    MapPin,
    Maximize2,
    X,
    Ruler,
    CalendarDays,
    CheckCircle2,
    Layers3,
} from "lucide-react";

// Helper to safely render dynamic Lucide icons from string name or component reference
const IconByName = ({ name, icon, ...props }) => {
    const target = icon || name;
    if (!target) return <Check {...props} />;
    if (typeof target === "function" || (typeof target === "object" && target.$$typeof)) {
        const IconComponent = target;
        return <IconComponent {...props} />;
    }
    const Icon = LucideIcons[target];
    return Icon ? <Icon {...props} /> : <Check {...props} />;
};

/* =========================================================
   REUSABLE SECTION TITLE
========================================================= */

function SectionTitle({
    number,
    eyebrow,
    title,
    description,
    dark = false,
}) {
    return (
        <div className="grid gap-5 md:grid-cols-[100px_1fr] md:gap-10">
            <div>
                <span
                    className={`text-xs font-semibold tracking-[0.2em] ${
                        dark ? "text-[#CF974A]" : "text-slate-400"
                    }`}
                >
                    {number} / 10
                </span>

                <div className="mt-4 h-px w-12 bg-[#CF974A]" />
            </div>

            <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                    {eyebrow}
                </p>

                <h2
                    className={`mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl ${
                        dark ? "text-white" : "text-[#111B2B]"
                    }`}
                >
                    {title}
                </h2>

                {description && (
                    <p
                        className={`mt-5 max-w-2xl text-base leading-8 ${
                            dark ? "text-white/55" : "text-slate-500"
                        }`}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

/* =========================================================
   DESIGN 2 — EDITORIAL LUXURY RESIDENCES LAYOUT
========================================================= */

export default function Design2({ project: propProject }) {
    const { slug } = useParams();
    const [fetchedProject, setFetchedProject] = useState(null);
    const [loading, setLoading] = useState(!propProject);

    // If no project is passed via props (e.g. accessed directly via /design2), fetch it
    useEffect(() => {
        if (propProject) return;

        const loadProject = async () => {
            const targetSlug = slug || "saffpoll-residences";
            try {
                const res = await apiFetch(`/projects/slug/${targetSlug}`);
                const data = await res.json();

                if (data.success && data.data) {
                    const base = data.data;
                    let details = {};
                    if (base.details_json) {
                        try {
                            details = JSON.parse(base.details_json);
                        } catch (e) {}
                    }

                    setFetchedProject({
                        ...defaultProjectData,
                        name: base.title !== undefined && base.title !== "" ? base.title : (defaultProjectData.name || ""),
                        title: base.title !== undefined && base.title !== "" ? base.title : (defaultProjectData.name || ""),
                        category: base.category !== undefined && base.category !== "" ? base.category : (defaultProjectData.category || ""),
                        location: base.location !== undefined && base.location !== "" ? base.location : (defaultProjectData.location || ""),
                        status: base.status !== undefined && base.status !== "" ? base.status : (defaultProjectData.status || "Under Construction"),
                        heroImage: base.image_url || details.heroImage || defaultProjectData.heroImage || "",
                        overview: base.description || details.overview || defaultProjectData.overview || "",
                        startingPrice: details.startingPrice || defaultProjectData.startingPrice || "₹XX Lakh",
                        stats: details.stats && details.stats.length > 0 ? details.stats : defaultProjectData.stats,
                        features: details.features && details.features.length > 0 ? details.features : defaultProjectData.features,
                        units: details.units && details.units.length > 0 ? details.units : defaultProjectData.units,
                        floorPlans: details.floorPlans || defaultProjectData.floorPlans,
                        specifications: details.specifications && details.specifications.length > 0 ? details.specifications : defaultProjectData.specifications,
                        gallery: details.gallery && details.gallery.length > 0 ? details.gallery : defaultProjectData.gallery,
                        construction: details.construction || defaultProjectData.construction,
                        locationDetails: details.locationDetails || defaultProjectData.locationDetails,
                        seo: base.seo || details.seo || {},
                        toggles: details.toggles || {}
                    });
                } else {
                    setFetchedProject(defaultProjectData);
                }
            } catch (err) {
                setFetchedProject(defaultProjectData);
            }
            setLoading(false);
        };

        loadProject();
    }, [propProject, slug]);

    const activeProject = propProject || fetchedProject || defaultProjectData;

    // Normalize Dynamic Fields
    const title = activeProject.name || activeProject.title || defaultProjectData.name || "SaffPoll Residences";
    const category = activeProject.category || defaultProjectData.category || "Premium Residential Development";
    const location = activeProject.location || defaultProjectData.location || "New Delhi, India";
    const status = activeProject.status || defaultProjectData.status || "Under Construction";
    const price = activeProject.price || activeProject.startingPrice || defaultProjectData.startingPrice || "₹XX Lakh";
    const heroImage = activeProject.heroImage || activeProject.image_url || defaultProjectData.heroImage;
    const overview = activeProject.overview || activeProject.description || defaultProjectData.overview;
    const stats = activeProject.stats && activeProject.stats.length > 0 ? activeProject.stats : defaultProjectData.stats;
    const features = activeProject.features && activeProject.features.length > 0 ? activeProject.features : defaultProjectData.features;
    const units = activeProject.units && activeProject.units.length > 0 ? activeProject.units : defaultProjectData.units;

    // Normalize Floor Plans
    let normalizedFloorPlans = {};
    const rawPlans = activeProject.floorPlans || defaultProjectData.floorPlans || {};
    if (Array.isArray(rawPlans)) {
        rawPlans.forEach((fp) => {
            if (fp.type || fp.name) {
                normalizedFloorPlans[fp.type || fp.name] = fp.image || fp.image_url || "";
            }
        });
    } else if (typeof rawPlans === "object" && rawPlans !== null) {
        normalizedFloorPlans = { ...rawPlans };
    }
    const planKeys = Object.keys(normalizedFloorPlans);

    // Normalize Specifications
    const rawSpecs = activeProject.specifications && activeProject.specifications.length > 0
        ? activeProject.specifications
        : (defaultProjectData.specifications || []);
    const specifications = rawSpecs.map((s) => {
        if (Array.isArray(s)) return { label: s[0], value: s[1] };
        return { label: s.label || s.key || "", value: s.value || "" };
    });

    // Normalize Gallery
    const rawGallery = activeProject.gallery && activeProject.gallery.length > 0
        ? activeProject.gallery
        : (defaultProjectData.gallery || []);
    const gallery = rawGallery.map((g, idx) => {
        if (typeof g === "string") return { image: g, title: `Gallery Photo ${idx + 1}` };
        return { image: g.image || g.image_url || "", title: g.title || `Gallery Photo ${idx + 1}` };
    });

    // Normalize Construction
    const construction = activeProject.construction || defaultProjectData.construction || {};
    const progress = construction.progress !== undefined ? construction.progress : 68;
    const started = construction.started || "Month Year";
    const completion = construction.completion || construction.expectedCompletion || "Month Year";
    const stages = (activeProject.stages && activeProject.stages.length > 0)
        ? activeProject.stages
        : (construction.stages || [
            { name: "Concept & Planning", status: "Completed" },
            { name: "Design & Engineering", status: "Completed" },
            { name: "Structural Work", status: "In Progress" },
            { name: "Interior & Finishing", status: "Upcoming" },
            { name: "Quality & Handover", status: "Upcoming" },
        ]);

    // Normalize Location Highlights
    const locationHighlights = (activeProject.locationHighlights && activeProject.locationHighlights.length > 0)
        ? activeProject.locationHighlights
        : (activeProject.locationDetails?.highlights && activeProject.locationDetails.highlights.length > 0)
            ? activeProject.locationDetails.highlights
            : [
                "Road Connectivity",
                "Public Transport",
                "Education & Healthcare",
                "Retail & Commercial Areas",
                "Everyday Conveniences",
            ];

    // Toggles
    const toggles = activeProject.toggles || {};
    const showHero = toggles.showHero !== false;
    const showStats = toggles.showStats !== false;
    const showOverview = toggles.showOverview !== false;
    const showFeatures = toggles.showFeatures !== false && toggles.showAmenities !== false;
    const showUnits = toggles.showUnits !== false;
    const showFloorPlans = toggles.showFloorPlans !== false;
    const showSpecifications = toggles.showSpecifications !== false;
    const showGallery = toggles.showGallery !== false;
    const showConstruction = toggles.showConstruction !== false;
    const showLocation = toggles.showLocation !== false;

    // Component Local State
    const [activeUnit, setActiveUnit] = useState(0);
    const [activePlan, setActivePlan] = useState(planKeys[0] || "2 BHK");
    const [activeGallery, setActiveGallery] = useState(null);
    const [showFloorPlan, setShowFloorPlan] = useState(false);

    useEffect(() => {
        if (planKeys.length > 0 && !planKeys.includes(activePlan)) {
            setActivePlan(planKeys[0]);
        }
    }, [activeProject]);

    const closeGallery = () => setActiveGallery(null);

    const changeGallery = (direction) => {
        if (!gallery || gallery.length === 0) return;
        setActiveGallery((current) => {
            return (current + direction + gallery.length) % gallery.length;
        });
    };

    // Editorial Split Title
    const titleWords = title.split(" ");
    const firstPart = titleWords.length > 1 ? titleWords.slice(0, -1).join(" ") : title;
    const lastPart = titleWords.length > 1 ? titleWords[titleWords.length - 1] : "";

    const currentPlanImage = normalizedFloorPlans[activePlan] || Object.values(normalizedFloorPlans)[0] || heroImage;
    const seoProps = buildProjectSEO(activeProject, slug);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111B2B] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#CF974A] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-semibold tracking-wider uppercase text-slate-300">Loading project...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="overflow-hidden bg-white font-sans text-[#111B2B]">
            {seoProps && <SEO {...seoProps} />}

            {/* =====================================================
                01 — HERO
            ====================================================== */}
            {showHero && (
                <section className="relative bg-[#111B2B] text-white">
                    <div className="mx-auto max-w-[1600px]">

                        {/* Top bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10 lg:px-16">
                            <Link
                                to="/project"
                                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/65 transition hover:text-[#CF974A]"
                            >
                                <ChevronLeft size={16} />
                                All Projects
                            </Link>

                            <div className="flex items-center gap-3 text-xs text-white/60">
                                <MapPin size={15} className="text-[#CF974A]" />
                                {location}
                            </div>
                        </div>

                        {/* Hero layout */}
                        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                            <div className="flex flex-col justify-between px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="h-px w-9 bg-[#CF974A]" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                            {category}
                                        </p>
                                    </div>

                                    <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl xl:text-[84px]">
                                        {firstPart}
                                        {lastPart && (
                                            <span className="mt-3 block font-normal text-white/60">
                                                {lastPart}
                                            </span>
                                        )}
                                    </h1>

                                    {overview && (
                                        <p className="mt-8 max-w-lg text-base leading-8 text-white/55">
                                            {overview}
                                        </p>
                                    )}

                                    <div className="mt-9 inline-flex items-center gap-3 border border-white/15 px-4 py-3">
                                        <span className="h-2 w-2 rounded-full bg-[#CF974A]" />
                                        <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                                            {status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-14 border-t border-white/15 pt-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                        Starting Price
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
                                        <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                            {price}
                                        </p>

                                        <a
                                            href="#enquire"
                                            className="inline-flex items-center gap-3 bg-[#CF974A] px-5 py-4 text-sm font-bold text-[#111B2B] transition hover:bg-white"
                                        >
                                            Enquire Now
                                            <ArrowUpRight size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative min-h-[420px] lg:min-h-[700px]">
                                <img
                                    src={heroImage}
                                    alt={title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#111B2B]/65 via-transparent to-transparent" />

                                <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:bottom-12 sm:left-10 sm:right-10">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                                            Project Overview
                                        </p>

                                        <p className="mt-2 text-lg font-semibold text-white">
                                            From Concept to Completion
                                        </p>
                                    </div>

                                    <a
                                        href="#overview"
                                        aria-label="Explore project"
                                        className="flex h-12 w-12 items-center justify-center border border-white/60 text-white transition hover:bg-[#CF974A] hover:text-[#111B2B]"
                                    >
                                        <ArrowDownRight size={22} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                02 — STATISTICS
            ====================================================== */}
            {showStats && stats.length > 0 && (
                <section className="border-b border-slate-200 bg-[#F7F6F2]">
                    <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label || index}
                                className={`border-slate-200 px-6 py-8 sm:px-10 sm:py-10 lg:px-12 ${
                                    index % 2 === 0 ? "bg-white" : "bg-[#F7F6F2]"
                                } ${index < 2 ? "border-b lg:border-b-0" : ""} ${
                                    index % 4 !== 3 ? "lg:border-r" : ""
                                }`}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                    {stat.label}
                                </p>

                                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =====================================================
                03 — OVERVIEW
            ====================================================== */}
            {showOverview && (
                <section
                    id="overview"
                    className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
                >
                    <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
                        <div>
                            <SectionTitle
                                number="01"
                                eyebrow="The Vision"
                                title="Good design begins with understanding."
                                description={overview}
                            />

                            <div className="mt-10 grid gap-6 border-t border-slate-200 pt-7 sm:grid-cols-2">
                                <div>
                                    <Building2 className="text-[#CF974A]" size={24} />

                                    <h3 className="mt-5 font-semibold">Thoughtful Planning</h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        Spaces designed around functional requirements, structural integrity and everyday convenience.
                                    </p>
                                </div>

                                <div>
                                    <Layers3 className="text-[#CF974A]" size={24} />

                                    <h3 className="mt-5 font-semibold">Quality Execution</h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        A coordinated approach to engineering, construction milestones and precision project delivery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative pb-12 pl-5 sm:pl-10">
                            <img
                                src={heroImage}
                                alt="Contemporary architectural design"
                                className="aspect-[4/5] w-full object-cover"
                            />

                            <div className="absolute bottom-0 left-0 max-w-[280px] bg-[#CF974A] p-6 sm:p-8">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111B2B]/60">
                                    {title}
                                </p>

                                <p className="mt-3 text-xl font-semibold text-[#111B2B]">
                                    Engineering meets thoughtful design.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                04 — AMENITIES / FEATURES
            ====================================================== */}
            {showFeatures && features.length > 0 && (
                <section className="bg-[#111B2B] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1280px]">
                        <SectionTitle
                            number="02"
                            eyebrow="Building Features & Amenities"
                            title="Designed for life beyond the front door."
                            description="Explore the amenities and shared spaces envisioned for comfort, recreation and community."
                            dark
                        />

                        <div className="mt-16 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-5">
                            {features.map((feature, index) => (
                                <article
                                    key={feature.title || index}
                                    className="group border-b border-r border-white/15 p-6 transition hover:bg-white/[0.04] sm:p-7"
                                >
                                    <div className="flex items-start justify-between">
                                        <IconByName
                                            icon={feature.icon}
                                            name={feature.icon}
                                            size={27}
                                            strokeWidth={1.5}
                                            className="text-[#CF974A] transition-transform group-hover:-translate-y-1"
                                        />

                                        <span className="text-[10px] text-white/30">
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </span>
                                    </div>

                                    <h3 className="mt-9 text-base font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-white/50">
                                        {feature.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                05 — FLAT CONFIGURATIONS / UNITS
            ====================================================== */}
            {showUnits && units.length > 0 && (
                <section className="bg-[#F7F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1280px]">
                        <SectionTitle
                            number="03"
                            eyebrow="Flat Layout & Configuration"
                            title="A place that feels like your own."
                            description="Explore the different configurations and their illustrative areas and starting prices."
                        />

                        <div className="mt-14 grid gap-6 lg:grid-cols-3">
                            {units.map((unit, index) => (
                                <button
                                    type="button"
                                    key={unit.type || index}
                                    onClick={() => {
                                        setActiveUnit(index);
                                        if (unit.type && normalizedFloorPlans[unit.type]) {
                                            setActivePlan(unit.type);
                                        }
                                    }}
                                    className={`group overflow-hidden bg-white text-left transition ${
                                        activeUnit === index
                                            ? "ring-1 ring-[#CF974A] shadow-xl"
                                            : "ring-1 ring-slate-200 hover:ring-[#CF974A]/60"
                                    }`}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={unit.image || heroImage}
                                            alt={`${title} - ${unit.name || unit.type} residential layout`}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

                                        <div className="absolute bottom-6 left-6">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CF974A]">
                                                {unit.name || unit.type}
                                            </p>

                                            <h3 className="mt-2 text-3xl font-semibold text-white">
                                                {unit.type}
                                            </h3>
                                        </div>

                                        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/50 text-white transition group-hover:bg-[#CF974A] group-hover:text-[#111B2B]">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        <p className="text-sm leading-7 text-slate-500">
                                            {unit.description || "Thoughtfully arranged spaces for comfortable modern living."}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                                                    Approx. area
                                                </p>

                                                <p className="mt-2 font-semibold">{unit.area || "Area upon request"}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                                                    Starting price
                                                </p>

                                                <p className="mt-2 font-semibold text-[#A8732E]">
                                                    {unit.price || price}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-semibold">
                                            <span>Explore layout</span>

                                            <ArrowRight
                                                size={18}
                                                className="text-[#CF974A] transition group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                06 — FLOOR PLANS
            ====================================================== */}
            {showFloorPlans && (planKeys.length > 0 || units.length > 0) && (
                <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
                        <div>
                            <SectionTitle
                                number="04"
                                eyebrow="Floor Plans"
                                title="Every detail has its place."
                                description="Explore the available configurations and their illustrative layouts."
                            />

                            <div className="mt-8 flex flex-wrap border-b border-slate-200">
                                {(planKeys.length > 0 ? planKeys : units.map(u => u.type)).map((planName) => (
                                    <button
                                        key={planName}
                                        type="button"
                                        onClick={() => setActivePlan(planName)}
                                        className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
                                            activePlan === planName
                                                ? "border-[#CF974A] text-[#111B2B]"
                                                : "border-transparent text-slate-400 hover:text-[#111B2B]"
                                        }`}
                                    >
                                        {planName}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div>
                                    <Ruler size={20} className="text-[#CF974A]" />

                                    <p className="mt-3 text-xs text-slate-400">
                                        Indicative area
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {units.find((u) => u.type === activePlan)?.area || "Area upon request"}
                                    </p>
                                </div>

                                <div>
                                    <Building2 size={20} className="text-[#CF974A]" />

                                    <p className="mt-3 text-xs text-slate-400">
                                        Configuration
                                    </p>

                                    <p className="mt-1 font-semibold">{activePlan}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFloorPlan(true)}
                                className="mt-9 inline-flex items-center gap-3 bg-[#111B2B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#CF974A] hover:text-[#111B2B]"
                            >
                                Enlarge Layout
                                <Maximize2 size={17} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFloorPlan(true)}
                            className="group relative bg-[#F7F6F2] p-5 sm:p-10 text-left cursor-pointer"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-white">
                                <img
                                    src={currentPlanImage}
                                    alt={`${title} - ${activePlan} floor plan layout`}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                />
                            </div>

                            <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-[#CF974A] px-4 py-3 text-xs font-bold text-[#111B2B]">
                                <Maximize2 size={15} />
                                EXPAND VIEW
                            </div>
                        </button>
                    </div>
                </section>
            )}

            {/* =====================================================
                07 — SPECIFICATIONS
            ====================================================== */}
            {showSpecifications && specifications.length > 0 && (
                <section className="bg-[#F7F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1280px]">
                        <SectionTitle
                            number="05"
                            eyebrow="Project Specifications"
                            title="The details that define the development."
                            description="Project specifications and construction standards planned for the project."
                        />

                        <div className="mt-14 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                            {specifications.map((spec, idx) => (
                                <div
                                    key={spec.label || idx}
                                    className="border-b border-r border-slate-200 bg-white p-6 sm:p-7"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
                                        {spec.label}
                                    </p>

                                    <p className="mt-4 text-sm font-semibold leading-6 text-[#111B2B]">
                                        {spec.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                08 — PROJECT GALLERY
            ====================================================== */}
            {showGallery && gallery.length > 0 && (
                <section className="bg-[#111B2B] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto max-w-[1280px]">
                        <SectionTitle
                            number="06"
                            eyebrow="Project Gallery"
                            title="A visual study of spaces and details."
                            description="Explore architectural, structural and interior reference imagery for the project."
                            dark
                        />

                        <div className="mt-14 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[280px] md:grid-cols-12">
                            {gallery.map((item, index) => (
                                <button
                                    type="button"
                                    key={item.title || index}
                                    onClick={() => setActiveGallery(index)}
                                    className={`group relative overflow-hidden text-left ${
                                        index === 0
                                            ? "md:col-span-7 md:row-span-2"
                                            : index === 3
                                                ? "md:col-span-7"
                                                : "md:col-span-5"
                                    }`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`${title} - ${item.title || 'Architectural Gallery'}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CF974A]">
                                                {index < 9 ? `0${index + 1}` : index + 1}
                                            </p>

                                            <h3 className="mt-2 text-lg font-semibold">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 transition group-hover:bg-[#CF974A] group-hover:text-[#111B2B]">
                                            <Maximize2 size={17} />
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                09 — CONSTRUCTION PROGRESS
            ====================================================== */}
            {showConstruction && (
                <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <SectionTitle
                                number="07"
                                eyebrow="Construction Progress"
                                title="From planning to handover."
                                description="A visual overview of the key milestones in the development journey."
                            />

                            <div className="mt-10 flex items-center gap-5">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[5px] border-[#CF974A] text-xl font-semibold">
                                    {progress}%
                                </div>

                                <div>
                                    <p className="font-semibold">Current Progress</p>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Verified project schedule and progress update.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 h-1.5 bg-slate-100">
                                <div
                                    className="h-full bg-[#CF974A]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="mt-9 space-y-4 border-t border-slate-200 pt-6 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-500">Construction Started</span>
                                    <span className="font-semibold">{started}</span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-500">Expected Completion</span>
                                    <span className="font-semibold">{completion}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-200">
                            {stages.map((stage, index) => {
                                const stageName = stage.name || stage.title || `Stage ${index + 1}`;
                                const isCompleted = stage.status === "Completed";
                                const isInProgress = stage.status === "In Progress";

                                return (
                                    <div
                                        key={stageName || index}
                                        className="flex items-center gap-4 border-b border-slate-200 py-7 sm:gap-7"
                                    >
                                        <span className="text-sm text-slate-300">
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </span>

                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center ${
                                                isCompleted
                                                    ? "bg-[#F5EBDD] text-[#A8732E]"
                                                    : isInProgress
                                                        ? "bg-[#111B2B] text-[#CF974A]"
                                                        : "bg-slate-100 text-slate-400"
                                            }`}
                                        >
                                            {isCompleted ? (
                                                <Check size={17} />
                                            ) : isInProgress ? (
                                                <Clock3 size={17} />
                                            ) : (
                                                <CalendarDays size={17} />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold">{stageName}</p>
                                        </div>

                                        <span
                                            className={`text-right text-[9px] font-bold uppercase tracking-[0.12em] sm:text-[10px] ${
                                                isCompleted
                                                    ? "text-[#A8732E]"
                                                    : isInProgress
                                                        ? "text-[#111B2B]"
                                                        : "text-slate-400"
                                            }`}
                                        >
                                            {stage.status || "Upcoming"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                10 — LOCATION
            ====================================================== */}
            {showLocation && (
                <section className="bg-[#F7F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                    <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <SectionTitle
                                number="08"
                                eyebrow="Location"
                                title="Connected to the everyday."
                                description="Location plays an important role in how residents experience their homes and the city around them."
                            />

                            <div className="mt-8 flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-[#CF974A]">
                                    <MapPin size={21} />
                                </div>

                                <div>
                                    <p className="font-semibold">{location}</p>

                                    <p className="mt-2 text-sm leading-7 text-slate-500">
                                        Convenient access to major transport corridors, commercial hubs and daily conveniences.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4 border-t border-slate-200 pt-7">
                                {locationHighlights.map((item, idx) => (
                                    <div
                                        key={item || idx}
                                        className="flex items-center gap-3 text-sm text-slate-600"
                                    >
                                        <CheckCircle2
                                            size={17}
                                            className="shrink-0 text-[#CF974A]"
                                        />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative min-h-[380px] overflow-hidden sm:min-h-[480px]">
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1400&q=85"
                                alt="Illustrative city location"
                                className="absolute inset-0 h-full w-full object-cover grayscale"
                            />

                            <div className="absolute inset-0 bg-[#111B2B]/35" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white px-8 py-7 text-center shadow-xl">
                                    <MapPin size={27} className="mx-auto text-[#CF974A]" />

                                    <p className="mt-4 font-semibold text-[#111B2B]">
                                        {location}
                                    </p>

                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                        {title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                11 — PROJECT JOURNEY
            ====================================================== */}
            <section className="border-y border-slate-200 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                <div className="mx-auto max-w-[1280px]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                        The Development Process
                    </p>

                    <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                        From concept to completion.
                    </h2>

                    <div className="mt-12 grid grid-cols-2 border-l border-t border-slate-200 sm:grid-cols-3 lg:grid-cols-6">
                        {[
                            "IDEA",
                            "DESIGN",
                            "ENGINEERING",
                            "EXECUTION",
                            "QUALITY",
                            "HANDOVER",
                        ].map((stage, index) => (
                            <div
                                key={stage}
                                className="border-b border-r border-slate-200 p-5 sm:p-7"
                            >
                                <span className="text-xs font-bold text-[#CF974A]">
                                    0{index + 1}
                                </span>

                                <p className="mt-9 text-base font-semibold sm:mt-12">
                                    {stage}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                12 — FINAL CTA
            ====================================================== */}
            <section
                id="enquire"
                className="relative overflow-hidden bg-[#CF974A] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
            >
                <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-white/15 sm:h-[500px] sm:w-[500px] sm:border-[70px]" />

                <div className="relative mx-auto flex max-w-[1280px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#111B2B]/60">
                            Let's Build Something Together
                        </p>

                        <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111B2B] sm:text-6xl lg:text-7xl">
                            Interested in {title}?
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-8 text-[#111B2B]/75">
                            Let's discuss your requirements and explore the next steps together.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/contactUs"
                            className="inline-flex items-center justify-center gap-3 bg-[#111B2B] px-7 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-[#111B2B]"
                        >
                            Enquire About Project
                            <ArrowUpRight size={18} />
                        </Link>

                        <Link
                            to="/contactUs"
                            className="inline-flex items-center justify-center gap-3 border border-[#111B2B]/35 px-7 py-4 text-sm font-semibold text-[#111B2B] transition hover:bg-white/30"
                        >
                            Start a Project
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                GALLERY LIGHTBOX
            ====================================================== */}
            {activeGallery !== null && gallery[activeGallery] && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080D16]/95 p-4 sm:p-8"
                    onClick={closeGallery}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project gallery"
                >
                    <button
                        type="button"
                        onClick={closeGallery}
                        aria-label="Close gallery"
                        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition hover:bg-[#CF974A] hover:text-[#111B2B]"
                    >
                        <X size={22} />
                    </button>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            changeGallery(-1);
                        }}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white hover:bg-[#CF974A] hover:text-[#111B2B] sm:left-8"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div
                        className="w-full max-w-6xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={gallery[activeGallery].image}
                            alt={gallery[activeGallery].title}
                            className="mx-auto max-h-[75vh] max-w-full object-contain"
                        />

                        <div className="mt-5 flex items-center justify-between text-white">
                            <p className="font-semibold">
                                {gallery[activeGallery].title}
                            </p>

                            <p className="text-sm text-white/50">
                                {activeGallery + 1} / {gallery.length}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            changeGallery(1);
                        }}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white hover:bg-[#CF974A] hover:text-[#111B2B] sm:right-8"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            )}

            {/* =====================================================
                FLOOR PLAN MODAL
            ====================================================== */}
            {showFloorPlan && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-[#080D16]/95 p-5"
                    onClick={() => setShowFloorPlan(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Floor plan preview"
                >
                    <button
                        type="button"
                        onClick={() => setShowFloorPlan(false)}
                        aria-label="Close floor plan"
                        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center border border-white/20 text-white hover:bg-[#CF974A] hover:text-[#111B2B]"
                    >
                        <X size={22} />
                    </button>

                    <div
                        className="w-full max-w-5xl bg-white p-3 sm:p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={currentPlanImage}
                            alt={`${activePlan} illustrative layout`}
                            className="max-h-[72vh] w-full object-contain"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-2 pt-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CF974A]">
                                    Selected Configuration
                                </p>

                                <p className="mt-2 text-xl font-semibold text-[#111B2B]">
                                    {activePlan}
                                </p>
                            </div>

                            <p className="text-sm text-slate-500">
                                {units.find((u) => u.type === activePlan)?.area || "Area upon request"}
                                {" · "}
                                {units.find((u) => u.type === activePlan)?.price || price}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}