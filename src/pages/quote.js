
export const prerender = false;

export async function GET({ locals, params }) {
  const quotes = [
      "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
      "In the middle of every difficulty lies opportunity. - Albert Einstein",
      "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote1 = quotes[randomIndex];

  const quote2 = await locals.runtime.env.QUOTES?.get("quote-00003");


  return new Response(JSON.stringify(
    {
      quote1,
      quote2
    }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}