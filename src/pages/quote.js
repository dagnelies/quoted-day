
export const prerender = false;

export async function GET({ locals, params }) {
  const t = Date.now();

  const randomIndex = Math.floor(5400 * Math.random());
  //const quoteRaw = await locals.runtime.env.QUOTES.get("quote-00003");
  const quoteRaw = await locals.runtime.env.QUOTES.get(`quote-${String(randomIndex).padStart(5, '0')}`);
  const quote = JSON.parse(quoteRaw);
    

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