"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { promoConfig, isPromoActive } from "@/config/promo";
import { PromoBar } from "@/components/promo/promo-bar";
import { usePersistentDismiss } from "@/hooks/use-persistent-dismiss";
import { usePromoTriggers } from "@/hooks/use-promo-triggers";

const PromoModal = dynamic(
  () =>
    import("@/components/promo/promo-modal").then((m) => m.PromoModal),
  { ssr: false }
);

export function PromoProvider() {
  const config = promoConfig;
  const active = useMemo(() => isPromoActive(config), []);

  const barKey = `promo:bar:${config.id}`;
  const modalKey = `promo:modal:${config.id}`;

  const barDismiss = usePersistentDismiss({
    key: barKey,
    mode: config.storage.mode,
    ttlDays: config.storage.ttlDays,
  });
  const modalDismiss = usePersistentDismiss({
    key: modalKey,
    mode: config.storage.mode,
    ttlDays: config.storage.ttlDays,
  });

  const showBar =
    active &&
    config.bar.enabled &&
    barDismiss.ready &&
    !barDismiss.dismissed;

  const modalEligible =
    active &&
    config.modal.enabled &&
    modalDismiss.ready &&
    !modalDismiss.dismissed;

  const triggerFired = usePromoTriggers(config.triggers, modalEligible);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (triggerFired && modalEligible) {
      setModalOpen(true);
    }
  }, [triggerFired, modalEligible]);

  useEffect(() => {
    if (!showBar) {
      document.documentElement.style.setProperty("--promo-bar-height", "0px");
    }
  }, [showBar]);

  if (!active) return null;

  return (
    <>
      {showBar ? (
        <PromoBar
          config={config}
          onDismiss={config.bar.dismissible ? barDismiss.dismiss : undefined}
        />
      ) : null}

      {modalEligible && triggerFired ? (
        <PromoModal
          config={config}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onDismiss={modalDismiss.dismiss}
        />
      ) : null}

      <Toaster position="top-center" theme="system" richColors closeButton />
    </>
  );
}
