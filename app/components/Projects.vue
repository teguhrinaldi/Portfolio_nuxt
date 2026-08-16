<script setup lang="ts">
import { motion } from 'motion-v';
import { ArrowUpRight } from 'lucide-vue-next';
import { PROJECTS } from '../../data/portfolio';

const EASE = [0.16, 1, 0.3, 1];

const activeImage = ref<Record<string, number>>({});

const getActiveIndex = (id: string) => {
	return activeImage.value[id] ?? 0;
};

const getNextIndex = (id: string, total: number) => {
	const current = getActiveIndex(id);
	return (current + 1) % total;
};

const swapImage = (id: string, total: number) => {
	if (total <= 1) return;

	activeImage.value = {
		...activeImage.value,
		[id]: getNextIndex(id, total),
	};
};
</script>

<template>
	<section
		id="work"
		data-testid="projects-section"
		class="relative z-20 bg-[#050505] py-24 md:py-32 lg:py-40"
	>
		<div class="max-w-[1400px] mx-auto px-6 md:px-12">
			<!-- HEADER -->
			<div
				class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
			>
				<div>
					<motion.p
						:initial="{ opacity: 0, y: 20 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:viewport="{ once: true }"
						:transition="{ duration: 0.6, ease: EASE }"
						class="font-mono text-xs uppercase tracking-[0.25em] text-[#f56e0f] mb-6"
					>
						( 02 ) — Selected Work
					</motion.p>

					<motion.h2
						:initial="{ opacity: 0, y: 30 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:viewport="{ once: true }"
						:transition="{
							duration: 0.8,
							ease: EASE,
							delay: 0.1,
						}"
						class="font-heading text-5xl md:text-7xl uppercase tracking-tighter text-white leading-[0.9]"
					>
						Projects
					</motion.h2>
				</div>

				<p
					class="font-body font-light text-zinc-500 max-w-xs text-sm md:text-right"
				>
					A curated selection of interfaces, products and experiments built over
					the years.
				</p>
			</div>

			<!-- PROJECT GRID -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-20">
				<motion.a
					v-for="(p, i) in PROJECTS"
					:key="p.id"
					href="#"
					:data-testid="`project-${p.id}`"
					:initial="{ opacity: 0, y: 50 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:viewport="{
						once: true,
						margin: '-60px',
					}"
					:transition="{
						duration: 0.8,
						ease: EASE,
						delay: (i % 2) * 0.1,
					}"
					:class="['group relative block', p.span]"
					@click.prevent="
						p.images?.length > 1 && swapImage(p.id, p.images.length)
					"
				>
					<!-- IMAGE STACK -->
					<div class="relative w-full aspect-[16/11] overflow-visible">
						<!-- BACK IMAGE -->
						<div
							v-if="p.images?.length > 1"
							class="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-out group-hover:translate-x-[26px] group-hover:translate-y-[26px]"
							:style="{
								transform: 'translate(18px, 18px) scale(0.95)',
							}"
						>
							<img
								:src="p.images[getNextIndex(p.id, p.images.length)]"
								:alt="`${p.title} alternate view`"
								class="w-full h-full object-cover rounded-[24px] border border-white/10 bg-[#111] opacity-55"
							/>

							<div class="absolute inset-0 rounded-[24px] bg-black/25" />
						</div>

						<!-- FRONT IMAGE -->
						<div
							v-if="p.images?.length"
							class="absolute inset-0 z-10 cursor-pointer"
						>
							<img
								:src="p.images[getActiveIndex(p.id)]"
								:alt="p.title"
								loading="lazy"
								class="w-full h-full object-cover rounded-[24px] border border-white/10 bg-[#0f0f0f] transition-all duration-700 ease-out group-hover:scale-[1.015]"
							/>

							<!-- GRADIENT -->
							<div
								class="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none"
							/>

							<!-- ARROW -->
							<div
								class="absolute top-4 right-4 h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-[#f56e0f] group-hover:border-[#f56e0f] group-hover:text-black transition-all duration-500"
							>
								<ArrowUpRight :size="18" />
							</div>

							<!-- YEAR -->
							<span
								class="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300"
							>
								{{ p.year }}
							</span>
						</div>
					</div>

					<!-- PROJECT INFO -->
					<div class="mt-7 flex items-baseline justify-between gap-6">
						<h3
							class="font-heading text-2xl md:text-3xl text-white tracking-tight group-hover:text-[#f56e0f] transition-colors duration-300"
						>
							{{ p.title }}
						</h3>

						<span
							class="font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-zinc-500 text-right"
						>
							{{ p.category }}
						</span>
					</div>
				</motion.a>
			</div>
		</div>
	</section>
</template>
