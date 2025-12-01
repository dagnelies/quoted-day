import type { APIContext } from "astro";

export const prerender = false;

export async function getQuote(context :APIContext)  : Promise<{ text: string; author: string }> {
  const randomIndex = Math.floor(5400 * Math.random());
  //const quoteRaw = await locals.runtime.env.QUOTES.get("quote-00003");
  const quoteRaw = await context.locals.runtime.env.QUOTES.get(`quote-${String(randomIndex).padStart(5, '0')}`) ?? '{}';
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