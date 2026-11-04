"use client";

import { useCallback, useEffect, useState } from "react";

type StorageMode = "local" | "session";

type StoredDismiss = {
  dismissedAt: number;
  expiresAt: number | null;
};

function getStore(mode: StorageMode): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return mode === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readDismissed(key: string, mode: StorageMode): boolean {
  const store = getStore(mode);
  if (!store) return false;
  try {
    const raw = store.getItem(key);
    if (!raw) return false;
    const data = JSON.parse(raw) as StoredDismiss;
    if (data.expiresAt != null && Date.now() > data.expiresAt) {
      store.removeItem(key);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function writeDismissed(key: string, mode: StorageMode, ttlDays: number): void {
  const store = getStore(mode);
  if (!store) return;
  try {
    const now = Date.now();
    const payload: StoredDismiss = {
      dismissedAt: now,
      expiresAt:
        mode === "local" && ttlDays > 0
          ? now + ttlDays * 24 * 60 * 60 * 1000
          : null,
    };
    store.setItem(key, JSON.stringify(payload));
  } catch {
    // private mode / quota — ignora
  }
}

function clearDismissed(key: string, mode: StorageMode): void {
  const store = getStore(mode);
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    // ignore
  }
}

export function usePersistentDismiss(options: {
  key: string;
  mode: StorageMode;
  ttlDays: number;
}) {
  const { key, mode, ttlDays } = options;
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDismissed(readDismissed(key, mode));
    setReady(true);
  }, [key, mode]);

  const dismiss = useCallback(() => {
    writeDismissed(key, mode, ttlDays);
    setDismissed(true);
  }, [key, mode, ttlDays]);

  const reset = useCallback(() => {
    clearDismissed(key, mode);
    setDismissed(false);
  }, [key, mode]);

  return { dismissed, ready, dismiss, reset };
}
