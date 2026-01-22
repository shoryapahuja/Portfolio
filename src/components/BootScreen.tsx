"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BootStepKey = "firmware" | "hardware" | "app";

type BootStep = {
  key: BootStepKey;
  label: string;
};

const steps: BootStep[] = [
  { key: "firmware", label: "Firmware Module" },
  { key: "hardware", label: "Hardware Interface" },
  { key: "app", label: "Application Layer" },
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function BootScreen({ onBootComplete }: { onBootComplete: () => void }) {
  const [status, setStatus] = useState<"OFFLINE" | "ONLINE">("OFFLINE");
  const [isBooting, setIsBooting] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [progress, setProgress] = useState<Record<BootStepKey, number>>({
    firmware: 0,
    hardware: 0,
    app: 0,
  });

  const timeoutsRef = useRef<number[]>([]);

  const overallProgress = useMemo(() => {
    const values = Object.values(progress);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }, [progress]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  };

  const boot = () => {
    if (isBooting) return;
    setIsBooting(true);
    setStatus("OFFLINE");
    setActiveStepIndex(-1);
    setProgress({ firmware: 0, hardware: 0, app: 0 });

    // Faster boot (still readable)
    const stepDurations: Record<BootStepKey, number> = {
      firmware: 820,
      hardware: 880,
      app: 760,
    };

    const tickEvery = 55;

    const runStep = (idx: number) => {
      if (idx >= steps.length) {
        setStatus("ONLINE");
        schedule(() => onBootComplete(), 280);
        return;
      }

      const step = steps[idx];
      setActiveStepIndex(idx);

      const start = performance.now();
      const duration = stepDurations[step.key];

      const tick = () => {
        const t = performance.now() - start;
        const p = clamp((t / duration) * 100, 0, 100);
        setProgress((prev) => ({ ...prev, [step.key]: p }));

        if (p < 100) {
          schedule(tick, tickEvery);
        } else {
          schedule(() => runStep(idx + 1), 140);
        }
      };

      tick();
    };

    // Short pre-roll
    schedule(() => runStep(0), 110);
  };

  const stepStatus = (idx: number, key: BootStepKey) => {
    const p = progress[key];
    if (p >= 100) return "OK";
    if (idx === activeStepIndex) return "LOADING";
    if (idx < activeStepIndex) return "OK";
    return "PENDING";
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/40 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.01]">
            <div className="flex items-center gap-3">
              <div className="flex gap-2" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs sm:text-sm tracking-[0.18em] text-zinc-200/90">
                SHORYA PAHUJA — SYSTEM CONSOLE
              </div>
            </div>
            <div className="text-xs font-medium">
              <span className="text-zinc-400">STATUS: </span>
              <span className={status === "ONLINE" ? "text-emerald-300" : "text-zinc-200"}>
                {status}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-7 py-7 sm:py-9">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="text-sm text-zinc-300">Initializing modules for portfolio interface…</div>
                <div className="text-sm sm:text-base text-zinc-200/90">
                  Press <span className="text-zinc-100 font-semibold">BOOT SYSTEM</span> to continue.
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-400">OVERALL</div>
                <div className="text-2xl font-semibold tabular-nums">{overallProgress}%</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {steps.map((s, idx) => {
                const p = progress[s.key];
                const state = stepStatus(idx, s.key);
                return (
                  <div key={s.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-zinc-200">{s.label}</div>
                      <div className="text-xs text-zinc-400 tabular-nums">
                        {state === "OK" ? "OK" : state === "LOADING" ? "LOADING…" : "PENDING"}
                      </div>
                    </div>
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500/80 to-cyan-400/80 transition-[width] duration-150 ease-out"
                        style={{ width: `${Math.round(p)}%` }}
                        aria-hidden="true"
                      />
                      {state === "LOADING" && (
                        <div
                          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent [animation:boot-shimmer_1.15s_linear_infinite] pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-3">
              <div className="text-xs text-zinc-500">Secure boot • No network • Client-side only</div>
              <button
                type="button"
                onClick={boot}
                disabled={isBooting}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] transition-colors text-sm font-semibold tracking-[0.14em] text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Boot system"
              >
                {isBooting ? "BOOTING…" : "BOOT SYSTEM"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-zinc-500">
          Tip: This intro is cosmetic—your portfolio loads immediately after boot.
        </div>
      </div>
    </div>
  );
}

