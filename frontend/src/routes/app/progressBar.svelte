<script lang="ts">
import { onMount } from "svelte";

export let now: Date = new Date();
export let start: Date;
export let end: Date;

$: progress = (
  ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
  100
)

onMount(() => {
  const interval = setInterval(() => {
    now = new Date();
  }, 1000);
  return () => clearInterval(interval);
});
</script>

<div class="w-1/2 font-mono text-center text-sm md:text-md mt-2">
  <progress class="progress w-full" value={!isNaN(progress) ? progress : 0} max="100"
  ></progress>{progress.toFixed(2)}%
</div>
