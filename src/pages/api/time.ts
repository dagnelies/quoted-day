import type { APIContext } from "astro";


export async function GET() {    
  return new Response(JSON.stringify(
    {
      time: new Date(Date.now()).toISOString(),
    }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}