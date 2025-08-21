"use client";

import { useEffect, useState } from "react";

type Props = { nickname?: string };

export type FaceitEloPayload = {
  elo: number | null;
  level: number | null;
  game: string;
  error?: string;
  country?: string | null;
  rank?: number | null;
};

export type Threshold = { readonly level: number; readonly min: number; readonly max?: number };

export const LEVEL_THRESHOLDS: ReadonlyArray<Threshold> = [
  { level: 1, min: 100, max: 500 },
  { level: 2, min: 501, max: 750 },
  { level: 3, min: 751, max: 900 },
  { level: 4, min: 901, max: 1050 },
  { level: 5, min: 1051, max: 1200 },
  { level: 6, min: 1201, max: 1350 },
  { level: 7, min: 1351, max: 1530 },
  { level: 8, min: 1531, max: 1750 },
  { level: 9, min: 1751, max: 2000 },
  { level: 10, min: 2001 },
];

function getLevelFromElo(elo: number | null): number | null {
  if (elo == null || Number.isNaN(elo)) return null;
  for (const t of LEVEL_THRESHOLDS) {
    if (t.max == null) {
      if (elo >= t.min) return t.level;
    } else if (elo >= t.min && elo <= t.max) {
      return t.level;
    }
  }
  return null;
}

function computeProgress(elo: number | null, level: number | null): { pct: number | null; currentMin: number | null; nextMin: number | null } {
  if (elo == null || level == null) return { pct: null, currentMin: null, nextMin: null };
  const current = LEVEL_THRESHOLDS.find((t) => t.level === level) ?? null;
  if (!current) return { pct: null, currentMin: null, nextMin: null };
  if (level === 10) {
    return { pct: 100, currentMin: current.min, nextMin: null };
  }
  const next = LEVEL_THRESHOLDS.find((t) => t.level === level + 1) ?? null;
  if (!next) return { pct: null, currentMin: current.min, nextMin: null };
  const denominator = next.min - current.min;
  const ratio = Math.max(0, Math.min(1, (elo - current.min) / denominator));
  return { pct: Math.round(ratio * 100), currentMin: current.min, nextMin: next.min };
}

const numberFmt = new Intl.NumberFormat("fr-FR");

