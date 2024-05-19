<script lang="ts">
import MessageModal from "./MessageModal.svelte";

import SpeechBubbles from "./SpeechBubbles.svelte";
import PocketBase from "pocketbase";
import { onDestroy, onMount } from "svelte";
import UntilTimer from "./untilTimer.svelte";
import ProgressBar from "./progressBar.svelte";
import BigTimer from "./bigTimer.svelte";
import type { Relationship } from "$lib/backendTypes";
import { writable } from "svelte/store";

const pb = new PocketBase("http://127.0.0.1:8090");

let loadingPage = true;
let data: Relationship | undefined = undefined;

$: userId = writable("");

const relationshipPoll = async () => {
	const records = await pb
		.collection("relationship")
		.getFullList({
			expand: "visits,messages",
		})
		.catch((e) => {
			alert(e);
		});

	if (records?.length && records.length > 0) {
		console.log(records);
		loadingPage = false;
		data = records[0] as Relationship;
	} else {
		console.log("No records found");
	}
};

onMount(async () => {
	await pb
		.collection("users")
		.authRefresh()
		.then((data) => {
			$userId = data.record.id;
		})
		.catch((e) => {
			document.location.href = "/";
		});
	if (!pb.authStore.isValid) {
		document.location.href = "/";
	}

	relationshipPoll();
	const interval = setInterval(async () => relationshipPoll(), 10000);

	return () => {
		clearInterval(interval);
	};
});

async function logout() {
	await pb.authStore.clear();
	document.location.href = "/";
}
</script>

{#if loadingPage}
  <div class="w-full h-screen flex justify-center items-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
{:else}
  <div class="w-full h-screen flex justify-center items-start relative overflow-hidden">
    <SpeechBubbles
      relationshipId={data?.id ?? ""}
      userIdPersonOne={data?.person_1}
      userIdPersonTwo={data?.person_2}
    >
      <img
        src="/map.jpeg"
        alt="map"
        class="w-full h-full contrast-75 saturate-75 brightness-125 hidden xl:block"
      />
    </SpeechBubbles>
    <div
      id="banner"
      class="bg-[#999999] w-full h-1/2 absolute bottom-0 right-0 flex flex-col justify-end items-center p-10"
    >
      <BigTimer
        visits={data?.expand?.visits ?? []}
        end={data?.end ? new Date(data.end) : new Date()}
      />
      <UntilTimer end={data?.end ? new Date(data.end) : new Date()} />
      <ProgressBar
        end={data?.end ? new Date(data.end) : new Date()}
        start={data?.start ? new Date(data.start) : new Date()}
      />
    </div>
  </div>
{/if}

<div class="absolute top-2 right-2 flex gap-2 p-2">
  <button
    class="btn btn-md btn-circle btn-ghost shadow-md"
    on:click={() =>
      document?.getElementById("message_modal") &&
      document.getElementById("message_modal").showModal()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="w-4 h-4"
      fill="currentColor"
      ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
        d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
      /></svg
    >
  </button>
  <button
    class="btn btn-md btn-circle btn-ghost shadow-md"
    on:click={() => logout()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="w-4 h-4"
      fill="currentColor"
      ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      /></svg
    >
  </button>
</div>

<MessageModal userId={$userId} relationshipId={data?.id ?? ""} />

<style>
  #banner {
    background: linear-gradient(
      to bottom,
      rgba(183, 180, 204, 0),
      rgb(222, 222, 222) 30%
    );
  }
</style>
