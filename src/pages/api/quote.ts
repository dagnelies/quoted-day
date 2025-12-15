import type { APIContext } from "astro";

export async function getQuote(context :APIContext, num?: number)  : Promise<{ text: string; author: string }> {
  const randomIndex = num ?? Math.floor(5420 * Math.random());
  const quotesKV = context.locals.runtime.env.QUOTES;
  const quoteRaw = await quotesKV.getWithMetadata(`quote-${String(randomIndex).padStart(5, '0')}`, {
    cacheTtl: 86400, // cache it for a day by default
  });
  const quote = JSON.parse(quoteRaw);
  return quote;
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