export default function FaceitElo({ nickname: nicknameProp }: Props) {
  const nickname = nicknameProp ?? "TSARUIS63";
  const [payload, setPayload] = useState<FaceitEloPayload | null>(null);
  const [eloDelta, setEloDelta] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const storageKey = `faceit_elo:${nickname}`;

    const fetchElo = async () => {
      try {
        const res = await fetch(`/api/faceit/elo?nickname=${encodeURIComponent(nickname)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Requête invalide (${res.status})`);
        }
        const json = (await res.json()) as FaceitEloPayload;
        if (!isMounted) return;
        setPayload(json);

        // Variation locale: comparaison avec le dernier ELO stocké pour ce pseudo
        const prevRaw = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
        const prev = prevRaw != null ? Number(prevRaw) : null;
        const current = json.elo ?? null;
        if (current != null) {
          if (prev != null && !Number.isNaN(prev)) {
            setEloDelta(current - prev);
          } else {
            setEloDelta(null);
          }
          try {
            window.localStorage.setItem(storageKey, String(current));
          } catch {
            // ignore storage errors
          }
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        if (err && typeof err === 'object' && 'name' in err && (err as { name?: string }).name === 'AbortError') return;
        setPayload({ elo: null, level: null, game: "cs2", error: "Erreur réseau" });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void fetchElo();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [nickname]);

  if (isLoading) {
    return (
      <div className="rounded-lg bg-slate-900/40 p-6" role="status" aria-busy>
        <div className="h-4 w-56 animate-pulse rounded bg-slate-700/50 mx-auto mb-5" />
        <div className="h-10 w-64 animate-pulse rounded bg-slate-700/50 mx-auto mb-3" />
        <div className="h-2 w-full max-w-md animate-pulse rounded bg-slate-700/30 mx-auto" />
      </div>
    );
  }

  const eloValue = payload?.elo ?? null;
  const levelFromApi = payload?.level ?? null;
  const level = levelFromApi ?? getLevelFromElo(eloValue);
  const { pct, currentMin, nextMin } = computeProgress(eloValue, level);

  const hasError = Boolean(payload?.error);
  const titleTooltip = (() => {
    if (!level) return "";
    const t = LEVEL_THRESHOLDS.find((x) => x.level === level);
    if (!t) return "";
    const range = t.max ? `${numberFmt.format(t.min)}–${numberFmt.format(t.max)} ELO` : `${numberFmt.format(t.min)}+ ELO`;
    return `Niveau ${level} · ${range}`;
  })();

  const eloDisplay = eloValue != null ? numberFmt.format(eloValue) : "—";
  const levelDisplay = level != null ? String(level) : "—";
  const deltaDisplay = eloDelta == null || eloDelta === 0 ? null : `${eloDelta > 0 ? "+" : ""}${numberFmt.format(eloDelta)}`;
  const deltaColor = eloDelta == null || eloDelta === 0 ? "text-slate-400" : eloDelta > 0 ? "text-emerald-400" : "text-rose-400";

  const rankDisplay = payload?.rank != null ? `#${numberFmt.format(payload.rank)}` : null;

  return (
    <div className="rounded-lg bg-slate-900/60 p-4 sm:p-5 border border-slate-700/40">

      {hasError ? (
        <div className="mb-3 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-200 text-xs">
          {payload?.error} · Vérifiez votre connexion et la variable d’environnement `FACEIT_API_KEY`.
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 mb-2">
        {level === 7 ? (
          <div className="h-14 w-14 flex items-center justify-center" aria-label={`Niveau ${levelDisplay}`} title={titleTooltip}>
            <img
              src="/Faceit-lvl-7.png"
              alt="Badge FACEIT Niveau 7"
              className="h-14 w-14 object-contain rounded-full"
            />
          </div>
        ) : (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md"
            aria-label={`Niveau ${levelDisplay}`}
            title={titleTooltip}
          >
            <span className="text-xl font-black">{levelDisplay}</span>
          </div>
        )}

        <div className="text-left flex-1">
          <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none flex items-center">
            {eloDisplay}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-3 h-8 w-8 text-white"
              aria-hidden
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 3v18h18" />
              <circle cx="9" cy="15" r="1" />
              <circle cx="13" cy="10" r="1" />
              <circle cx="17" cy="13" r="1" />
              <path d="M9 15l4 -5l4 3" />
            </svg>
            {deltaDisplay ? (
              <span className={`ml-3 align-middle text-lg sm:text-xl font-bold ${deltaColor}`}>{deltaDisplay}</span>
            ) : null}
          </div>
        </div>

        <div className="text-right shrink-0 ml-2 flex flex-col items-end">
          {rankDisplay ? (
            <div className="text-sm font-semibold text-slate-200 flex items-center">
              <span>{rankDisplay}</span>
              <img src="/france.png" alt="FR" className="ml-2 h-4 w-6 rounded-sm object-cover" />
            </div>
          ) : null}
          {!rankDisplay ? (
            <img src="/france.png" alt="FR" className="h-4 w-6 rounded-sm object-cover" />
          ) : null}
        </div>
      </div>

      {pct != null && level !== 10 ? (
        <div className="mt-3">
          <div className="h-2 w-full rounded bg-slate-700/60 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <div className="h-2 rounded bg-orange-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-slate-400">
            <span>{currentMin != null ? numberFmt.format(currentMin) : ""}</span>
            {nextMin != null && eloValue != null ? (
              <span className="text-center flex-1">{`+${numberFmt.format(Math.max(0, nextMin - eloValue))} jusqu'au niveau ${Number(level) + 1}`}</span>
            ) : null}
            <span>{nextMin != null ? numberFmt.format(nextMin) : ""}</span>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-xs text-slate-400">Niveau maximal atteint</div>
      )}

      <div className="mt-4 text-right">
        <a
        href={`https://www.faceit.com/en/players/${encodeURIComponent(nickname)}`}
        className="inline-block text-cyan-400 hover:text-cyan-300 underline"
        target="_blank"
        rel="noreferrer"
      >
        Voir mon profil
      </a>
      </div>
    </div>
  );
}


