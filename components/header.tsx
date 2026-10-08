"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Na home o header flutua sobre o hero. Nas demais páginas fica fixo no topo.
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const linkClass = (href: string) => {
    const isCurrent = pathname === href;
    if (!showScrolledStyle) {
      return cn(
        "text-sm transition-colors",
        isCurrent ? "text-white" : "text-white/70 hover:text-white"
      );
    }
    return cn(
      "text-sm transition-colors",
      isCurrent
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );
  };

  return (
    <header
      className={
        isHomePage
          ? cn(
              "fixed top-4 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2 transition-all duration-300",
              showScrolledStyle
                ? "rounded-full bg-background/80 backdrop-blur-md"
                : "bg-transparent"
            )
          : "fixed inset-x-0 top-0 z-50 border-b border-border bg-background"
      }
      style={
        isHomePage && showScrolledStyle
          ? {
              boxShadow:
                "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
            }
          : undefined
      }
    >
      <div
        className={
          isHomePage
            ? "flex items-center justify-between px-2 py-2 pl-5"
            : "mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6"
        }
      >
        <Link href="/" className="flex items-center" aria-label="Majestade Personalizados">
          <Image
            src={
              showScrolledStyle
                ? "/logo-majestade-navy-gold.png"
                : "/logo-majestade-white-gold.png"
            }
            alt="Majestade Personalizados"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const isCurrent = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  linkClass(link.href),
                  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                )}
              >
                <span className="relative">
                  {link.label}
                  {isCurrent && !isHomePage && (
                    <span
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent"
                      aria-hidden
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              showScrolledStyle
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/70 hover:text-white"
            )}
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
          >
            <InstagramIcon className="size-4" />
            <span className="hidden lg:inline">{INSTAGRAM_HANDLE}</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              showScrolledStyle
                ? "bg-accent text-accent-foreground"
                : "bg-white text-foreground"
            )}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden",
            showScrolledStyle ? "text-foreground" : "text-white"
          )}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={cn(
            "border-t border-border bg-background px-6 py-6 lg:hidden",
            isHomePage && "rounded-b-2xl"
          )}
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "rounded-sm px-2 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isCurrent
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm px-2 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <InstagramIcon className="size-5" />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
