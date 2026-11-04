export type PromoAnalyticsEvent =
  | "promo_bar_view"
  | "promo_bar_click"
  | "promo_bar_dismiss"
  | "promo_modal_view"
  | "promo_modal_cta"
  | "promo_modal_dismiss"
  | "promo_coupon_copy";

type PromoAnalyticsPayload = {
  campaignId: string;
  source?: "bar" | "modal";
  [key: string]: string | number | boolean | undefined;
};

/**
 * Adapter leve. Troque o corpo por GTM/Pixel/etc. sem tocar nos componentes.
 */
export function trackPromoEvent(
  event: PromoAnalyticsEvent,
  payload: PromoAnalyticsPayload
): void {
  if (process.env.NODE_ENV === "development") {
    console.info("[promo]", event, payload);
  }

  if (typeof window === "undefined") return;

  const w = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer?.push({ event, ...payload });

  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
  }
}
