import Lenis from 'lenis';
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {
	const lenis = new Lenis({
		lerp: 0.09,
		smoothWheel: true,
		anchors: true,
	});

	const raf = (time: number) => {
		lenis.raf(time);
		requestAnimationFrame(raf);
	};

	requestAnimationFrame(raf);

	return {
		provide: {
			lenis,
		},
	};
});
