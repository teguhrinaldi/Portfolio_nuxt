<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { STATS } from '../../data/portfolio';

const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const counters = ref<number[]>(STATS.map(() => 0));

let observer: IntersectionObserver | null = null;
let animationFrame: number | null = null;

const animateCounters = () => {
	const start = performance.now();
	const duration = 1600;

	const targets = STATS.map((s) => parseInt(s.value, 10));

	const tick = (time: number) => {
		const progress = Math.min((time - start) / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);

		counters.value = targets.map((target) => Math.round(eased * target));

		if (progress < 1) {
			animationFrame = requestAnimationFrame(tick);
		}
	};

	animationFrame = requestAnimationFrame(tick);
};

onMounted(() => {
	if (!sectionRef.value) return;

	observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				visible.value = true;
				animateCounters();
				observer?.disconnect();
			}
		},
		{
			rootMargin: '-60px',
			threshold: 0.1,
		},
	);

	observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
	observer?.disconnect();

	if (animationFrame !== null) {
		cancelAnimationFrame(animationFrame);
	}
});
</script>

<template>
	<section
		ref="sectionRef"
		data-testid="stats-section"
		class="relative z-20 bg-[#0a0a0a] border-y border-zinc-900"
	>
		<div
			class="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-900"
		>
			<div
				v-for="(stat, i) in STATS"
				:key="stat.label"
				:data-testid="`stat-${i}`"
				class="py-14 md:py-20 md:px-10 first:md:pl-0 last:md:pr-0"
				:class="visible ? 'stats-reveal' : 'stats-hidden'"
				:style="{ '--delay': `${i * 0.12}s` }"
			>
				<div
					class="font-heading text-6xl md:text-7xl lg:text-8xl font-medium text-[#f56e0f] tracking-tighter"
				>
					{{ counters[i] }}{{ stat.value.replace(/[0-9]/g, '') }}
				</div>

				<p
					class="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
				>
					{{ stat.label }}
				</p>
			</div>
		</div>
	</section>
</template>
