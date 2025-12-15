import type { APIContext } from "astro";
import { getQuote } from "../quote";

export async function GET(context :APIContext) {
  const t = Date.now();

  const quote = await getQuote(context, Number(context.params.id));
    
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