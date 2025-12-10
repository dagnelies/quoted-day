/**
 * Transforms the "quotes.json" into a quotesKV.json file with key-value pairs suitable for Cloudflare KV.
 */
import fs from 'fs';

const quotes = JSON.parse(fs.readFileSync('src/scripts/quotes.json', 'utf-8'));
const kvEntries: Record<string, string> = {};

quotes.forEach((quote: { quoteText: string; quoteAuthor: string }, index: number) => {
  const key = `quote-${String(index).padStart(5, '0')}`;
  kvEntries[key] = JSON.stringify({ text: quote.quoteText, author: quote.quoteAuthor });
});

fs.writeFileSync('src/scripts/quotesKV.json', JSON.stringify(kvEntries, null, 2), 'utf-8');
console.log('quotesKV.json has been created with key-value pairs for Cloudflare KV.');