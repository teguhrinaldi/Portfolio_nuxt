<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ArrowDownRight } from 'lucide-vue-next';
import { PROFILE } from '../../data/portfolio';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

const sectionRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);
const reduce = ref(false);
const mounted = ref(false);

const portraitY = computed(() => {
	return reduce.value ? 0 : scrollProgress.value * 160;
});

const portraitScale = computed(() => {
	return reduce.value ? 1 : 1 + scrollProgress.value * 0.08;
});

const textY = computed(() => {
	return reduce.value ? 0 : scrollProgress.value * -60;
});

const portraitStyle = computed(() => ({
	transform: `translateY(${portraitY.value}px) scale(${portraitScale.value})`,
}));

const textStyle = computed(() => ({
	transform: `translateY(${textY.value}px)`,
}));

const onScroll = () => {
	if (!sectionRef.value) return;

	const rect = sectionRef.value.getBoundingClientRect();
	const height = sectionRef.value.offsetHeight;

	const progress = -rect.top / height;

	scrollProgress.value = Math.max(0, Math.min(1, progress));
};

onMounted(() => {
	mounted.value = true;

	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

	reduce.value = mediaQuery.matches;

	const onMotionChange = (event: MediaQueryListEvent) => {
		reduce.value = event.matches;
	};

	mediaQuery.addEventListener('change', onMotionChange);
	window.addEventListener('scroll', onScroll, { passive: true });

	onScroll();

	onBeforeUnmount(() => {
		mediaQuery.removeEventListener('change', onMotionChange);
	});
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll);
});
</script>

<template>
	<section
		id="home"
		ref="sectionRef"
		data-testid="hero-section"
		class="relative min-h-[100svh] w-full overflow-hidden hero-glow flex flex-col justify-end"
	>
		<!-- Portrait -->
		<div
			class="absolute inset-x-0 bottom-0 z-10 flex justify-center pointer-events-none"
			:style="portraitStyle"
		>
			<img
				:src="PROFILE.portrait"
				:alt="`${PROFILE.name}, ${PROFILE.role}`"
				class="h-[62vh] md:h-[78vh] lg:h-[86vh] w-auto object-contain object-bottom select-none"
				draggable="false"
				:style="{
					opacity: mounted ? 1 : 0,
					transform: mounted ? 'scale(1)' : 'scale(1.05)',
					transition: `opacity 1.4s ${EASE}, transform 1.4s ${EASE}`,
					transitionDelay: '0.35s',
				}"
			/>
		</div>

		<!-- Big type -->
		<div
			class="relative z-20 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-[6vh]"
			:style="textStyle"
		>
			<div
				class="font-heading font-medium uppercase leading-[0.82] tracking-tighter text-white text-[19vw] md:text-[16vw] lg:text-[14vw] mix-blend-difference"
			>
				<!-- First name -->
				<span class="block overflow-hidden">
					<span
						class="block"
						:style="{
							transform: mounted ? 'translateY(0%)' : 'translateY(110%)',
							transition: `transform 1.1s ${EASE}`,
							transitionDelay: '0.35s',
						}"
					>
						{{ PROFILE.firstName }}
					</span>
				</span>

				<!-- Last name -->
				<span class="block overflow-hidden">
					<span
						class="block text-outline"
						:style="{
							transform: mounted ? 'translateY(0%)' : 'translateY(110%)',
							transition: `transform 1.1s ${EASE}`,
							transitionDelay: '0.5s',
						}"
					>
						{{ PROFILE.lastName }}
					</span>
				</span>
			</div>
		</div>

		<!-- Top meta row -->
		<div class="absolute top-[16vh] md:top-[20vh] left-0 w-full z-20">
			<div
				class="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-start gap-8"
			>
				<!-- Tagline -->
				<p
					class="font-body font-light text-sm md:text-base leading-relaxed text-zinc-400 max-w-xs"
					:style="{
						opacity: mounted ? 1 : 0,
						transform: mounted ? 'translateY(0)' : 'translateY(20px)',
						transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
						transitionDelay: '0.9s',
					}"
				>
					{{ PROFILE.tagline }}
				</p>

				<!-- Available -->
				<div
					class="hidden md:block text-right"
					:style="{
						opacity: mounted ? 1 : 0,
						transition: 'opacity 1s ease',
						transitionDelay: '1.1s',
					}"
				>
					<span
						class="font-mono text-xs uppercase tracking-[0.2em] text-[#f56e0f]"
					>
						● Available for work
					</span>
				</div>
			</div>
		</div>

		<!-- Scroll cue -->
		<a
			href="#about"
			data-testid="hero-scroll-cue"
			class="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 hover:text-white transition-colors"
			:style="{
				opacity: mounted ? 1 : 0,
				transition: 'opacity 1s ease',
				transitionDelay: '1.3s',
			}"
		>
			Scroll
			<ArrowDownRight :size="16" />
		</a>
	</section>
</template>
