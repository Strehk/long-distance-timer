<script lang="ts">
import Clock from "./Clock.svelte";
import { ISODateToUnix } from "$lib";
import type { Message } from "$lib/backendTypes";
import PocketBase from "pocketbase";
import { onMount } from "svelte";
import { type Writable, writable } from "svelte/store";
import { env } from "$env/dynamic/public";

const pb = new PocketBase(env.PUBLIC_BACKEND_URL || "http://localhost:8090");

export let relationshipId = "";
export let userIdPersonOne = "";
export let userIdPersonTwo = "";

const messages: Writable<Message[]> = writable([]);

async function pollMessages(relId: string) {
  await pb
    .collection("message")
    .getFullList({
      filter: `relationship="${relId}"`,
    })
    .then((data) => {
      $messages = data as Message[];
    })
    .catch((e) => {
      alert(e);
    });
}
$: pollMessages(relationshipId);

onMount(() => {
  const interval = setInterval(async () => pollMessages(relationshipId), 10000);
  return () => clearInterval(interval);
});

$: newestMessagePersonOne =
  $messages
    .filter((m) => m.user === userIdPersonOne)
    .sort((a, b) => ISODateToUnix(b.created) - ISODateToUnix(a.created))[0]
    ?.message ?? "";

$: newestMessagePersonTwo =
  $messages
    .filter((m) => m.user === userIdPersonTwo)
    .sort((a, b) => ISODateToUnix(b.created) - ISODateToUnix(a.created))[0]
    ?.message ?? "";
</script>

<div class="w-full flex justify-center items-center relative min-w-[1200px]">
  <slot />
  {#if newestMessagePersonOne}
    <div
      class="chat chat-start w-full absolute person-one-position -translate-y-full"
    >
      <div
        class="chat-bubble bg-[#ffcd94] backdrop-blur-md bg-opacity-50 text-orange-900 !max-w-[25%] !min-h-fit max-h-[10rem] text-sm xl:text-base"
      >
        {newestMessagePersonOne}
      </div>
    </div>
  {/if}
  <div
    class="w-14 h-14 flex justify-center items-center absolute person-one-position -translate-y-full -translate-x-[120%]"
  >
    <Clock tz="America/Los_Angeles" />
  </div>
  {#if newestMessagePersonTwo}
    <div
      class="chat chat-start w-full absolute person-two-position -translate-y-full"
    >
      <div
        class="chat-bubble bg-[#aaaaff] text-blue-900 bg-opacity-50 backdrop-blur-md before:bg-opacity-100 before:backdrop-blur-md !max-w-[40%] !min-h-fit max-h-[7.3rem] text-sm xl:text-base"
      >
        {newestMessagePersonTwo}
      </div>
    </div>
  {/if}
  <div
    class="w-14 h-14 flex justify-center items-center absolute person-two-position -translate-y-full -translate-x-[120%]"
  >
    <Clock tz="Europe/Berlin" />
  </div>
</div>

<style>
  .person-one-position {
    top: 32%;
    left: 14.5%;
  }

  .person-two-position {
    top: 21%;
    left: 48.5%;
  }
</style>