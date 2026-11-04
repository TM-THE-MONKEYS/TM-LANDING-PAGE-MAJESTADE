"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import type { PromoConfig } from "@/config/promo";
import { PromoCountdown } from "@/components/promo/promo-countdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/components/ui/use-mobile";
import { trackPromoEvent } from "@/lib/promo-analytics";

async function copyCoupon(code: string, campaignId: string) {
  try {
    await navigator.clipboard.writeText(code);
    trackPromoEvent("promo_coupon_copy", {
      campaignId,
      source: "modal",
    });
    toast.success("Cupom copiado");
  } catch {
    toast.error("Não foi possível copiar. Tente selecionar o código.");
  }
}

function PromoBody({
  config,
  onDismiss,
}: {
  config: PromoConfig;
  onDismiss: () => void;
}) {
  const { modal, id, endsAt } = config;
  const ctaExternal = modal.ctaHref.startsWith("http");

  return (
    <div className="space-y-5">
      {modal.badge ? (
        <Badge className="bg-brand-gold text-white hover:bg-brand-gold/90">
          {modal.badge}
        </Badge>
      ) : null}

      {modal.showCountdown ? (
        <PromoCountdown endsAt={endsAt} className="justify-start" />
      ) : null}

      {modal.couponCode ? (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-brand-gold/40 bg-brand-gold/5 px-3 py-2">
          <code className="flex-1 text-sm font-semibold tracking-wider text-foreground">
            {modal.couponCode}
          </code>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={() => copyCoupon(modal.couponCode!, id)}
          >
            <Copy className="size-3.5" />
            Copiar
          </Button>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {ctaExternal ? (
          <Button asChild className="bg-brand-gold text-white hover:bg-brand-gold/90">
            <a
              href={modal.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackPromoEvent("promo_modal_cta", {
                  campaignId: id,
                  source: "modal",
                });
              }}
            >
              {modal.ctaLabel}
            </a>
          </Button>
        ) : (
          <Button asChild className="bg-brand-gold text-white hover:bg-brand-gold/90">
            <Link
              href={modal.ctaHref}
              onClick={() => {
                trackPromoEvent("promo_modal_cta", {
                  campaignId: id,
                  source: "modal",
                });
                onDismiss();
              }}
            >
              {modal.ctaLabel}
            </Link>
          </Button>
        )}

        {modal.secondaryLabel ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              trackPromoEvent("promo_modal_dismiss", {
                campaignId: id,
                source: "modal",
              });
              onDismiss();
            }}
          >
            {modal.secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function PromoModal({
  config,
  open,
  onOpenChange,
  onDismiss,
}: {
  config: PromoConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDismiss: () => void;
}) {
  const isMobile = useIsMobile();
  const { modal, id } = config;

  useEffect(() => {
    if (open) {
      trackPromoEvent("promo_modal_view", { campaignId: id, source: "modal" });
    }
  }, [open, id]);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      trackPromoEvent("promo_modal_dismiss", {
        campaignId: id,
        source: "modal",
      });
      onDismiss();
    }
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="text-left">
            <DrawerTitle>{modal.title}</DrawerTitle>
            <DrawerDescription>{modal.description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <PromoBody config={config} onDismiss={onDismiss} />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modal.title}</DialogTitle>
          <DialogDescription>{modal.description}</DialogDescription>
        </DialogHeader>
        <PromoBody config={config} onDismiss={onDismiss} />
      </DialogContent>
    </Dialog>
  );
}
