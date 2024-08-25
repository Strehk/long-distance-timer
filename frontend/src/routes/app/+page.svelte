<script lang="ts">
import MessageModal from "./MessageModal.svelte";
import { env } from "$env/dynamic/public";
import type { Relationship } from "$lib/backendTypes";
import PocketBase from "pocketbase";
import { onDestroy, onMount } from "svelte";
import { writable, type Writable } from "svelte/store";
import SpeechBubbles from "./SpeechBubbles.svelte";
import BigTimer from "./bigTimer.svelte";
import ProgressBar from "./progressBar.svelte";
import Clock from "./Clock.svelte";
import UntilTimer from "./untilTimer.svelte";
import { fade } from "svelte/transition";
import SpeechBubblesSmallScreen from "./SpeechBubblesSmallScreen.svelte";
import { width } from "$lib/stores.js";

const pb = new PocketBase(env.PUBLIC_BACKEND_URL || "http://localhost:8090");

const BREAKPOINT = 1024;

let loadingPage = writable(true);
let data: Writable<Relationship> = writable({} as Relationship);

$: userId = writable("");

let error = false;

const relationshipPoll = async () => {
  const records = await pb
    .collection("relationship")
    .getFullList({
      expand: "visits",
    })
    .catch((e) => {
      error = true;
      console.error(e);
      setTimeout(() => {
        error = false;
      }, 3000);
    });

  if (records?.length && records.length > 0) {
    data.set(records[0] as Relationship);
  } else {
    console.error("No relationship found");
    error = true;
    setTimeout(() => {
      error = false;
    }, 3000);
  }
};

let interval: any;

onMount(async () => {
  await pb
    .collection("users")
    .authRefresh()
    .then((authData) => {
      $userId = authData.record.id;
    })
    .catch((_e) => {
      document.location.href = "/";
    });
  if (!pb.authStore.isValid) {
    document.location.href = "/";
  }

  relationshipPoll();
  setTimeout(() => loadingPage.set(false), 1000);
  interval = setInterval(async () => relationshipPoll(), 10000);
});

onDestroy(() => {
  clearInterval(interval);
});

async function logout() {
  await pb.authStore.clear();
  document.location.href = "/";
}
</script>

{#if $loadingPage}
  <div
    class={`absolute inset-0 flex justify-center items-center bg-white z-50`}
    transition:fade={{ delay: 250, duration: 1000 }}
  >
    <div class="loading loading-ball loading-lg" />
  </div>
{/if}

<!-- Desktop -->
{#if $width > BREAKPOINT}
  <div
    class="w-screen h-screen flex justify-center items-start relative overflow-hidden"
  >
    <SpeechBubbles
      relationshipId={$data?.id ?? ""}
      userIdPersonOne={$data?.person_1}
      userIdPersonTwo={$data?.person_2}
    >
      <div class="w-full h-full hidden lg:block relative">
        <img
          src="/map.jpeg"
          alt="map"
          class="w-full h-full contrast-75 saturate-75 brightness-125"
        />
        <img
          src="/map.jpeg"
          alt="map"
          class="absolute w-full h-full contrast-75 saturate-75 brightness-125 bottom-0 translate-y-full rotate-180 -scale-x-100"
        />
      </div>
    </SpeechBubbles>
    <div
      id="banner1"
      class="w-full h-full backdrop-blur-2xl bg-white bg-opacity-30 lg:h-[45%] lg:min-h-[300px] absolute bottom-0 right-0 flex flex-col justify-center items-center p-10"
    >
      <BigTimer
        visits={$data?.expand?.visits ?? []}
        end={$data?.end ? new Date($data.end) : new Date()}
      />
      <UntilTimer end={$data?.end ? new Date($data.end) : new Date()} />
      <ProgressBar
        end={$data?.end ? new Date($data.end) : new Date()}
        start={$data?.start ? new Date($data.start) : new Date()}
      />
    </div>
  </div>
{/if}

<!-- Mobile -->
{#if $width <= BREAKPOINT}
  <div
    class="w-full min-h-screen p-10 flex flex-col justify-center items-center bg-slate-100"
  >
    <div class="h-10" />
    <BigTimer
      visits={$data?.expand?.visits ?? []}
      end={$data?.end ? new Date($data.end) : new Date()}
    />
    <UntilTimer end={$data?.end ? new Date($data.end) : new Date()} />
    <ProgressBar
      end={$data?.end ? new Date($data.end) : new Date()}
      start={$data?.start ? new Date($data.start) : new Date()}
    />
    <div class="flex justify-between w-full my-10">
      <div class="w-24 h-24">
        <Clock tz="America/Los_Angeles" />
      </div>
      <div class="w-24 h-24">
        <Clock tz="Europe/Berlin" />
      </div>
    </div>
    <SpeechBubblesSmallScreen
      relationshipId={$data?.id ?? ""}
      userIdPersonOne={$data?.person_1}
      userIdPersonTwo={$data?.person_2}
    />
    <div class="h-10" />
  </div>
{/if}

<div
  class="fixed w-full bottom-0 lg:top-0 left-0 flex justify-between lg:justify-end flex-row-reverse p-4 gap-2 z-50"
>
  <button
    class="btn btn-md btn-circle btn-ghost backdrop-blur-md shadow-md"
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
    class="btn btn-md btn-circle btn-ghost backdrop-blur-sm shadow-md"
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

<MessageModal userId={$userId} relationshipId={$data?.id ?? ""} />

{#if error}
  <div class="toast toast-top toast-end">
    <div class="alert alert-error">
      <span>Ein Fehler ist aufgetreten</span>
    </div>
  </div>
{/if}
