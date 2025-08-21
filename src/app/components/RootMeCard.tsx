"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Trophy, BookCheck } from "lucide-react";

type RootMeData = {
  login: string;
  score: number | null;
  rank: number | null;
  solvedCount: number;
  avatar: string | null;
  categories: string[];
  profileUrl: string;
  fetchedAt: string; // ISO date
  error?: string;
};

export default function RootMeCard() {
  const [data, setData] = useState<RootMeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async function run() {
      try {
        const res = await fetch("/api/rootme", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Erreur API (${res.status})`);
        }
        const json = (await res.json()) as Partial<RootMeData> & { error?: string };
        if (!cancelled) {
          if (typeof json.error === "string" && json.error.length > 0) {
            setError(json.error);
          } else {
            // Normalisation minimale pour satisfaire le typage strict
            setData({
              login: json.login ?? "",
              score: json.score ?? null,
              rank: json.rank ?? null,
              solvedCount: typeof json.solvedCount === "number" ? json.solvedCount : 0,
              avatar: json.avatar ?? null,
              categories: Array.isArray(json.categories) ? json.categories : [],
              profileUrl: json.profileUrl ?? "#",
              fetchedAt: json.fetchedAt ?? new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="text-center w-full max-w-[768px]">
        <div className="mb-6 flex items-center justify-center gap-4">
          <Image src="/root-me-seeklogo.svg" alt="Root-Me" width={96} height={96} />
          <h3 className="text-2xl font-bold text-cyan-400 m-0">Root-Me</h3>
        </div>
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6 text-red-300">
          Problème lors de la récupération des données Root-Me: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    // Skeleton
    return (
      <div className="text-center w-full max-w-[768px]">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-24 w-24 animate-pulse rounded-lg bg-slate-700/60" />
          <div className="h-8 w-48 animate-pulse rounded bg-slate-700/60" />
        </div>
        <div className="rounded-lg bg-slate-700/30 p-6">
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-4">
            <div className="h-5 w-full animate-pulse rounded bg-slate-700/60" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-700/60" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-700/60" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-700/60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center w-full max-w-[768px]">
      <div className="mb-6 flex items-center justify-center gap-4">
        <Image src="/root-me-seeklogo.svg" alt="Root-Me" width={96} height={96} />
        <h3 className="text-2xl font-bold text-cyan-400 m-0">Root-Me</h3>
      </div>
      <div className="transition-all duration-300 hover:scale-105 w-full">
        <div className="mx-auto max-w-2xl rounded-lg border border-slate-700 bg-slate-800/60 p-6 shadow-lg">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Image
              src={data.avatar ?? "/rootme-pp.png"}
              alt={data.login || "Root-Me"}
              width={96}
              height={96}
              className="rounded-lg shadow-sm"
            />
            <div className="text-left">
              <div className="grid grid-cols-2 gap-6 text-slate-300">
                <div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <BookCheck className="h-4 w-4" aria-hidden />
                    <span>Score</span>
                  </div>
                  <div className="mt-1 text-4xl font-extrabold text-white">
                    {typeof data.score === "number" ? new Intl.NumberFormat("fr-FR").format(data.score) : "—"}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Trophy className="h-4 w-4 text-amber-400" aria-hidden />
                    <span>Rang</span>
                  </div>
                  <div className="mt-1 text-4xl font-extrabold text-white">
                    {typeof data.rank === "number" ? `#${new Intl.NumberFormat("fr-FR").format(data.rank)}` : "—"}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={data.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Voir le profil Root-Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


