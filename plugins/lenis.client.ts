import Lenis from 'lenis';

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
