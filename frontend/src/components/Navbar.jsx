import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

import { apiFetch } from "../utils/api.js";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Projects", 
      href: "/project",
      dropdown: [
        { name: "SaffPoll Residences", href: "/project/saffpoll-residences" }
      ]
    },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contactUs" },
  ]);

  const location = useLocation();

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const [navResRaw, projResRaw] = await Promise.all([
          apiFetch("/navbar").catch(() => null),
          apiFetch("/projects").catch(() => null)
        ]);
        const navRes = navResRaw ? await navResRaw.json().catch(() => null) : null;
        const projRes = projResRaw ? await projResRaw.json().catch(() => null) : null;
        
        if (navRes && navRes.items && navRes.items.length > 0) {
          const items = navRes.items.map(item => {
            if (item.type === 'dynamic_projects') {
              const projectsArray = projRes?.data || [];
              const projDropdown = projectsArray.map(p => ({
                name: p.title,
                href: `/project/${p.slug || p.id}`
              }));
              if (!projDropdown.some(p => p.href === "/project/saffpoll-residences")) {
                projDropdown.unshift({ name: "SaffPoll Residences", href: "/project/saffpoll-residences" });
              }
              return { ...item, dropdown: projDropdown };
            }
            return item;
          });
          setNavItems(items);
        }
      } catch (err) {
        console.error("Failed to load navbar data", err);
      }
    };
    fetchNavbar();
  }, []);


  const isItemActive = (href) => {
    if (!href) return false;
    if (href === "/") return location.pathname === "/";
    if (href === "/about") return location.pathname === "/about" || location.pathname === "/about-us";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.replace("/", "");
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-[75px] md:h-[90px] max-w-[1700px] items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex h-[50px] md:h-[65px] w-[130px] md:w-[150px] items-center justify-start">
            <span
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: "#CF974A" }}
            >
              SAFFPOLL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-11">
          {navItems.map((item) => {
            const active = isItemActive(item.href);

            if (item.dropdown && item.dropdown.length > 0) {
              return (
                <div key={item.name} className="group relative">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 whitespace-nowrap text-[15px] xl:text-[17px] font-medium transition-colors duration-300 ${
                      active ? "text-[#CF974A]" : "text-gray-800 hover:text-[#CF974A]"
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />

                    {/* Active/hover underline */}
                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] bg-[#CF974A] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full hidden pt-5 group-hover:block w-64">
                    <div className="rounded-xl bg-white p-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.href}
                          className="block rounded-lg px-4 py-3 text-[15px] font-semibold text-gray-700 transition-colors hover:bg-[#CF974A]/10 hover:text-[#CF974A]"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative whitespace-nowrap text-[15px] xl:text-[17px] font-medium transition-colors duration-300 ${active
                    ? "text-[#CF974A]"
                    : "text-gray-800 hover:text-[#CF974A]"
                  }`}
              >
                {item.name}

                {/* Active/hover underline */}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#CF974A] transition-all duration-300 ${active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            );
          })}

          {/* Phone */}
          <a
            href="tel:+919810464083"
            className="ml-2 flex items-center gap-2 whitespace-nowrap text-[15px] xl:text-[16px] font-medium text-gray-800 transition-colors hover:text-[#CF974A]"
          >
            <Phone
              size={18}
              strokeWidth={1.8}
              className="text-[#CF974A]"
            />
            <span>+91 9810464083</span>
          </a>

          {/* Request Button */}
          <Link
            to="/#contact"
            className="ml-2 rounded-lg bg-[#CF974A] px-5 xl:px-7 py-3 xl:py-4 text-[15px] xl:text-[16px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#b9823c] hover:shadow-md"
          >
            Request for Visit
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#CF974A] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-6 shadow-lg transition-all duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = isItemActive(item.href);

              if (item.dropdown && item.dropdown.length > 0) {
                return (
                  <div key={item.name} className="flex flex-col gap-3">
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${active
                          ? "text-[#CF974A]"
                          : "text-gray-800 hover:text-[#CF974A]"
                        }`}
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100 ml-2">
                      {item.dropdown.map(dropItem => (
                        <Link
                          key={dropItem.name}
                          to={dropItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-[15px] font-semibold transition-colors ${
                            isItemActive(dropItem.href)
                              ? "text-[#CF974A]"
                              : "text-gray-600 hover:text-[#CF974A]"
                          }`}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${active
                      ? "text-[#CF974A]"
                      : "text-gray-800 hover:text-[#CF974A]"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <hr className="my-2 border-gray-100" />

            <a
              href="tel:+919810464083"
              className="flex items-center gap-2 text-base font-medium text-gray-800 hover:text-[#CF974A]"
            >
              <Phone size={18} className="text-[#CF974A]" />
              <span>+91 9810464083</span>
            </a>

            <Link
              to="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center rounded-lg bg-[#CF974A] px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#b9823c]"
            >
              Request for Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
