<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ArrowUpRight, Menu, X } from 'lucide-vue-next';
import { PROFILE, NAV_LINKS } from '../../data/portfolio';

const scrolled = ref(false);
const open = ref(false);
const mounted = ref(false);

const onScroll = () => {
	scrolled.value = window.scrollY > 40;
};

onMounted(() => {
	mounted.value = true;
	onScroll();
	window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll);
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
		<div
			class="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
		>
			<!-- Brand -->
			<a
				href="#home"
				data-testid="nav-brand"
				class="font-heading text-2xl font-semibold tracking-tight text-white"
			>
				{{ PROFILE.brand }}
				<span class="text-[#f56e0f]">.</span>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center gap-10">
				<a
					v-for="link in NAV_LINKS"
					:key="link.label"
					:href="link.href"
					:data-testid="`nav-link-${link.label.toLowerCase()}`"
					class="font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors duration-300"
				>
					{{ link.label }}
				</a>
			</nav>

			<!-- Right -->
			<div class="flex items-center gap-3">
				<!-- Resume -->
				<a
					:href="PROFILE.resume"
					data-testid="nav-resume-btn"
					class="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 bg-[#f56e0f] text-black font-medium text-sm hover:bg-white transition-colors duration-300"
				>
					Resume
					<ArrowUpRight :size="16" :stroke-width="2.5" />
				</a>

				<!-- Mobile -->
				<button
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
				</div>
			</nav>
		</Transition>
	</header>
</template>
