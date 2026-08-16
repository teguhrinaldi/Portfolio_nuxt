<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PROFILE, MANIFESTO } from '../../data/portfolio';

const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);

const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

let observer: IntersectionObserver | null = null;

onMounted(() => {
	if (!sectionRef.value) return;

	observer = new IntersectionObserver(
		(entries) => {
			const currentEntry = entries[0];

			if (currentEntry && currentEntry.isIntersecting) {
				visible.value = true;
				observer?.disconnect();
			}
		},
		{
			rootMargin: '-80px',
			threshold: 0.1,
		},
	);

	observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<section
		id="about"
		ref="sectionRef"
		data-testid="about-section"
		class="relative z-20 bg-[#050505] py-24 md:py-32 lg:py-40"
	>
		<div class="max-w-350 mx-auto px-6 md:px-12">
			<!-- Label -->
			<p
				class="font-mono text-xs uppercase tracking-[0.25em] text-[#f56e0f] mb-16"
				:class="visible ? 'about-reveal' : 'about-hidden'"
				:style="{ '--delay': '0s' }"
			>
				( 01 ) — About Me
			</p>

			<div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
				<!-- Portrait -->
				<div class="lg:col-span-5">
					<div
						class="relative overflow-hidden rounded-sm bg-[#0f0f0f] aspect-4/5 border border-zinc-900"
						:class="visible ? 'about-reveal' : 'about-hidden'"
						:style="{ '--delay': '0.1s' }"
					>
						<img
							:src="PROFILE.portrait"
							:alt="PROFILE.name"
							class="absolute inset-0 h-full w-full object-cover object-top grayscale"
							:class="visible ? 'portrait-reveal' : 'portrait-hidden'"
						/>

						<div
							class="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400"
						>
							{{ PROFILE.name }} / '26
						</div>
					</div>
				</div>

				<!-- Text -->
				<div class="lg:col-span-7">
					<!-- Heading -->
					<h2
						class="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-white"
						:class="visible ? 'about-reveal' : 'about-hidden'"
						:style="{ '--delay': '0.1s' }"
					>
						Hey, I'm {{ PROFILE.firstName }} — a frontend engineer who loves
						turning UI/UX into clean, scalable interfaces.
						<span class="text-zinc-600">
							From blank projects to production-ready products.
						</span>
					</h2>

					<!-- Description -->
					<p
						class="mt-8 font-body font-light text-base md:text-lg leading-relaxed text-zinc-400 max-w-xl"
						:class="visible ? 'about-reveal' : 'about-hidden'"
						:style="{ '--delay': '0.2s' }"
					>
						{{ PROFILE.about }}
					</p>

					<!-- Manifesto -->
					<div class="mt-14 divide-y divide-zinc-900 border-t border-zinc-900">
						<div
							v-for="(m, i) in MANIFESTO"
							:key="m.num"
							class="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_180px_1fr] gap-4 md:gap-8 py-6 items-baseline"
							:class="visible ? 'about-reveal' : 'about-hidden'"
							:style="{ '--delay': `${0.1 * i}s` }"
						>
							<span class="font-mono text-sm text-[#f56e0f]">
								{{ m.num }}
							</span>

							<h3
								class="font-heading text-xl md:text-2xl text-white group-hover:translate-x-2 transition-transform duration-500"
							>
								{{ m.title }}
							</h3>

							<p
								class="col-span-2 md:col-span-1 font-body font-light text-sm text-zinc-500 leading-relaxed"
							>
								{{ m.body }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
