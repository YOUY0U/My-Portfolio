import { NextResponse } from "next/server";
/**
 * Test local rapide:
 * curl -i http://localhost:3000/api/rootme
 */

export const dynamic = "force-dynamic";

const CACHE_HEADER = "s-maxage=1800, stale-while-revalidate=86400";

function joinUrl(base: string, path: string) {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET() {
  try {
    const id = process.env.ROOTME_AUTHOR_ID;
    const apiKey = process.env.ROOTME_API_KEY;
    const base = process.env.ROOTME_BASE ?? "https://api.www.root-me.org";

    if (!id || !apiKey) {
      return NextResponse.json(
        { error: "Variables d'environnement ROOTME_AUTHOR_ID ou ROOTME_API_KEY manquantes", status: 500 },
        { status: 500, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    const url = joinUrl(base, `/auteurs/${encodeURIComponent(id)}`);

    // 2 tentatives avec 500 ms d'intervalle si status >= 500
    let res: Response | null = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      res = await fetch(url, {
        headers: {
          Accept: "application/json",
          // Auth demandée via cookie api_key
          Cookie: `api_key=${apiKey}`,
        },
        cache: "no-store",
      });
      if (process.env.NODE_ENV !== "production") {
        // Log minimal pour debug en dev
        console.log(`[rootme] GET ${url} -> ${res.status} (try ${attempt + 1}/2)`);
      }
      if (res.status < 500) break;
      await sleep(500);
    }

    if (!res) {
      return NextResponse.json(
        { error: "Aucune réponse Root-Me", status: 502 },
        { status: 502, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Erreur API Root-Me", status: res.status, body: bodyText.slice(0, 500) },
        { status: res.status, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    if (!isJson) {
      const bodyText = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Réponse non-JSON de Root-Me", status: 502, body: bodyText.slice(0, 500) },
        { status: 502, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    type RootMeAuthor = {
      nom?: string | null;
      score?: unknown;
      position?: unknown;
      challenges?: unknown;
      avatar?: string | null;
    };

    const data = (await res.json()) as unknown as RootMeAuthor;

    const toNumber = (v: unknown): number | null => {
      if (v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const normalized = {
      login: data?.nom ?? null,
      score: toNumber(data?.score),
      rank: toNumber(data?.position),
      solved: Array.isArray(data?.challenges as unknown[]) ? (data?.challenges as unknown[]).length : null,
      avatar: data?.avatar ?? null,
      profileUrl: data?.nom ? `https://www.root-me.org/${encodeURIComponent(String(data.nom))}` : null,
      fetchedAt: new Date().toISOString(),
    } as const;

    return NextResponse.json(normalized, { headers: { "Cache-Control": CACHE_HEADER } });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur Root-Me", status: 500, body: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: { "Cache-Control": CACHE_HEADER } },
    );
  }
}


