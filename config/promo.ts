/**
 * Configuração única da campanha promocional.
 * Mude o `id` para resetar dismissões gravadas no navegador.
 * Fora da janela startsAt/endsAt, nada é exibido (bar nem modal).
 */
export type PromoConfig = {
  id: string;
  enabled: boolean;
  /** ISO 8601 com offset (ex.: -03:00). */
  startsAt: string;
  endsAt: string;
  bar: {
    enabled: boolean;
    message: string;
    ctaLabel?: string;
    ctaHref?: string;
    dismissible: boolean;
  };
  modal: {
    enabled: boolean;
    badge?: string;
    title: string;
    description: string;
    /** Se definido, mostra botão "Copiar cupom". */
    couponCode?: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryLabel?: string;
    showCountdown: boolean;
  };
  triggers: {
    /** Atraso em ms após load. 0 = desliga. */
    delayMs: number;
    /** % de scroll (0–100). 0 = desliga. */
    scrollPercent: number;
    /** Intent de saída (desktop). */
    exitIntent: boolean;
  };
  storage: {
    /** Persistência do "já dispensou". */
    mode: "local" | "session";
    /** Dias até expirar dismiss em localStorage. Ignorado em session. */
    ttlDays: number;
  };
};

export const promoConfig = {
  id: "maj-verao-2026-2027",
  enabled: true,
  startsAt: "2026-11-01T00:00:00-03:00",
  endsAt: "2027-03-20T23:59:59-03:00",
  bar: {
    enabled: true,
    message:
      "Campanha de Verão: cupom VERAOMAJESTADE válido para linha de verão e acessórios (bonés etc.).",
    ctaLabel: "Ver acessórios",
    ctaHref: "/produtos#acessorios",
    dismissible: true,
  },
  modal: {
    enabled: true,
    badge: "Verão",
    title: "Campanha de Verão Majestade",
    description:
      "O cupom VERAOMAJESTADE é válido para toda a linha de verão e acessórios — bonés e demais itens da temporada. Copie o código e confira a seção de acessórios.",
    couponCode: "VERAOMAJESTADE",
    ctaLabel: "Ver acessórios",
    ctaHref: "/produtos#acessorios",
    secondaryLabel: "Agora não",
    showCountdown: true,
  },
  triggers: {
    delayMs: 8000,
    scrollPercent: 45,
    exitIntent: true,
  },
  storage: {
    mode: "local",
    ttlDays: 7,
  },
} satisfies PromoConfig;

export function isPromoActive(
  config: PromoConfig = promoConfig,
  now: Date = new Date()
): boolean {
  if (!config.enabled) return false;
  const start = Date.parse(config.startsAt);
  const end = Date.parse(config.endsAt);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  const t = now.getTime();
  return t >= start && t <= end;
}
