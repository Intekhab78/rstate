import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Building2, Phone } from "lucide-react";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#07101f] text-white flex items-center justify-center px-6 py-24">
      <SEO
        title="Page Not Found (404) | SaffPoll Developments"
        description="The page you are looking for could not be found or may have been moved."
        noindex={true}
        nofollow={true}
      />
      <div className="max-w-xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#CF974A] border border-[#CF974A]/30 bg-[#CF974A]/10 px-4 py-1.5 rounded-full inline-block mb-6">
          Error 404
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6">
          Page Not Found
        </h1>

        <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#CF974A] hover:bg-[#e0a85f] text-[#07101f] font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-lg shadow-[#CF974A]/20"
          >
            <Home size={16} />
            <span>Go to Homepage</span>
          </Link>

          <Link
            to="/project"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors border border-slate-700"
          >
            <Building2 size={16} />
            <span>Browse Projects</span>
          </Link>

          <Link
            to="/contactUs"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium px-4 py-3 text-sm transition-colors"
          >
            <Phone size={15} />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
