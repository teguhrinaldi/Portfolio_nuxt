<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';

const props = defineProps<{ active: boolean; duration: number }>();
const emit = defineEmits<{ done: [] }>();

const percent = ref(0);
let frame: number | undefined;

const status = computed(() => {
	if (percent.value < 30) return 'Destabilizing reality';
	if (percent.value < 65) return 'Opening the rift';
	if (percent.value < 100) return 'Crossing over';
	return 'Arrived';
});

const run = () => {
	const startedAt = performance.now();

	const tick = (now: number) => {
		percent.value = Math.min(100, Math.floor(((now - startedAt) / props.duration) * 100));

		if (percent.value < 100) {
			frame = requestAnimationFrame(tick);
		} else {
			emit('done');
		}
	};

	frame = requestAnimationFrame(tick);
};

watch(
	() => props.active,
	(active) => {
		if (frame) cancelAnimationFrame(frame);
		percent.value = 0;
		if (active) run();
	},
);

onBeforeUnmount(() => {
	if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
	<Teleport to="body">
		<Transition name="world-transit">
			<div
				v-if="active"
				class="world-transit"
				data-testid="world-transit-screen"
				role="status"
				aria-live="assertive"
			>
				<div class="world-transit__inner">
					<p class="world-transit__label font-mono">// world transit — signal unstable</p>

					<h2
						class="world-transit__title font-heading"
						data-text="Moving to another world,"
					>
						Moving to another world,
					</h2>
					<p
						class="world-transit__title world-transit__title--accent font-heading"
						data-text="please be safe"
					>
						please be safe
					</p>

					<div class="world-transit__bar" aria-hidden="true">
						<span :style="{ width: `${percent}%` }" />
					</div>

					<div class="world-transit__meta font-mono">
						<span>{{ status }}</span>
						<span>{{ String(percent).padStart(3, '0') }}%</span>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
