const res = await fetch('/api/quote');
const data = await res.json();

console.log(data);

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');

quoteEl.textContent = data.text;
authorEl.textContent = `— ${data.author}`;