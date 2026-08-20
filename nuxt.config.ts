import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',

	devtools: {
		enabled: true,
	},

	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
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
			],
		},
	},
});
