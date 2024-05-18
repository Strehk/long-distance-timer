<script lang="ts">
  import { onMount } from "svelte";

  export let now = new Date();
  export let end: Date;

  let timeLeft = end?.getTime() - now.getTime();

  onMount(() => {
    const interval = setInterval(() => {
      timeLeft = end?.getTime() - new Date().getTime();
    }, 1000);
  });

  $: days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  $: hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  $: minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
</script>

<h2 class="text-xl">
  Insgesamt sind nur noch <span class="font-mono">{days}</span>
  Tage,
  <span class="font-mono">{hours}</span>
  Stunden und
  <span class="font-mono">{minutes}</span> Minuten übrig.
</h2>
