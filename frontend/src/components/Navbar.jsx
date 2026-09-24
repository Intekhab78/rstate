import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/project" },
    { name: "Services", href: "/services" },
    // { name: "Venture Developments", href: "/#ventures" },
    { name: "Contact", href: "/contactUs" },
  ];

  const isItemActive = (href) => {
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
