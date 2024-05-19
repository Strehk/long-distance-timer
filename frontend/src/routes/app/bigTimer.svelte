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

$: months = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 30));
$: days = Math.floor(
  (timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24),
);
$: hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
$: minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
$: seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
</script>

<h2 class="text-3xl mb-2">
  Wir sehen uns das nächste Mal in
  {#if visits.length > 0}
    {nextVisit.location}
    in
  {/if}
</h2>
<h1 class="font-mono text-center mb-10">
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    {#if months > 0}
      <div class="flex flex-col">
        <span class="countdown font-mono text-7xl">
          <span style="--value:{months};"></span>
        </span>
        Monate
      </div>
      <div class="text-7xl">–</div>
    {/if}
    {#if days > 0}
      <div class="flex flex-col">
        <span class="countdown font-mono text-7xl">
          <span style="--value:{days};"></span>
        </span>
        Tage
      </div>
      <div class="text-7xl">|</div>
    {/if}
    <div class="flex flex-col">
      <span class="countdown font-mono text-7xl">
        <span style="--value:{hours};"></span>
      </span>
      Stunden
    </div>
    <div class="text-7xl">:</div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-7xl">
        <span style="--value:{minutes};"></span>
      </span>
      Minuten
    </div>
    <div class="text-7xl">:</div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-7xl">
        <span style="--value:{seconds};"></span>
      </span>
      Sekunden
    </div>
  </div>
</h1>
