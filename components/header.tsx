"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";
import { navLinks } from "@/lib/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On inner pages, always render in "scrolled" style so the dark logo is visible
  // on the light off-white background. On home, derive style from scroll position.
  const showScrolledStyle = !isHomePage || isScrolled;

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300 ${showScrolledStyle ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: showScrolledStyle ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        <Link href="/" className="flex items-center" aria-label="Majestade Personalizados">
          <Image
            src={showScrolledStyle ? "/logo-majestade-navy-gold.png" : "/logo-majestade-white-gold.png"}
            alt="Majestade Personalizados"
            width={140}
            height={48}
            className="h-10 w-auto transition-all duration-300"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${showScrolledStyle ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-sm transition-colors ${showScrolledStyle ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
          >
            <InstagramIcon className="size-4" />
            <span className="hidden lg:inline">{INSTAGRAM_HANDLE}</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full ${showScrolledStyle ? "bg-accent text-accent-foreground hover:opacity-90" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`transition-colors md:hidden ${showScrolledStyle ? "text-foreground" : "text-white"}`}
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <InstagramIcon className="size-5" />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
