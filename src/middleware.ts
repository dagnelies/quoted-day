import type { APIContext } from "astro";

export async function onRequest(context :APIContext, next :() => Promise<Response>) {
  const lang = context.preferredLocale || 'en';
  console.log(`Serving SSR page in locale: ${lang}`);

  const translations = await import(`./i18n/${lang}.json`);
  const $t = (key: string) => {
    return translations[key] ?? `???${key}???`;
  }

  context.locals.lang = lang;
  context.locals.$t = $t;
  
  return next();
}

