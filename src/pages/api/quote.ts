import type { APIContext } from "astro";

export async function getQuote(context :APIContext, num?: number)  : Promise<{ text: string; author: string }> {
  const randomIndex = num ?? Math.floor(5420 * Math.random());
  const quotesKV = context.locals.runtime.env.QUOTES;
  const quote = await quotesKV.get(`quote-${String(randomIndex).padStart(5, '0')}`, { type: "json", cacheTtl: 365 * 24 * 3600 });
  return quote as { text: string; author: string };
}

export async function GET(context :APIContext) {
  const t = Date.now();

  const quote = await getQuote(context);
    
  return new Response(JSON.stringify(
    {
      ...quote,
      elapsedServerTime: Date.now() - t,
    }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}