import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_HEADER = "s-maxage=1800, stale-while-revalidate=86400";

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJsonWithRetry(url: string) {
  let res: Response | null = null;
  for (let i = 0; i < 2; i++) {
    res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (process.env.NODE_ENV !== "production") {
      console.log(`[chesscom] GET ${url} -> ${res.status} (try ${i + 1}/2)`);
    }
    if (res.status < 500) break; // retry only 5xx
    await sleep(500);
  }

  if (!res) return { ok: false as const, status: 502, body: "no response" };

  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");

  if (!res.ok || !isJson) {
    const body = await res.text().catch(() => "");
    return { ok: false as const, status: res.status, body: body.slice(0, 500) };
  }

  const json = (await res.json()) as unknown;
  return { ok: true as const, json };
}

function extractCountryCode(profileCountryUrl?: string | null): string | null {
  if (!profileCountryUrl) return null;
  const parts = profileCountryUrl.split("/");
  const code = parts[parts.length - 1]?.toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : null;
}

export async function GET() {
  try {
    const base = process.env.CHESSCOM_BASE || "https://api.chess.com/pub";
    const username = process.env.CHESSCOM_USERNAME;

    if (!username) {
      return NextResponse.json(
        { error: true, status: 500, body: "CHESSCOM_USERNAME manquant côté serveur" },
        { status: 500, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    const profileUrl = joinUrl(base, `/player/${encodeURIComponent(username)}`);
    const statsUrl = joinUrl(base, `/player/${encodeURIComponent(username)}/stats`);

    const [profileRes, statsRes] = await Promise.all([
      fetchJsonWithRetry(profileUrl),
      fetchJsonWithRetry(statsUrl),
    ]);

    if (!profileRes.ok) {
      return NextResponse.json(
        { error: true, status: profileRes.status, message: "Chess.com profile fetch failed", body: profileRes.body },
        { status: 200, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }
    if (!statsRes.ok) {
      return NextResponse.json(
        { error: true, status: statsRes.status, message: "Chess.com stats fetch failed", body: statsRes.body },
        { status: 200, headers: { "Cache-Control": CACHE_HEADER } },
      );
    }

    const profile = profileRes.json as any;
    const stats = statsRes.json as any;

    const result = {
      username: profile?.username ?? null,
      name: profile?.name ?? null,
      avatar: profile?.avatar ?? null,
      title: profile?.title ?? null,
      countryCode: extractCountryCode(profile?.country) ?? null,
      profileUrl: profile?.username ? `https://www.chess.com/member/${encodeURIComponent(profile.username)}` : null,
      ratings: {
        rapid: stats?.chess_rapid?.last?.rating ?? null,
        blitz: stats?.chess_blitz?.last?.rating ?? null,
        bullet: stats?.chess_bullet?.last?.rating ?? null,
        tactics: stats?.tactics?.highest?.rating ?? stats?.tactics?.best?.rating ?? null,
      },
      record: {
        rapid: stats?.chess_rapid?.record ?? null,
        blitz: stats?.chess_blitz?.record ?? null,
        bullet: stats?.chess_bullet?.record ?? null,
      },
      fetchedAt: new Date().toISOString(),
    } as const;

    return NextResponse.json(result, { headers: { "Cache-Control": CACHE_HEADER } });
  } catch (error) {
    return NextResponse.json(
      { error: true, status: 500, message: "Chess.com API route exception", body: error instanceof Error ? error.message : String(error) },
      { status: 200, headers: { "Cache-Control": CACHE_HEADER } },
    );
  }
}


