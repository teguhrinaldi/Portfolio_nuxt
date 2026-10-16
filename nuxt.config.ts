import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	devtools: {
		enabled: true,
	},

	app: {
		head: {
			title: 'Teguh Rinaldi',
			link: [
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicon.ico',
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com',
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: 'anonymous',
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
				},
			],
		},
	},

	css: ['~/assets/css/main.css'],

	// Static output for Cloudflare (Pages or Workers static assets): `nuxt generate`
	// writes the site to ./dist together with _headers/_redirects.
	nitro: {
		preset: 'cloudflare-pages-static',
	},

	routeRules: {
		// Hashed build assets never change, so they can be cached forever.
		'/_nuxt/**': {
			headers: { 'cache-control': 'public, max-age=31536000, immutable' },
		},
	},

	vite: {
		plugins: [tailwindcss()],
	},
});
