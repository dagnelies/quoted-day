import { type APIContext } from "astro";


export async function GET(context :APIContext) {
  
  const quotesKV = context.locals.runtime.env.QUOTES;

  // read session id from cookie
  let sessionId = context.cookies.get("session_id")?.value;
  let counter = 0;

  if (!sessionId) {
    // if no session id, create one
    sessionId = await crypto.randomUUID();
    context.cookies.set("session_id", sessionId, {maxAge: 600}); // 10 Minutes cookie
  }
  else {
    const counterRaw = await quotesKV.get(`sessions/${sessionId}`, { type: "text" });
    counter = Number(counterRaw);
  }
  
  counter += 1;
  await quotesKV.put(`sessions/${sessionId}`, counter.toString(), {expirationTtl: 600 }); // 10 Minutes session cache

  return new Response(JSON.stringify(
    {
      pseudo_session: `${sessionId.substring(0, 8)}...`,
      time: new Date(Date.now()).toISOString(),
      counter
    }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}