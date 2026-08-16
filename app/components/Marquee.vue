<script setup lang="ts">
import { SKILLS } from '../../data/portfolio';

const items = [...SKILLS, ...SKILLS];
</script>

<template>
	<section
		data-testid="skills-marquee"
		class="relative z-20 py-6 md:py-8 border-y border-zinc-900 bg-[#0a0a0a] overflow-hidden marquee-pause"
	>
		<div class="flex whitespace-nowrap animate-marquee w-max">
			<span
				v-for="(skill, index) in items"
				:key="index"
				class="flex items-center"
			>
				<span
					class="font-heading uppercase text-2xl md:text-4xl tracking-tight text-zinc-500 px-6 md:px-10"
				>
					{{ skill }}
				</span>

				<span class="text-[#f56e0f] text-lg md:text-2xl"> ✦ </span>
			</span>
		</div>
	</section>
</template>
