<script setup lang="ts">
import { motion } from 'motion-v';
import { ArrowUpRight, Pause, Play } from 'lucide-vue-next';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const products = [
	{
		id: 'arcana',
		title: 'ARCANA — Architecture Studio Website Template Nextjs',
		url: 'https://arcana-architecture.netlify.app/',
		video: new URL(
			'../assets/images/Product/arcana/demo-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'atelier',
		title: 'ATELIER — Editorial Fashion House Template Nextjs',
		url: 'https://atelier-fashionhouse.netlify.app/',
		video: new URL(
			'../assets/images/Product/atelier/atelier-demo-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'azura',
		title: 'AZURA — Cinematic Resort & Hotel website template Nextjs',
		url: 'https://azura-hotel.netlify.app/',
		video: new URL(
			'../assets/images/Product/azura/demo-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'estatex',
		title: 'ESTATEX — Editorial Luxury Real Estate Template',
		url: 'https://estatex-realestate.netlify.app/',
		video: new URL(
			'../assets/images/Product/estatex/demo-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'forge',
		title: 'FORGE — Performance Training Studio Template NextJs',
		url: 'https://forge-muscle.netlify.app/',
		video: new URL(
			'../assets/images/Product/forge/forge-demo-1920x1080-60fps.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'lumora',
		title: 'LUMORA — Interactive Grooming Studio Template',
		url: 'https://lumora-grooming.netlify.app/',
		video: new URL(
			'../assets/images/Product/lumora/lumora-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'neural',
		title: 'Neural — SaaS Project & Team Operations Frontend',
		url: 'https://neural-dashboardproject.netlify.app/dashboard',
		video: new URL(
			'../assets/images/Product/neural/projectly-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'nexora',
		title: 'NEXORA — AI SaaS Dashboard Template',
		url: 'https://nexora-dashboardsaas.netlify.app/',
		video: new URL(
			'../assets/images/Product/nexora/nexora-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'noire',
		title: 'NOIRÉ — Editorial Fine-Dining Restaurant Template',
		url: 'https://noire-dining.netlify.app/',
		video: new URL(
			'../assets/images/Product/noire/noire-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'syntra',
		title: 'SYNTRA — Connected-Learning Education Website Template',
		url: 'https://syntra-course.netlify.app/',
		video: new URL(
			'../assets/images/Product/syntra/demo-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'vanta',
		title: 'VANTA — Cinematic 3D Automotive Website Template',
		url: 'https://vanta-automotive.netlify.app/',
		video: new URL(
			'../assets/images/Product/vanta/01-product-trailer.mp4',
			import.meta.url,
		).href,
	},
	{
		id: 'velora',
		title: 'VELORA — Creative Agency & Portfolio Template',
		url: 'https://velora-studioscreative.netlify.app/',
		video: new URL(
			'../assets/images/Product/velora/demo-trailer.mp4',
			import.meta.url,
		).href,
	},
];

const videoRefs: Record<string, HTMLVideoElement | null> = {};
const isPlaying = ref<Record<string, boolean>>({});

const setVideoRef = (id: string, element: Element | null) => {
	videoRefs[id] =
		typeof HTMLVideoElement !== 'undefined' &&
		element instanceof HTMLVideoElement
			? element
			: null;
};

const playVideo = async (id: string) => {
	try {
		await videoRefs[id]?.play();
	} catch {
		isPlaying.value[id] = false;
	}
};

const pauseVideo = (id: string) => {
	videoRefs[id]?.pause();
};
</script>

<template>
	<section
		id="products"
		data-testid="products-section"
		class="relative z-20 bg-[#050505] py-24 md:py-32 lg:py-40"
	>
		<div class="max-w-350 mx-auto px-6 md:px-12">
			<div
				class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
			>
				<div>
					<motion.p
						:initial="{ opacity: 0, y: 20 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:viewport="{ once: true }"
						:transition="{ duration: 0.6, ease: EASE }"
						class="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#f56e0f]"
					>
						( 03 ) — Independent Products
					</motion.p>

					<motion.h2
						:initial="{ opacity: 0, y: 30 }"
						:while-in-view="{ opacity: 1, y: 0 }"
						:viewport="{ once: true }"
						:transition="{ duration: 0.8, ease: EASE, delay: 0.1 }"
						class="font-heading text-5xl uppercase leading-[0.9] tracking-tighter text-white md:text-7xl"
					>
						Products
					</motion.h2>
				</div>

				<p
					class="max-w-xs font-body text-sm font-light text-zinc-500 md:text-right"
				>
					A collection of digital products designed and built from the ground
					up.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-y-16">
				<motion.article
					v-for="(product, index) in products"
					:key="product.id"
					:data-testid="`product-${product.id}`"
					:initial="{ opacity: 0, y: 40 }"
					:while-in-view="{ opacity: 1, y: 0 }"
					:viewport="{ once: true, margin: '-60px' }"
					:transition="{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.1 }"
					class="group min-w-0"
				>
					<div
						class="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#111]"
					>
						<video
							:ref="
								(element) =>
									setVideoRef(product.id, element as HTMLVideoElement | null)
							"
							:src="product.video"
							aria-hidden="true"
							tabindex="-1"
							class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
							muted
							loop
							playsinline
							preload="auto"
							@play="isPlaying[product.id] = true"
							@pause="isPlaying[product.id] = false"
						>
							<track
								kind="captions"
								srclang="en"
								label="English captions"
								src="/captions/product-preview-captions.vtt"
							/>
							<track
								kind="descriptions"
								srclang="en"
								label="English description"
								src="/captions/product-preview-descriptions.vtt"
							/>
						</video>

						<div
							class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent"
						/>

						<div
							class="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-300 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
						>
							<div class="relative">
								<span
									aria-hidden="true"
									class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-950 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
								>
									Play Me
									<span
										class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-zinc-200/80 bg-white"
									/>
								</span>
								<button
									type="button"
									class="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur transition-colors hover:border-[#f56e0f] hover:bg-[#f56e0f] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f56e0f]"
									:aria-label="`${isPlaying[product.id] ? 'Pause' : 'Play'} ${product.title} preview`"
									@click.stop="
										isPlaying[product.id]
											? pauseVideo(product.id)
											: playVideo(product.id)
									"
								>
									<Pause v-if="isPlaying[product.id]" :size="14" />
									<Play v-else :size="14" />
									{{ isPlaying[product.id] ? 'Pause' : 'Play' }}
								</button>
							</div>

							<div class="relative">
								<span
									aria-hidden="true"
									class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-950 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 delay-75"
								>
									Hit Me
									<span
										class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-zinc-200/80 bg-white"
									/>
								</span>
								<a
									:href="product.url"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur transition-colors hover:border-[#f56e0f] hover:bg-[#f56e0f] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f56e0f]"
									:aria-label="`Open ${product.title} demo in a new tab`"
								>
									Live Demo
									<ArrowUpRight :size="14" />
								</a>
							</div>
						</div>
					</div>

					<h3
						class="mt-5 font-heading text-xl leading-snug text-white transition-colors duration-500 group-hover:text-[#f56e0f] md:text-2xl"
					>
						{{ product.title }}
					</h3>
				</motion.article>
			</div>
		</div>
	</section>
</template>
