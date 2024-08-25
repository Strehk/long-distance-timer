<script lang="ts">
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
      console.error(e);
    });
}

onMount(() => {
  pollMessages(relationshipId);
  const interval = setInterval(async () => pollMessages(relationshipId), 1000);
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

{#if newestMessagePersonOne}
<div class="chat chat-start w-full">
  <div
    class="chat-bubble bg-primary text-orange-900 backdrop-blur-md bg-opacity-50"
  >
    {newestMessagePersonOne}
  </div>
</div>
{/if}
{#if newestMessagePersonTwo}
<div class="chat chat-end w-full">
  <div
  class="chat-bubble bg-secondary text-blue-900 backdrop-blur-md bg-opacity-50"
  >
  {newestMessagePersonTwo}
</div>
</div>
{/if}
