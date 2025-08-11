"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Trophy, Swords, ExternalLink, Target } from "lucide-react";

export type RecordWL = { win: number; loss: number; draw: number };
export type Ratings = { rapid?: number | null; blitz?: number | null; bullet?: number | null; tactics?: number | null };
export type ChessComData = {
  username: string;
  name?: string | null;
  avatar?: string | null;
  title?: string | null;
  countryCode?: string | null;
  profileUrl: string;
  ratings: Ratings;
  record?: { rapid?: RecordWL; blitz?: RecordWL; bullet?: RecordWL };
  fetchedAt?: string;
};
type ChessComError = { error: true; status?: number; message?: string; body?: string };
type ChessComResponse = ChessComData | ChessComError;

const nf = new Intl.NumberFormat("fr-FR");

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function formatWhen(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const diff = Date.now() - d.getTime();
  const s = Math.floor(diff / 1000);
  if (s < 30) return "à l’instant";
  if (s < 90) return "il y a 1 min";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  return `il y a ${j} j`;
}

function RecordLine({ rec }: { rec: RecordWL | null | undefined }) {
  if (!rec) return <span className="text-xs text-slate-400">—</span>;
  const w = rec.win ?? 0;
  const l = rec.loss ?? 0;
  const d = rec.draw ?? 0;
  return (
    <span className="text-xs text-slate-400">{w} W / {l} L / {d} D</span>
  );
}

export default function ChessComCard() {
  const [data, setData] = useState<ChessComData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/chesscom", { signal: ctrl.signal, cache: "no-store" });
        const json: ChessComResponse = await res.json();
        if ("error" in json) {
          throw new Error(json.message || json.body || `Chess.com API error (${json.status ?? res.status})`);
        }
        setData(json);
      } catch (e) {
        if (!ctrl.signal.aborted) setErr(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => ctrl.abort();
  }, []);

  // Loading skeleton
  if (!data && !err) {
    return (
      <div className={cn("group relative rounded-3xl p-[1px]",
        "bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-sky-500/30")}
      >
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur p-6 sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-700/40" />
            <div className="h-4 w-28 animate-pulse rounded bg-slate-700/40" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-700/50" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 animate-pulse rounded bg-slate-700/40" />
              <div className="h-4 w-52 animate-pulse rounded bg-slate-700/30" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0,1,2].map(i => (
              <div key={i} className="rounded-2xl bg-slate-800/60 p-4">
                <div className="h-4 w-16 animate-pulse rounded bg-slate-700/40" />
                <div className="mt-2 h-8 w-24 animate-pulse rounded bg-slate-700/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (err) {
    return (
      <div className="rounded-3xl border border-rose-600/40 bg-rose-900/20 p-6 sm:p-7 text-rose-200" role="alert">
        <div className="mb-2 font-semibold">Erreur Chess.com</div>
        <div className="text-sm/6 text-rose-200/90">{err}</div>
      </div>
    );
  }

  const updated = formatWhen(data?.fetchedAt);

  return (
    <div className={cn("group relative rounded-3xl p-[1px]",
      "bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-sky-500/40",
      "motion-safe:transition-colors motion-safe:duration-500")}
    >
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur p-6 sm:p-7">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/chesscom_logo.png" alt="Chess.com" width={240} height={64} className="h-10 sm:h-12 w-auto" />
          </div>
          <span className="text-xs text-slate-400">MAJ {updated}</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          {data?.avatar ? (
            <Image src={data.avatar} alt={data.username ?? "Chess.com"} width={64} height={64} className="rounded-2xl border border-white/10 bg-slate-800/60" />
          ) : (
            <div className="h-16 w-16 rounded-2xl border border-white/10 bg-slate-800/60" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="truncate text-xl font-semibold text-white">{data?.username}</div>
              {data?.title ? (
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  {data.title}
                </span>
              ) : null}
              {data?.countryCode ? (
                <Image
                  src={countryFlagImage(data.countryCode)}
                  alt={data.countryCode}
                  width={18}
                  height={18}
                  className="h-4 w-4 rounded-full ring-1 ring-white/10"
                />
              ) : null}
            </div>
            {data?.profileUrl ? (
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-cyan-300 underline hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 rounded px-1"
              >
                Voir le profil
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
          <Kpi title="Rapid" value={data?.ratings.rapid ?? null} record={data?.record?.rapid} color="text-white" />
          <Kpi title="Blitz" value={data?.ratings.blitz ?? null} record={data?.record?.blitz} color="text-white" iconPath="/time-blitz.svg" />
          <Kpi title="Bullet" value={data?.ratings.bullet ?? null} record={data?.record?.bullet} color="text-white" iconPath="/time-bullet.svg" />
          {typeof data?.ratings.tactics === "number" ? (
            <Kpi title="Tactics" value={data?.ratings.tactics} record={null} color="text-white" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value, record, color, iconPath }: { title: string; value: number | null | undefined; record: RecordWL | null | undefined; color?: string; iconPath?: string }) {
  return (
    <div className="rounded-2xl bg-slate-800/60 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {iconPath ? (
          <Image src={iconPath} alt={title} width={18} height={18} className="h-4 w-4" />
        ) : (
          <Target className="h-4 w-4" aria-hidden />
        )}
        <span>{title}</span>
      </div>
      <div className={cn("mt-1 text-3xl font-extrabold", color || "text-white")}>{typeof value === "number" ? nf.format(value) : "—"}</div>
      <div className="mt-1"><RecordLine rec={record} /></div>
    </div>
  );
}

function countryFlagImage(code: string): string {
  const up = code.toUpperCase();
  if (up === "FR") return "/france.png";
  // fallback: emoji via data URL serait possible, mais on garde le même fichier pour FR
  return "/france.png";
}


