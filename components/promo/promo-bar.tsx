"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { PromoConfig } from "@/config/promo";
import { trackPromoEvent } from "@/lib/promo-analytics";
import { cn } from "@/lib/utils";

const BAR_HEIGHT = "2.5rem";

export function PromoBar({
  config,
  onDismiss,
}: {
  config: PromoConfig;
  onDismiss?: () => void;
}) {
  const { bar, id } = config;

  useEffect(() => {
    trackPromoEvent("promo_bar_view", { campaignId: id, source: "bar" });
    document.documentElement.style.setProperty("--promo-bar-height", BAR_HEIGHT);
    return () => {
      document.documentElement.style.setProperty("--promo-bar-height", "0px");
    };
  }, [id]);

  const ctaIsExternal = Boolean(bar.ctaHref?.startsWith("http"));

  return (
    <div
      role="region"
      aria-label="Promoção"
      className={cn(
        "fixed inset-x-0 top-0 z-[60] flex h-10 items-center justify-center gap-3",
        "bg-brand-ink px-4 text-center text-xs text-white md:text-sm"
      )}
    >
      <p className="min-w-0 flex-1 truncate md:flex-none md:max-w-3xl">
        {bar.message}
      </p>

      {bar.ctaLabel && bar.ctaHref ? (
        ctaIsExternal ? (
          <a
            href={bar.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-medium text-brand-gold underline-offset-2 hover:underline"
            onClick={() =>
              trackPromoEvent("promo_bar_click", {
                campaignId: id,
                source: "bar",
              })
            }
          >
            {bar.ctaLabel}
          </a>
        ) : (
          <Link
            href={bar.ctaHref}
            className="shrink-0 font-medium text-brand-gold underline-offset-2 hover:underline"
            onClick={() =>
              trackPromoEvent("promo_bar_click", {
                campaignId: id,
                source: "bar",
              })
            }
          >
            {bar.ctaLabel}
          </Link>
        )
      ) : null}

      {bar.dismissible && onDismiss ? (
        <button
          type="button"
          onClick={() => {
            trackPromoEvent("promo_bar_dismiss", {
              campaignId: id,
              source: "bar",
            });
            onDismiss();
          }}
          className="absolute right-2 inline-flex size-7 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:right-3"
          aria-label="Fechar promoção"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}
