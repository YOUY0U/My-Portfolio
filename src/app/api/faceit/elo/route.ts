import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface FaceitPlayerResponse {
  player_id?: string;
  country?: string;
  games?: Record<string, { faceit_elo?: number; skill_level?: number } | undefined>;
}

// Cache mémoire simple 5 minutes pour limiter le rate-limit
const memoryCache = new Map<string, { ts: number; data: { elo: number | null; level: number | null; game: string; country: string | null; rank: number | null } }>();
const FIVE_MIN = 5 * 60 * 1000;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get("nickname") ?? "TSARUIS63";

    const apiKey = process.env.FACEIT_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { elo: null, level: null, game: "cs2", error: "FACEIT_API_KEY manquant côté serveur" },
        { status: 200 },
      );
    }

    const cacheKey = `cs2:${nickname.toLowerCase()}`;
    const cached = memoryCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.ts < FIVE_MIN) {
      return NextResponse.json(cached.data);
    }

    const url = `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}&game=cs2`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { elo: null, level: null, game: "cs2", error: `Erreur API FACEIT: ${res.status}` },
        { status: 200 },
      );
    }

    const data = (await res.json()) as FaceitPlayerResponse;
    const cs2 = data.games?.cs2 ?? data.games?.csgo;
    const elo = cs2?.faceit_elo ?? null;
    const level = cs2?.skill_level ?? null;
    const game = data.games?.cs2 ? "cs2" : "csgo";

    // Pays et ranking
    const country = data.country ?? null;
    const playerId = data.player_id;
    let rank: number | null = null;

    if (playerId) {
      // Déduction naïve de la région à partir du pays (fallback EU)
      const region = (() => {
        const c = (country ?? "").toUpperCase();
        // Jeux FACEIT: EU, NA, SA, AS, OCE, AF
        const EU = ["FR", "DE", "ES", "IT", "GB", "UK", "PL", "SE", "NO", "FI", "NL", "BE", "PT", "RO", "CZ", "SK", "HU", "AT", "CH", "IE", "DK", "GR", "BG", "HR", "SI", "EE", "LV", "LT" ];
        const NA = ["US", "CA", "MX"]; // simplifié
        if (EU.includes(c)) return "EU";
        if (NA.includes(c)) return "NA";
        return "EU";
      })();

      try {
        // Rang national prioritaire si le pays est connu
        const countryParam = country ? `&country=${country}` : "";
        const rankingUrl = `https://open.faceit.com/data/v4/rankings/games/cs2/regions/${region}/players/${playerId}?offset=0&limit=1${countryParam}`;
        const r = await fetch(rankingUrl, {
          headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
          cache: "no-store",
        });
        if (r.ok) {
          const jr = await r.json();
          // selon les versions, la position peut être sous 'position', 'rank' ou dans 'items[0]'
          rank = jr.position ?? jr.rank ?? jr?.items?.[0]?.position ?? jr?.items?.[0]?.rank ?? null;
        }
      } catch {
        // ignorer les erreurs de ranking
      }
    }

    const result = { elo, level, game, country, rank } as const;
    memoryCache.set(cacheKey, { ts: now, data: { ...result } });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { elo: null, level: null, game: "cs2", error: "Exception côté serveur" },
      { status: 200 },
    );
  }
}


