import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { apiFetch } from "../utils/api.js";
import defaultProjectData from "./projectData.jsx";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    ExternalLink,
    MapPin,
    Phone,
    Play,
    X,
} from "lucide-react";

// Helper to render dynamic icons by string name or direct icon component
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

function ProjectDetail() {
    const { slug } = useParams();
    const currentSlug = slug || "saffpoll-residences";
    const [project, setProject] = useState(defaultProjectData);
    const [loading, setLoading] = useState(true);

    const [selectedUnit, setSelectedUnit] = useState(defaultProjectData.units?.[0] || null);
    const [activePlan, setActivePlan] = useState("2 BHK");
    const [selectedImage, setSelectedImage] = useState(null);
    const [showFloorPlan, setShowFloorPlan] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await apiFetch(`/projects/slug/${currentSlug}`);
                const data = await res.json();
                
                if (data.success && data.data) {
                    const baseProject = data.data;
                    let details = {};
                    if (baseProject.details_json) {
                        try {
                            details = JSON.parse(baseProject.details_json);
                        } catch(e) {}
                    }
                    
                    // Normalize floorPlans
                    let normalizedFloorPlans = details.floorPlans || defaultProjectData.floorPlans;
                    if (Array.isArray(normalizedFloorPlans)) {
                        const fpObj = {};
                        normalizedFloorPlans.forEach(fp => {
                            fpObj[fp.type || fp.name] = fp.image || fp.image_url;
                        });
                        normalizedFloorPlans = fpObj;
                    }

                    // Normalize gallery
                    let normalizedGallery = details.gallery || defaultProjectData.gallery;
                    if (Array.isArray(normalizedGallery)) {
                        normalizedGallery = normalizedGallery.map((g, idx) => {
                            if (typeof g === "string") return { image: g, title: `Gallery ${idx + 1}` };
                            return { image: g.image || g.image_url, title: g.title || `Gallery ${idx + 1}` };
                        });
                    }

                    const mergedProject = {
                        ...defaultProjectData,
                        name: baseProject.title !== undefined ? baseProject.title : (defaultProjectData.name || ""),
                        category: baseProject.category !== undefined ? baseProject.category : (defaultProjectData.category || ""),
                        location: baseProject.location !== undefined ? baseProject.location : (defaultProjectData.location || ""),
                        status: baseProject.status !== undefined ? baseProject.status : (defaultProjectData.status || ""),
                        heroImage: baseProject.image_url !== undefined ? baseProject.image_url : (details.heroImage || defaultProjectData.heroImage || ""),
                        overview: baseProject.description !== undefined ? baseProject.description : (details.overview || defaultProjectData.overview || ""),
                        startingPrice: details.startingPrice !== undefined ? details.startingPrice : (defaultProjectData.startingPrice || ""),
                        stats: details.stats !== undefined ? details.stats : (defaultProjectData.stats || []),
                        features: details.features !== undefined ? details.features : (defaultProjectData.features || []),
                        units: details.units !== undefined ? details.units : (defaultProjectData.units || []),
                        floorPlans: normalizedFloorPlans,
                        specifications: details.specifications !== undefined ? details.specifications : (defaultProjectData.specifications || []),
                        gallery: normalizedGallery,
                        construction: details.construction !== undefined ? details.construction : defaultProjectData.construction,
                        locationDetails: details.locationDetails !== undefined ? details.locationDetails : defaultProjectData.locationDetails,
                        toggles: {
                            showHero: true,
                            showOverview: true,
                            showStats: true,
                            showFeatures: true,
                            showAmenities: true,
                            showFloorPlans: true,
                            showUnits: true,
                            showSpecifications: true,
                            showConstruction: true,
                            showLocation: true,
                            showGallery: true,
                            showFaq: true,
                            ...(details.toggles || {})
                        }
                    };
                    
                    setProject(mergedProject);
                    
                    if (mergedProject.units && mergedProject.units.length > 0) {
                        setSelectedUnit(mergedProject.units[0]);
                    }
                    if (mergedProject.floorPlans && Object.keys(mergedProject.floorPlans).length > 0) {
                        setActivePlan(Object.keys(mergedProject.floorPlans)[0]);
                    }
                } else if (currentSlug === "saffpoll-residences") {
                    setProject(defaultProjectData);
                    setSelectedUnit(defaultProjectData.units[0]);
                    setActivePlan(Object.keys(defaultProjectData.floorPlans)[0]);
                } else {
                    setProject(null);
                }
            } catch (err) {
                console.warn("Using fallback project data", err);
                if (currentSlug === "saffpoll-residences") {
                    setProject(defaultProjectData);
                    setSelectedUnit(defaultProjectData.units[0]);
                    setActivePlan(Object.keys(defaultProjectData.floorPlans)[0]);
                } else {
                    setProject(null);
                }
            }
            setLoading(false);
        };
        fetchProject();
    }, [currentSlug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#07101f] text-white flex items-center justify-center">
                <div className="text-[#CF974A] text-xl font-semibold tracking-widest animate-pulse">
                    LOADING PROJECT...
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="min-h-screen bg-[#07101f] text-white">
                <section className="flex min-h-[75vh] items-center justify-center px-6">
                    <div className="max-w-xl text-center">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#CF974A]">
                            Project Not Found
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                            This project is currently unavailable.
                        </h1>

                        <p className="mt-6 text-base leading-7 text-slate-400">
                            The project you're looking for may have been moved or is not
                            available at the moment.
                        </p>

                        <Link
                            to="/project"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#CF974A] px-6 py-3 font-semibold text-[#07101f] transition hover:bg-[#dfaa65]"
                        >
                            <ArrowLeft size={18} />
                            View All Projects
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    return (
        <main className="bg-white text-[#0b1424]">
            {/* =====================================================
          HERO / BASIC DETAILS
      ====================================================== */}
            {project.toggles.showHero !== false && project.toggles.showBasicDetails !== false ? (
                <section className="relative min-h-[80vh] md:min-h-[85vh] overflow-hidden bg-[#07101f]">
                    <img
                        src={project.heroImage}
                        alt={project.name || "Project Hero"}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/95 via-[#07101f]/75 to-[#07101f]/25" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07101f] via-transparent to-transparent" />

                    <div className="relative mx-auto flex min-h-[80vh] md:min-h-[85vh] max-w-7xl items-end px-6 pb-16 pt-32 md:px-10 lg:px-12 lg:pb-20">
                        <div className="max-w-4xl text-white">
                            <Link
                                to="/project"
                                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-[#CF974A]"
                            >
                                <ArrowLeft size={16} />
                                Back to Projects
                            </Link>

                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                {project.category && (
                                    <span className="border border-[#CF974A]/60 bg-[#CF974A]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#E0A85F] backdrop-blur-md">
                                        {project.category}
                                    </span>
                                )}

                                {project.location && (
                                    <span className="flex items-center gap-2 border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                                        <MapPin size={14} />
                                        {project.location}
                                    </span>
                                )}
                            </div>

                            {project.name && (
                                <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[88px]">
                                    {project.name}
                                </h1>
                            )}

                            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                {project.startingPrice && (
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.18em] text-white/55">
                                            Starting From
                                        </p>

                                        <p className="mt-1 text-3xl font-bold text-[#CF974A] md:text-4xl">
                                            {project.startingPrice}
                                        </p>
                                    </div>
                                )}

                                {project.status && (
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.18em] text-white/55">
                                            Project Status
                                        </p>

                                        <div className="mt-2 flex items-center gap-2 text-base font-semibold">
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#CF974A]" />
                                            {project.status}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                {project.toggles.showOverview !== false && (
                                    <a
                                        href="#overview"
                                        className="inline-flex items-center gap-2 bg-[#CF974A] px-6 py-3.5 text-sm font-bold text-[#07101f] transition hover:bg-[#e0a85f]"
                                    >
                                        Explore Project
                                        <ArrowRight size={18} />
                                    </a>
                                )}

                                <a
                                    href="#enquire"
                                    className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#CF974A] hover:text-[#CF974A]"
                                >
                                    Enquire Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="bg-[#07101f] border-b border-slate-800 px-6 py-6 text-white md:px-10 lg:px-12">
                    <div className="mx-auto max-w-7xl flex items-center justify-between">
                        <Link
                            to="/project"
                            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-[#CF974A]"
                        >
                            <ArrowLeft size={16} />
                            Back to Projects
                        </Link>
                        <h1 className="text-lg font-bold text-white tracking-wide">
                            {project.name}
                        </h1>
                    </div>
                </div>
            )}

            {/* =====================================================
          STATS
      ====================================================== */}
            {project.toggles.showStats !== false && project.stats && project.stats.length > 0 && (
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
                        {project.stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className={`px-6 py-8 md:px-8 md:py-10 ${index !== project.stats.length - 1
                                    ? "border-r border-slate-200"
                                    : ""
                                    }`}
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                    {stat.label}
                                </p>

                                <p className="mt-3 text-xl font-bold tracking-tight text-[#0b1424] md:text-2xl">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =====================================================
          OVERVIEW
      ====================================================== */}
            {project.toggles.showOverview !== false && (
                <section
                    id="overview"
                    className="bg-[#f6f5f1] px-6 py-20 md:px-10 md:py-28 lg:px-12"
                >
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Project Overview
                            </p>

                            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                                Designed around people. Built around quality.
                            </h2>

                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                                {project.overview}
                            </p>

                            <div className="mt-8 h-px w-20 bg-[#CF974A]" />

                            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-500">
                                From planning and engineering to execution and quality control,
                                every stage is approached with a focus on dependable execution
                                and long-term value.
                            </p>
                        </div>

                        {project.gallery && project.gallery.length > 1 && (
                            <div className="relative">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={project.gallery[1]?.image || project.gallery[0]?.image}
                                        alt="Project Gallery"
                                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="absolute -bottom-6 -left-6 hidden bg-[#07101f] p-6 text-white shadow-2xl md:block">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#CF974A]">
                                        SaffPoll
                                    </p>
                                    <p className="mt-2 text-lg font-bold">
                                        Engineering | Construction | Consulting
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* =====================================================
          FEATURES
      ====================================================== */}
            {project.toggles.showFeatures !== false && project.features && project.features.length > 0 && (
                <section className="bg-[#07101f] px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Building Features
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                                Spaces designed for everyday living.
                            </h2>

                            <p className="mt-5 leading-7 text-slate-400">
                                Thoughtfully planned amenities designed to bring comfort,
                                convenience and community into the project.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
                            {project.features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="group bg-[#0b1628] p-7 transition hover:bg-[#111f34]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center border border-[#CF974A]/40 text-[#CF974A] transition group-hover:bg-[#CF974A] group-hover:text-[#07101f]">
                                        <IconByName name={feature.icon} size={20} strokeWidth={1.7} />
                                    </div>

                                    <h3 className="mt-7 text-lg font-bold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
          UNIT CONFIGURATION
      ====================================================== */}
            {project.toggles.showUnits !== false && project.units && project.units.length > 0 && (
            <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Flat Layout
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                                Choose your configuration.
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-slate-500">
                            Explore available configurations, approximate areas and
                            starting-price placeholders.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {project.units.map((unit) => {
                            const isSelected = selectedUnit.type === unit.type;

                            return (
                                <button
                                    type="button"
                                    key={unit.type}
                                    onClick={() => setSelectedUnit(unit)}
                                    className={`group overflow-hidden border text-left transition ${isSelected
                                        ? "border-[#CF974A] shadow-[0_20px_60px_rgba(11,20,36,0.12)]"
                                        : "border-slate-200 hover:border-[#CF974A]/50"
                                        }`}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={unit.image}
                                            alt={unit.type}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                        <div className="absolute bottom-5 left-5">
                                            <p className="text-2xl font-bold text-white">
                                                {unit.type}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">
                                                Approx. area
                                            </span>

                                            <span className="font-bold text-[#0b1424]">
                                                {unit.area}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <span className="text-sm text-slate-500">
                                                Starting from
                                            </span>

                                            <span className="font-bold text-[#CF974A]">
                                                {unit.price}
                                            </span>
                                        </div>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0b1424]">
                                            View Layout
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>
            )}

            {/* =====================================================
          FLOOR PLAN
      ====================================================== */}
            {project.toggles.showFloorPlans !== false && project.floorPlans && Object.keys(project.floorPlans).length > 0 && (
                <section className="bg-[#f6f5f1] px-6 py-20 md:px-10 md:py-28 lg:px-12">
                    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Floor Plans
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                                A layout for the way you live.
                            </h2>

                            <p className="mt-6 leading-7 text-slate-600">
                                Explore the available configuration layouts and understand how
                                each space has been planned.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {Object.keys(project.floorPlans).map((plan) => (
                                    <button
                                        type="button"
                                        key={plan}
                                        onClick={() => setActivePlan(plan)}
                                        className={`px-5 py-3 text-sm font-bold transition ${activePlan === plan
                                            ? "bg-[#0b1424] text-white"
                                            : "bg-white text-slate-600 hover:bg-[#CF974A] hover:text-[#0b1424]"
                                            }`}
                                    >
                                        {plan}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFloorPlan(true)}
                                className="mt-8 inline-flex items-center gap-2 border-b border-[#CF974A] pb-2 text-sm font-bold text-[#0b1424]"
                            >
                                Open Full Layout
                                <ExternalLink size={16} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowFloorPlan(true)}
                            className="group relative overflow-hidden bg-white p-3 shadow-xl"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                <img
                                    src={project.floorPlans[activePlan]}
                                    alt={`${activePlan} floor plan`}
                                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                />
                            </div>

                            <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-[#07101f] px-5 py-3 text-sm font-bold text-white">
                                <Play size={15} fill="currentColor" />
                                View {activePlan} Layout
                            </div>
                        </button>
                    </div>
                </section>
            )}

            {/* =====================================================
          SPECIFICATIONS
      ====================================================== */}
            {project.toggles.showSpecifications !== false && project.specifications && project.specifications.length > 0 && (
            <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                            Specifications
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                            Built with clarity and purpose.
                        </h2>
                    </div>

                    <div className="mt-12 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                        {project.specifications.map((item) => (
                            <div
                                key={item.label}
                                className="border-b border-r border-slate-200 p-6 md:p-8"
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                    {item.label}
                                </p>

                                <p className="mt-3 font-bold leading-6 text-[#0b1424]">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* =====================================================
          GALLERY
      ====================================================== */}
            {project.toggles.showGallery !== false && project.gallery && project.gallery.length > 0 && (
            <section className="bg-[#07101f] px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Project Gallery
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                                See the vision take shape.
                            </h2>
                        </div>

                        <p className="max-w-md text-sm leading-6 text-slate-400">
                            A visual collection of architecture, interiors and project
                            details.
                        </p>
                    </div>

                    <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
                        {project.gallery.map((item, index) => (
                            <button
                                type="button"
                                key={item.image}
                                onClick={() => openImage(item)}
                                className={`group relative overflow-hidden text-left ${index === 0 || index === 3
                                    ? "col-span-2 row-span-2"
                                    : "col-span-1 row-span-1"
                                    }`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-5 left-5">
                                    <p className="text-sm font-bold text-white">
                                        {item.title}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* =====================================================
          CONSTRUCTION PROGRESS
      ====================================================== */}
            {project.toggles.showConstruction !== false && project.construction && (
            <section className="bg-[#f6f5f1] px-6 py-20 md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                                Project Progress
                            </p>

                            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                                From ground breaking to handover.
                            </h2>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#CF974A] text-xl font-bold text-[#0b1424]">
                                    {project.construction.progress}%
                                </div>

                                <div>
                                    <p className="font-bold text-[#0b1424]">
                                        Construction Progress
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Current project stage
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 space-y-3 text-sm">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <span className="text-slate-500">Construction Started</span>
                                    <span className="font-bold">{project.construction.started}</span>
                                </div>

                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                    <span className="text-slate-500">Expected Completion</span>
                                    <span className="font-bold">
                                        {project.construction.expectedCompletion}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            {project.construction.stages && project.construction.stages.map((stage, index) => {
                                const completed = stage.status === "Completed";
                                const inProgress = stage.status === "In Progress";

                                return (
                                    <div
                                        key={stage.title}
                                        className="relative flex gap-5 pb-9 last:pb-0"
                                    >
                                        {index !== project.construction.stages.length - 1 && (
                                            <div className="absolute left-[17px] top-9 h-full w-px bg-slate-300" />
                                        )}

                                        <div
                                            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${completed
                                                ? "border-[#CF974A] bg-[#CF974A] text-[#07101f]"
                                                : inProgress
                                                    ? "border-[#CF974A] bg-white text-[#CF974A]"
                                                    : "border-slate-300 bg-white text-slate-400"
                                                }`}
                                        >
                                            {completed ? (
                                                <Check size={16} strokeWidth={3} />
                                            ) : inProgress ? (
                                                <Clock3 size={15} />
                                            ) : (
                                                <span className="h-2 w-2 rounded-full bg-current" />
                                            )}
                                        </div>

                                        <div className="pt-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-bold text-[#0b1424]">
                                                    {stage.title}
                                                </h3>

                                                <span
                                                    className={`text-xs font-bold uppercase tracking-wider ${completed
                                                        ? "text-[#CF974A]"
                                                        : inProgress
                                                            ? "text-blue-600"
                                                            : "text-slate-400"
                                                        }`}
                                                >
                                                    {stage.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            )}

            {/* =====================================================
          PROJECT JOURNEY
      ====================================================== */}
            <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                            The SaffPoll Journey
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#0b1424] md:text-5xl">
                            From concept to completion.
                        </h2>
                    </div>

                    <div className="mt-14 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-6">
                        {[
                            "IDEA",
                            "DESIGN",
                            "ENGINEERING",
                            "EXECUTION",
                            "QUALITY",
                            "HANDOVER",
                        ].map((item, index) => (
                            <div
                                key={item}
                                className="border-b border-r border-slate-200 p-6 md:p-7"
                            >
                                <p className="text-xs font-bold text-[#CF974A]">
                                    0{index + 1}
                                </p>

                                <p className="mt-12 text-lg font-bold text-[#0b1424]">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          LOCATION
      ====================================================== */}
            {project.toggles.showLocation !== false && project.locationDetails && (
            <section className="bg-[#0b1424] px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
                <div className="mx-auto max-w-7xl gap-12 lg:grid-cols-2 lg:items-center grid">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#CF974A]">
                            Location
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                            {project.locationDetails.title}
                        </h2>

                        <p className="mt-6 max-w-xl leading-8 text-slate-400">
                            {project.locationDetails.description}
                        </p>

                        <div className="mt-9 space-y-4">
                            {project.locationDetails.highlights && project.locationDetails.highlights.map((highlight) => (
                                <div
                                    key={highlight}
                                    className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CF974A]/15 text-[#CF974A]">
                                        <Check size={13} />
                                    </span>

                                    {highlight}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative min-h-[420px] overflow-hidden border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1800&q=85"
                            alt="Location map"
                            className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
                        />

                        <div className="absolute inset-0 bg-[#07101f]/45" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#CF974A] text-[#07101f] shadow-xl">
                                    <MapPin size={28} />
                                </div>

                                <p className="mt-5 text-lg font-bold">
                                    {project.location}
                                </p>

                                <p className="mt-1 text-sm text-slate-300">
                                    Project Location
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )}

            {/* =====================================================
          CTA
      ====================================================== */}
            <section
                id="enquire"
                className="relative overflow-hidden bg-[#CF974A] px-6 py-20 md:px-10 md:py-24 lg:px-12"
            >
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[60px] border-white/10" />
                <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border-[50px] border-[#07101f]/10" />

                <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#07101f]/65">
                            Start a Conversation
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#07101f] md:text-6xl">
                            Interested in this project?
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-[#07101f]/75">
                            Let's discuss your requirements and explore how SaffPoll can
                            help bring your project from concept to completion.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                        <Link
                            to="/contactUs"
                            className="inline-flex items-center justify-center gap-2 bg-[#07101f] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#13233a]"
                        >
                            Enquire About Project
                            <ArrowRight size={18} />
                        </Link>

                        <a
                            href="tel:+919810464083"
                            className="inline-flex items-center justify-center gap-2 border-2 border-[#07101f] px-7 py-4 text-sm font-bold text-[#07101f] transition hover:bg-[#07101f] hover:text-white"
                        >
                            <Phone size={17} />
                            Call SaffPoll
                        </a>
                    </div>
                </div>
            </section>

            {/* =====================================================
          IMAGE LIGHTBOX
      ====================================================== */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
                    onClick={closeImage}
                >
                    <button
                        type="button"
                        onClick={closeImage}
                        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#CF974A] hover:text-[#07101f]"
                        aria-label="Close gallery"
                    >
                        <X size={22} />
                    </button>

                    <div
                        className="relative max-h-[90vh] max-w-6xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            className="max-h-[82vh] max-w-full object-contain"
                        />

                        <div className="mt-4 text-center text-sm font-semibold text-white">
                            {selectedImage.title}
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
          FLOOR PLAN MODAL
      ====================================================== */}
            {showFloorPlan && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
                    onClick={() => setShowFloorPlan(false)}
                >
                    <button
                        type="button"
                        onClick={() => setShowFloorPlan(false)}
                        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#CF974A] hover:text-[#07101f]"
                        aria-label="Close floor plan"
                    >
                        <X size={22} />
                    </button>

                    <div
                        className="max-h-[90vh] max-w-6xl bg-white p-3"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={project.floorPlans[activePlan]}
                            alt={`${activePlan} floor plan`}
                            className="max-h-[82vh] w-auto max-w-full object-contain"
                        />

                        <div className="px-2 pb-2 pt-4 text-center">
                            <p className="text-lg font-bold text-[#0b1424]">
                                {activePlan} Floor Layout
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProjectDetail;