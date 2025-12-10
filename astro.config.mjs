// @ts-check
import { defineConfig } from "astro/config";
//import mdx from "@astrojs/mdx";
//import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://quoted.day",
	output: "server", // activates server side rendering by default
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),
	i18n: {
		defaultLocale: "en",
		locales: ["de", "en", "fr"]
	},
});
