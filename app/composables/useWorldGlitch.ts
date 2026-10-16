/**
 * Progressive "world glitch": while active, every frame re-randomizes the SVG
 * filters rendered by Nav.vue (#world-glitch-<target>) and the corruption
 * overlay variables used by main.css. Intensity ramps 10% → 100% the longer
 * the effect runs. Everything is visual only (filters + fixed pseudo-elements).
 */
export const WORLD_GLITCH_TARGETS = ['header', 'main', 'footer'] as const;

const RAMP_MS = 3500; // hover time needed to reach 100%
const FRAME_MS = 70;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Slices: values away from 0.5 push that band of the page sideways (R) or vertically (G).
const bandTable = (bins: number, chance: number, reach: number) =>
	Array.from({ length: bins }, () =>
		Math.random() < chance ? (0.5 + rand(-reach, reach)).toFixed(3) : '0.5',
	).join(' ');

const corruptionBlocks = (progress: number) => {
	const images: string[] = [];
	const sizes: string[] = [];
	const positions: string[] = [];
	const count = Math.round(3 + 16 * progress);

	for (let i = 0; i < count; i++) {
		const orange = Math.random() < 0.55;
		const alpha = orange ? rand(0.05, 0.12 + 0.3 * progress) : rand(0.03, 0.06 + 0.14 * progress);
		const color = orange ? `rgb(245 110 15 / ${alpha.toFixed(3)})` : `rgb(228 228 231 / ${alpha.toFixed(3)})`;

		images.push(`linear-gradient(${color}, ${color})`);
		sizes.push(`${rand(8, 40 + 60 * progress).toFixed(1)}% ${rand(0.2, 0.8 + 5 * progress).toFixed(2)}%`);
		positions.push(`${rand(0, 100).toFixed(1)}% ${rand(0, 100).toFixed(1)}%`);
	}

	return { images: images.join(','), sizes: sizes.join(','), positions: positions.join(',') };
};

export function useWorldGlitch() {
	let timer: ReturnType<typeof setInterval> | undefined;
	let startedAt = 0;
	let forceMax = false;

	const getProgress = () => {
		if (forceMax) return 1;
		const ratio = (performance.now() - startedAt) / RAMP_MS;
		return Math.min(1, Math.max(1, Math.ceil(ratio * 10)) / 10);
	};

	const updateFilter = (target: (typeof WORLD_GLITCH_TARGETS)[number], progress: number) => {
		const el = document.querySelector<HTMLElement>(`.App > ${target}`);
		const filter = document.getElementById(`world-glitch-${target}`);
		if (!el || !filter) return;

		// Limit the filter region to around the viewport so long pages stay cheap.
		const rect = el.getBoundingClientRect();
		const vh = window.innerHeight;
		const height = Math.max(rect.height, 1);
		const top = Math.max(-0.05, (-rect.top - vh * 0.5) / height);
		filter.setAttribute('y', top.toFixed(4));
		filter.setAttribute('height', ((vh * 2) / height + 0.05).toFixed(4));

		const set = (selector: string, attrs: Record<string, string | number>) => {
			const node = filter.querySelector(selector);
			if (!node) return;
			for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
		};

		set('feTurbulence', {
			seed: Math.floor(rand(1, 9999)),
			baseFrequency: `0 ${rand(0.004, 0.012 + 0.045 * progress).toFixed(4)}`,
		});
		set('feFuncR', { tableValues: bandTable(14, 0.15 + 0.6 * progress, 0.12 + 0.38 * progress) });
		set('feFuncG', {
			tableValues: bandTable(10, progress > 0.4 ? 0.12 * progress : 0, 0.03 + 0.05 * progress),
		});
		set('feDisplacementMap', { scale: (20 + 120 * progress).toFixed(1) });
		set('[result="orangeFringe"]', { dx: (-(1.5 + 10 * progress) * rand(0.5, 1)).toFixed(2) });
		set('[result="grayFringe"]', { dx: ((1 + 6 * progress) * rand(0.4, 1)).toFixed(2) });
	};

	const renderFrame = () => {
		const root = document.documentElement;
		const progress = getProgress();
		// Low levels flicker in and out; at 100% every frame is corrupted.
		const corrupted = Math.random() < 0.3 + 0.7 * progress;

		root.style.setProperty('--glitch-progress', String(progress));
		root.dataset.glitchLevel = String(Math.round(progress * 100));

		if (corrupted) {
			for (const target of WORLD_GLITCH_TARGETS) updateFilter(target, progress);

			const blocks = corruptionBlocks(progress);
			root.style.setProperty('--glitch-blocks', blocks.images);
			root.style.setProperty('--glitch-blocks-size', blocks.sizes);
			root.style.setProperty('--glitch-blocks-pos', blocks.positions);
			root.style.setProperty('--glitch-noise-pos', `${Math.round(rand(-180, 180))}px ${Math.round(rand(-180, 180))}px`);
		}

		root.classList.add('world-glitch');
		root.classList.toggle('world-glitch-frame', corrupted);
	};

	const start = (maxed = false) => {
		forceMax = forceMax || maxed;
		if (timer) return;

		startedAt = performance.now();
		renderFrame();
		timer = setInterval(renderFrame, FRAME_MS);
	};

	const stop = () => {
		if (timer) clearInterval(timer);
		timer = undefined;
		forceMax = false;

		const root = document.documentElement;
		root.classList.remove('world-glitch', 'world-glitch-frame');
		delete root.dataset.glitchLevel;
		for (const name of ['--glitch-progress', '--glitch-blocks', '--glitch-blocks-size', '--glitch-blocks-pos', '--glitch-noise-pos']) {
			root.style.removeProperty(name);
		}
	};

	return { start, stop };
}
