<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ArrowUpRight, Menu, X } from 'lucide-vue-next';
import { PROFILE, NAV_LINKS } from '../../data/portfolio';
import { useWorldGlitch, WORLD_GLITCH_TARGETS } from '../composables/useWorldGlitch';

const scrolled = ref(false);
const open = ref(false);
const mounted = ref(false);
const transitionPending = ref(false);

const otherWorldUrl = 'https://oddlyrinaldi.netlify.app/';
const transitDuration = ref(2800);
const glitch = useWorldGlitch();

const onScroll = () => {
	scrolled.value = window.scrollY > 40;
};

const prefersReducedMotion = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const startHoverGlitch = (event: PointerEvent) => {
	if (transitionPending.value || event.pointerType === 'touch' || prefersReducedMotion()) return;

	glitch.start();
};

const stopHoverGlitch = () => {
	if (!transitionPending.value) glitch.stop();
};

const navigateToOtherWorld = () => {
	if (transitionPending.value) return;

	transitionPending.value = true;
	open.value = false;

	if (prefersReducedMotion()) {
		transitDuration.value = 900;
	} else {
		glitch.start(true);
	}
};

const onTransitDone = () => {
	window.location.href = otherWorldUrl;
};

// Coming back through the browser's back/forward cache: reset the departure state.
const onPageShow = (event: PageTransitionEvent) => {
	if (!event.persisted) return;

	transitionPending.value = false;
	glitch.stop();
};

onMounted(() => {
	mounted.value = true;
	onScroll();
	window.addEventListener('scroll', onScroll);
	window.addEventListener('pageshow', onPageShow);
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll);
	window.removeEventListener('pageshow', onPageShow);
	glitch.stop();
});
</script>

<template>
	<header
		data-testid="nav-header"
		class="fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,padding] duration-500"
		:class="
			scrolled
				? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 py-4'
				: 'bg-transparent border-b border-transparent py-6'
		"
		:style="{
			transform: mounted ? 'translateY(0)' : 'translateY(-80px)',
			opacity: mounted ? 1 : 0,
			transition:
				'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
			transitionDelay: '0.2s',
		}"
	>
		<!--
			Glitch filters (one per page region), re-randomized every frame by useWorldGlitch:
			horizontal slice displacement + orange/gray chromatic aberration.
		-->
		<svg
			aria-hidden="true"
			focusable="false"
			width="0"
			height="0"
			class="pointer-events-none absolute"
		>
			<defs>
				<filter
					v-for="target in WORLD_GLITCH_TARGETS"
					:id="`world-glitch-${target}`"
					:key="target"
					x="-0.03"
					y="0"
					width="1.06"
					height="1"
					color-interpolation-filters="sRGB"
				>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0 0.02"
						numOctaves="1"
						seed="1"
					/>
					<feColorMatrix
						type="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1"
					/>
					<feComponentTransfer result="map">
						<feFuncR type="discrete" tableValues="0.5" />
						<feFuncG type="discrete" tableValues="0.5" />
					</feComponentTransfer>
					<feDisplacementMap
						in="SourceGraphic"
						in2="map"
						scale="0"
						xChannelSelector="R"
						yChannelSelector="G"
						result="sliced"
					/>
					<feColorMatrix
						in="sliced"
						type="matrix"
						values="0.287 0.566 0.106 0 0  0.129 0.254 0.047 0 0  0.018 0.035 0.007 0 0  0 0 0 0.85 0"
					/>
					<feOffset dx="0" result="orangeFringe" />
					<feColorMatrix
						in="sliced"
						type="matrix"
						values="0.224 0.44 0.083 0 0  0.224 0.44 0.083 0 0  0.224 0.44 0.083 0 0  0 0 0 0.5 0"
					/>
					<feOffset dx="0" result="grayFringe" />
					<feBlend in="sliced" in2="orangeFringe" mode="screen" result="split" />
					<feBlend in="split" in2="grayFringe" mode="screen" />
				</filter>
			</defs>
		</svg>

		<WorldTransitScreen
			:active="transitionPending"
			:duration="transitDuration"
			@done="onTransitDone"
		/>

		<div
			class="max-w-350 mx-auto px-6 md:px-12 flex items-center justify-between"
		>
			<!-- Brand -->
			<a
				href="#home"
				data-testid="nav-brand"
				class="inline-flex items-center justify-center"
			>
				<img
					:src="PROFILE.brandLogo"
					:alt="`${PROFILE.name} brand signature`"
					class="h-25 w-auto object-contain md:h-16"
				/>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-3 lg:gap-8 xl:gap-10">
				<a
					v-for="link in NAV_LINKS"
					:key="link.label"
					:href="link.href"
					:data-testid="`nav-link-${link.label.toLowerCase()}`"
					class="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-[#f56e0f] transition-colors duration-300"
				>
					{{ link.label }}
				</a>
				<a
					href="https://oddlyrinaldi.pages.dev/"
					data-testid="nav-world-link"
					class="world-hop-link"
					@pointerenter="startHoverGlitch"
					@pointerleave="stopHoverGlitch"
					@click.prevent="navigateToOtherWorld"
				>
					Move to another world?
				</a>
			</nav>

			<!-- Right -->
			<div class="flex items-center gap-3">
				<!-- Resume -->
				<a
					:href="PROFILE.resume"
					data-testid="nav-resume-btn"
					class="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 bg-[#f56e0f] text-black font-bold text-sm hover:bg-white transition-colors duration-300"
				>
					Resume
					<ArrowUpRight :size="16" :stroke-width="2.5" />
				</a>

				<!-- Mobile -->
				<button
					type="button"
					data-testid="nav-mobile-toggle"
					@click="open = !open"
					class="md:hidden text-white p-2"
					aria-label="Toggle menu"
				>
					<X v-if="open" :size="22" />
					<Menu v-else :size="22" />
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		<Transition
			enter-active-class="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
			enter-from-class="max-h-0 opacity-0"
			enter-to-class="max-h-[500px] opacity-100"
			leave-active-class="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
			leave-from-class="max-h-[500px] opacity-100"
			leave-to-class="max-h-0 opacity-0"
		>
			<nav
				v-if="open"
				data-testid="nav-mobile-menu"
				class="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/5 mt-4"
			>
				<div class="px-6 py-6 flex flex-col gap-5">
					<a
						v-for="link in NAV_LINKS"
						:key="link.label"
						:href="link.href"
						@click="open = false"
						class="font-heading text-2xl text-zinc-300 hover:text-[#f56e0f] transition-colors"
					>
						{{ link.label }}
					</a>

					<a
						:href="PROFILE.resume"
						class="mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 bg-[#f56e0f] text-black font-medium"
					>
						Resume
						<ArrowUpRight :size="16" />
					</a>

					<a
						href="https://oddlyrinaldi.pages.dev/"
						data-testid="nav-world-link-mobile"
						class="world-hop-link mt-2 w-fit px-4 py-3"
						@pointerenter="startHoverGlitch"
						@pointerleave="stopHoverGlitch"
						@click.prevent="navigateToOtherWorld"
					>
						Move to another world?
					</a>
				</div>
			</nav>
		</Transition>
	</header>
</template>
