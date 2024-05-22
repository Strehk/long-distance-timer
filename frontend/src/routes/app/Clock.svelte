<script lang="ts">
import { onMount } from "svelte";

export let tz: string;

let now = new Date();

$: getHours = Number.parseInt(
  now.toLocaleString("de-DE", {
    timeZone: tz,
    hour: "numeric",
  }),
);

$: get12Hours = getHours > 12 ? getHours - 12 : getHours;

$: getMinutes = Number.parseInt(
  now.toLocaleString("de-DE", {
    timeZone: tz,
    minute: "numeric",
  }),
);

$: hourRotation = (get12Hours + getMinutes / 60) * 30;
$: minuteRotation = getMinutes * 6;

$: night = getHours < 8 || getHours > 20;

onMount(() => {
  const interval = setInterval(() => {
    now = new Date();
  }, 1000);
  return () => {
    clearInterval(interval);
  };
});
</script>

<div id="clock" class={`relative ${night ? "bg-black" : "bg-white"}`}>
  <img src="/clockface.svg" alt="clockface" class={`absolute w-[95%] h-[95%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${night ? "invert" : "invert-0"}`} />
  <div
    id="hour"
    style="transform: translate(-50%, -100%) rotate({hourRotation}deg)"
    class={night ? "bg-white" : "bg-black"}
  />
  <div
    id="minute"
    style="transform: translate(-50%, -100%) rotate({minuteRotation}deg)"
    class={night ? "bg-white" : "bg-black"}
  />
  <div id="dot" class={night ? "bg-white" : "bg-black"} />
</div>

<style>
  #clock {
    width: 100%;
    height: 100%;
    position: relative;
    margin: auto;
    border-radius: 100%;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  #hour,
  #minute {
    position: absolute;
    transform-origin: bottom;
    border-radius: 3px;
    transition: all 1s ease-in-out;
  }

  #hour {
    width: 3%;
    height: 30%;
    top: 50%;
    left: 50%;
    opacity: 1;
  }

  #minute {
    width: 2%;
    height: 45%;
    top: 50%;
    left: 50%;
    opacity: 1;
  }

  #dot {
    position: absolute;
    width: 7%;
    height: 7%;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
