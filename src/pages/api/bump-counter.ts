import type { APIContext } from "astro";


export async function GET(context :APIContext) {
  
  const quotesKV = context.locals.runtime.env.QUOTES;
  const counterRaw = await quotesKV.get(`counter-${context.clientAddress}`, { type: "text", cacheTtl: 365 * 24 * 3600 });
  const counter = Number(counterRaw ?? "0") + 1;
  await quotesKV.put(`counter-${context.clientAddress}`, counter.toString());

  return new Response(JSON.stringify(
    {
      from: context.clientAddress,
      time: new Date(Date.now()).toISOString(),
      counter
    }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}