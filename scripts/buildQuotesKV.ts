/**
 * Transforms the "quotes.json" into a quotesKV.json file with key-value pairs suitable for Cloudflare KV.
 */
import fs from 'fs';

const quotes = JSON.parse(fs.readFileSync('scripts/quotes.json', 'utf-8'));
const kvList :Array<{key: string, value: string}> = [];

quotes.forEach((quote: { quoteText: string; quoteAuthor: string }, index: number) => {
  kvList.push({
    key: `quote-${String(index).padStart(5, '0')}`,
    value: JSON.stringify({text: quote.quoteText, author: quote.quoteAuthor})
  });
});

fs.writeFileSync('scripts/quotesKV.json', JSON.stringify(kvList, null, 2), 'utf-8');
console.log('quotesKV.json has been created with key-value pairs for Cloudflare KV.');