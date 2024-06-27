<script lang="ts">
import { ISODateToUnix } from "$lib";
import type { Visit } from "$lib/backendTypes";
import { onMount } from "svelte";

export const visits: Visit[] = [];
export let end: Date;

$: nextVisit = visits.sort(
  (a, b) => ISODateToUnix(a.date) - ISODateToUnix(b.date),
)[0];

const calculateTimeLeft = () =>
  visits.length === 0 || !nextVisit
    ? end?.getTime() - new Date().getTime()
    : ISODateToUnix(nextVisit.date) - new Date().getTime();

$: timeLeft = calculateTimeLeft();

onMount(() => {
  const interval = setInterval(() => {
    timeLeft = calculateTimeLeft();
  }, 1000);
  return () => clearInterval(interval);
});

$: days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
$: hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
$: minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
$: seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
</script>

<h2 class="text-xl md:text-3xl text-center mb-2">
  Wir sehen uns das nächste Mal in
  {#if visits.length > 0}
    {nextVisit.location}
    in
  {/if}
</h2>
<h1 class="font-mono text-center mb-10">
  <div class="flex gap-2 md:gap-6 flex-wrap justify-center">
    {#if days > 0}
      <div class="flex flex-col backdrop-blur-md shadow-md rounded-box p-4">
        {#if days <= 99}
        <span class="countdown font-mono text-5xl md:text-7xl mx-auto">
          <span style="--value:{days};"></span>
        </span>
        {:else}
        <span class="font-mono text-5xl md:text-7xl mx-auto inline-flex leading-[1em]">
          {days}
        </span>
        {/if}
        Tage
      </div>
    {/if}
    <div class="flex flex-col backdrop-blur-md shadow-md rounded-box p-4">
      <span class="countdown font-mono text-5xl md:text-7xl mx-auto">
        <span style="--value:{hours};"></span>
      </span>
      Stunden
    </div>
    <div class="flex flex-col backdrop-blur-md shadow-md rounded-box p-4">
      <span class="countdown font-mono text-5xl md:text-7xl mx-auto">
        <span style="--value:{minutes};"></span>
      </span>
      Minuten
    </div>
    <div class="flex flex-col backdrop-blur-md shadow-md rounded-box p-4">
      <span class="countdown font-mono text-5xl md:text-7xl mx-auto">
        <span style="--value:{seconds};"></span>
      </span>
      Sekunden
    </div>
  </div>
</h1>
