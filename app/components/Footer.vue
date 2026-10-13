<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
	ArrowUpRight,
	Github,
	Twitter,
	Instagram,
	Linkedin,
} from 'lucide-vue-next';
import { PROFILE, NAV_LINKS, SOCIAL } from '../../data/portfolio';

const visible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

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
			threshold: 0.05,
		},
	);

	observer.observe(sectionRef.value);
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<footer
		id="contact"
		ref="sectionRef"
		data-testid="footer-section"
		class="relative z-20 bg-black border-t border-zinc-900 pt-24 md:pt-32"
	>
		<div class="max-w-350 mx-auto px-6 md:px-12">
			<div class="grid lg:grid-cols-12 gap-12">
				<!-- Main CTA -->
				<div class="lg:col-span-7">
					<p
						class="font-mono text-xs uppercase tracking-[0.25em] text-[#f56e0f] mb-8"
						:class="visible ? 'footer-label-show' : 'footer-hidden'"
					>
						( 04 ) — Get in touch
					</p>

					<h2
						class="font-heading text-[15vw] lg:text-[9vw] leading-[0.85] uppercase tracking-tighter text-white"
						:class="visible ? 'footer-title-show' : 'footer-hidden'"
					>
						Let's
						<br />
						<span class="text-outline">Talk</span>
					</h2>

					<a
						href="mailto:teguhrinaldi23@gmail.com?subject=Hello%20Teguh&body=Hi%20Teguh%2C%0A%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0A%0A"
						data-testid="footer-email"
						class="group mt-10 inline-flex items-center gap-3 font-heading text-2xl md:text-3xl text-zinc-300 hover:text-[#f56e0f] transition-colors"
					>
						teguhrinaldi23@gmail.com

						<ArrowUpRight
							:size="28"
							class="group-hover:rotate-45 transition-transform duration-300"
						/>
					</a>
				</div>

				<!-- Links -->
				<div class="lg:col-span-5 grid grid-cols-2 gap-8 lg:pt-2">
					<!-- Professional -->
					<div>
						<p
							class="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-6"
						>
							Professional
						</p>

						<ul class="space-y-3">
							<li v-for="social in SOCIAL" :key="social.label">
								<a
									:href="social.href"
									class="font-body text-zinc-400 hover:text-white transition-colors"
								>
									{{ social.label }}
								</a>
							</li>
						</ul>
					</div>

					<!-- Menu -->
					<div>
						<p
							class="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-6"
						>
							Menu
						</p>

						<ul class="space-y-3">
							<li v-for="link in NAV_LINKS" :key="link.label">
								<a
									:href="link.href"
									class="font-body text-zinc-400 hover:text-white transition-colors"
								>
									{{ link.label }}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Bottom -->
			<div
				class="mt-24 py-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6"
			>
				<p class="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
					© {{ new Date().getFullYear() }} {{ PROFILE.name }} —
					{{ PROFILE.brand }}
				</p>

				<div class="flex items-center gap-5 text-zinc-500">
					<a
						href="#"
						aria-label="LinkedIn"
						class="hover:text-[#f56e0f] transition-colors"
					>
						<Linkedin :size="18" />
					</a>

					<a
						href="#"
						aria-label="Twitter"
						class="hover:text-[#f56e0f] transition-colors"
					>
						<Twitter :size="18" />
					</a>

					<a
						href="#"
						aria-label="Instagram"
						class="hover:text-[#f56e0f] transition-colors"
					>
						<Instagram :size="18" />
					</a>

					<a
						href="#"
						aria-label="Github"
						class="hover:text-[#f56e0f] transition-colors"
					>
						<Github :size="18" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>
