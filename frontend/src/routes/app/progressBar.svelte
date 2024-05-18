<script lang="ts">
  import { onMount } from "svelte";

  export let now: Date = new Date();
  export let start: Date;
  export let end: Date;

  $: progress = (
    ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
    100
  ).toFixed(2);

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);
  });
</script>

<div class="w-1/2 font-mono text-center">
  <progress class="progress w-full" value={progress} max="100"
  ></progress>{progress}%
</div>
