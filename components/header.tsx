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

/**
 * Páginas internas que devem usar o header na cor escura da marca (#2b2112).
 * Adicionar novos paths aqui conforme o projeto crescer.
 */
const DARK_HEADER_PAGES = ["/produtos"];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isDarkPage = DARK_HEADER_PAGES.includes(pathname);

  // Na home o header flutua sobre o hero. Nas demais páginas fica fixo no topo.
  const showScrolledStyle = !isHomePage || isScrolled;

  // Texto branco: header transparente na home OU header escuro nas dark pages
  const useLightText = !showScrolledStyle || isDarkPage;

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const linkClass = (href: string) => {
    const isCurrent = pathname === href;
    if (useLightText) {
      return cn(
        "text-sm transition-colors",
        isCurrent ? "text-white" : "text-white/60 hover:text-white"
      );
    }
    return cn(
      "text-sm transition-colors",
      isCurrent
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );
  };

  // Logo: branco/ouro quando sobre fundo escuro, navy/ouro sobre fundo claro
  const logoSrc =
    showScrolledStyle && !isDarkPage
      ? "/logo-majestade-navy-gold.png"
      : "/logo-majestade-white-gold.png";

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
          : isDarkPage
          ? "fixed inset-x-0 top-0 z-50 bg-[#2b2112]"
          : "fixed inset-x-0 top-0 z-50 border-b border-border bg-background"
      }
      style={
        isHomePage && showScrolledStyle
          ? {
              boxShadow:
                "rgba(14,63,126,.04) 0 0 0 1px,rgba(42,51,69,.04) 0 1px 1px -.5px,rgba(42,51,70,.04) 0 3px 3px -1.5px,rgba(42,51,70,.04) 0 6px 6px -3px,rgba(14,63,126,.04) 0 12px 12px -6px,rgba(14,63,126,.04) 0 24px 24px -12px",
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
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Majestade Personalizados">
          <Image
            src={logoSrc}
            alt="Majestade Personalizados"
            width={140}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
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
                  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  isDarkPage && "focus-visible:ring-offset-[#2b2112]"
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

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              useLightText
                ? "text-white/60 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
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
              showScrolledStyle || isDarkPage
                ? "bg-accent text-accent-foreground"
                : "bg-white text-foreground"
            )}
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden",
            useLightText ? "text-white" : "text-foreground"
          )}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={cn(
            "border-t px-6 py-6 lg:hidden",
            isDarkPage
              ? "border-white/10 bg-[#2b2112]"
              : "border-border bg-background",
            isHomePage && !isDarkPage && "rounded-b-2xl"
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
                    isDarkPage
                      ? isCurrent
                        ? "font-medium text-white"
                        : "text-white/60"
                      : isCurrent
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
              className={cn(
                "inline-flex items-center gap-2 rounded-sm px-2 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isDarkPage ? "text-white/60" : "text-foreground"
              )}
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
