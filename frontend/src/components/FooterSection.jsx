import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const GOLD = "#CF974A";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#1d1c1b] text-white">

      {/* TOP GOLD LINE */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: GOLD }}
      />

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:gap-20">

          {/* =====================================================
              BRAND
          ====================================================== */}

          <div>

            <div className="flex items-center gap-4">

              {/* Logo mark */}
              <div
                className="relative flex h-12 w-12 items-center justify-center border"
                style={{ borderColor: GOLD }}
              >
                <span
                  className="text-xl font-light"
                  style={{ color: GOLD }}
                >
                  S
                </span>
              </div>

              <div>

                <div className="text-[30px] font-normal tracking-[-1.5px]">
                  SAFFPOLL
                </div>

                <div
                  className="mt-1 text-[9px] font-medium uppercase tracking-[0.38em]"
                  style={{ color: GOLD }}
                >
                  Building With Purpose
                </div>

              </div>

            </div>


            {/* Description */}

            <p className="mt-8 max-w-[500px] text-[14px] font-light leading-7 text-white/55">
              A trusted building contractor delivering quality
              residential, commercial, renovation and construction
              solutions with experience and craftsmanship.
            </p>


            {/* Experience */}

            <div className="mt-9 flex items-center gap-4">

              <div
                className="h-[1px] w-14"
                style={{ backgroundColor: GOLD }}
              />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Building Since 1998
              </span>

            </div>

          </div>


          {/* =====================================================
              CONTACT
          ====================================================== */}

          <div>

            <div className="mb-7 flex items-center gap-3">

              <span
                className="h-[1px] w-7"
                style={{ backgroundColor: GOLD }}
              />

              <h3 className="text-[13px] font-medium uppercase tracking-[0.2em] text-white">
                Contact
              </h3>

            </div>


            <div className="space-y-5">

              {/* Address */}

              <div className="flex gap-4">

                <MapPin
                  size={17}
                  strokeWidth={1.3}
                  className="mt-1 shrink-0"
                  style={{ color: GOLD }}
                />

                <p className="text-[13px] font-light leading-6 text-white/55">
                  144, Pocket 1 Street,
                  <br />
                  Pocket 1, Jasola Vihar,
                  <br />
                  New Delhi, Delhi, India
                </p>

              </div>


              {/* Phone */}

              <div className="flex gap-4">

                <Phone
                  size={17}
                  strokeWidth={1.3}
                  className="mt-1 shrink-0"
                  style={{ color: GOLD }}
                />

                <div className="space-y-2">

                  <a
                    href="tel:+919810464083"
                    className="block text-[13px] font-light text-white/60 transition-colors hover:text-[#CF974A]"
                  >
                    +91 98104 64083
                  </a>

                  <a
                    href="tel:+918595964083"
                    className="block text-[13px] font-light text-white/60 transition-colors hover:text-[#CF974A]"
                  >
                    +91 85959 64083
                  </a>

                </div>

              </div>


              {/* Email */}

              <a
                href="mailto:firoz@saffpoll.com"
                className="flex items-center gap-4 text-[13px] font-light text-white/60 transition-colors hover:text-[#CF974A]"
              >

                <Mail
                  size={17}
                  strokeWidth={1.3}
                  style={{ color: GOLD }}
                />

                firoz@saffpoll.com

              </a>

            </div>

          </div>


          {/* =====================================================
              QUICK LINKS
          ====================================================== */}

          <div>

            <div className="mb-7 flex items-center gap-3">

              <span
                className="h-[1px] w-7"
                style={{ backgroundColor: GOLD }}
              />

              <h3 className="text-[13px] font-medium uppercase tracking-[0.2em] text-white">
                Quick Links
              </h3>

            </div>


            <nav>

              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group flex items-center justify-between border-b border-white/10 py-3.5 text-[13px] font-light text-white/55 transition-all duration-300 hover:border-[#CF974A]/50 hover:text-[#CF974A]"
                >

                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.4}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  />

                </Link>
              ))}

            </nav>

          </div>

        </div>


        {/* =====================================================
            BOTTOM AREA
        ====================================================== */}

        <div className="mt-16 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] font-light tracking-wide text-white/35">
              © {new Date().getFullYear()} Saffpoll. All Rights Reserved.
            </p>


            <a
              href="https://jtstechnologies.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[11px] font-light text-white/35 transition-colors duration-300 hover:text-[#CF974A]"
            >
              Developed By

              <span className="text-white/55 group-hover:text-[#CF974A]">
                JTS
              </span>

              <ArrowUpRight
                size={11}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}