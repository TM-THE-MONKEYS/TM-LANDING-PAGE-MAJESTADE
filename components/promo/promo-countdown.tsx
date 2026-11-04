"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function calcTimeLeft(endsAt: string, now: number): TimeLeft {
  const end = Date.parse(endsAt);
  const diff = end - now;
  if (Number.isNaN(end) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    done: false,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.25rem] flex-col items-center rounded-md bg-brand-ink/5 px-2 py-1.5">
      <span className="font-mono text-base font-semibold tabular-nums text-foreground md:text-lg">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function PromoCountdown({
  endsAt,
  className,
}: {
  endsAt: string;
  className?: string;
}) {
  const [left, setLeft] = useState<TimeLeft>(() =>
    calcTimeLeft(endsAt, Date.now())
  );

  useEffect(() => {
    setLeft(calcTimeLeft(endsAt, Date.now()));
    const id = window.setInterval(() => {
      setLeft(calcTimeLeft(endsAt, Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  if (left.done) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        Campanha encerrada.
      </p>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      aria-live="polite"
      aria-label={`Termina em ${left.days} dias, ${left.hours} horas, ${left.minutes} minutos e ${left.seconds} segundos`}
    >
      <Unit value={left.days} label="dias" />
      <Unit value={left.hours} label="hrs" />
      <Unit value={left.minutes} label="min" />
      <Unit value={left.seconds} label="seg" />
    </div>
  );
}
