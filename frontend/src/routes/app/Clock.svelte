<script lang="ts">
import { updated } from "$app/stores";
import { ISODateToUnix } from "$lib";
import type { Message } from "$lib/backendTypes";
import PocketBase from "pocketbase";
import { onMount } from "svelte";

export let tz: string;

let now = new Date();

$: getHours = parseInt(
	now.toLocaleString("de-DE", {
		timeZone: tz,
		hour: "numeric",
	}),
);

$: get12Hours = getHours > 12 ? getHours - 12 : getHours;

$: getMinutes = parseInt(
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

<div id="clock" class={night ? "bg-black" : "bg-white"}>
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
