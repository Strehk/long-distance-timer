<script lang="ts">
  import { ISODateToUnix } from "$lib";
  import type { Message } from "$lib/backendTypes";
  import PocketBase from "pocketbase";
  import { onMount } from "svelte";

  export let messages: Message[] = [];
  export let userIdPersonOne: string = "";
  export let userIdPersonTwo: string = "";

  console.log(messages);

  $: newestMessagePersonOne = messages
    .filter((m) => m.user === userIdPersonOne)
    .sort((a, b) => ISODateToUnix(b.created) - ISODateToUnix(a.created))[0].message;

  $: newestMessagePersonTwo = messages
    .filter((m) => m.user === userIdPersonTwo)
    .sort((a, b) => ISODateToUnix(b.created) - ISODateToUnix(a.created))[0].message;
</script>

<div class="w-full flex justify-center items-center relative">
  <slot />
  {#if newestMessagePersonOne}
    <div
      class="chat chat-start absolute top-[32%] left-[14.5%] -translate-y-full"
    >
      <div class="chat-bubble bg-[#ffc079] text-orange-900 shadow-md">
        {newestMessagePersonOne}
      </div>
    </div>
  {/if}
  {#if newestMessagePersonTwo}
    <div
      class="chat chat-start absolute top-[21%] left-[48.5%] -translate-y-full"
    >
      <div class="chat-bubble bg-[#aaaaff] text-blue-900 shadow-md">
        {newestMessagePersonTwo}
      </div>
    </div>
  {/if}
</div>
