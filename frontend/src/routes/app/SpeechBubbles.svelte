<script lang="ts">
import Clock from "./Clock.svelte";

import { ISODateToUnix } from "$lib";
import type { Message } from "$lib/backendTypes";
import PocketBase from "pocketbase";
import { onMount } from "svelte";
import { type Writable, writable } from "svelte/store";

const pb = new PocketBase("http://127.0.0.1:8090");

export const relationshipId = "";
export const userIdPersonOne = "";
export const userIdPersonTwo = "";

const messages: Writable<Message[]> = writable([]);

async function pollMessages() {
  await pb
    .collection("message")
    .getFullList({
      filter: `relationship="${relationshipId}"`,
    })
    .then((data) => {
      $messages = data as Message[];
    })
    .catch((e) => {
      alert(e);
    });
}

onMount(() => {
  pollMessages();
  const interval = setInterval(async () => pollMessages(), 10000);
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

<div class="w-full flex justify-center items-center relative">
  <slot />
  {#if newestMessagePersonOne}
    <div
      class="chat chat-start w-full absolute person-one-position -translate-y-full"
    >
      <div
        class="chat-bubble bg-[#ffc079] text-orange-900 shadow-md !max-w-[25%] max-h-[10rem]"
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
        class="chat-bubble bg-[#aaaaff] text-blue-900 shadow-md !max-w-[40%] max-h-[7.3rem]"
      >
        <div class="p-1">
          {newestMessagePersonTwo}
        </div>
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
