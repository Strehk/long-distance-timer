<script lang="ts">
import type { Message, Relationship } from "$lib/backendTypes";
import PocketBase from "pocketbase";
import { onDestroy, onMount } from "svelte";

const pb = new PocketBase("http://127.0.0.1:8090");

export let userId: string;
export let relationshipId: string;

const MAX_MESSAGE_LENGHT = 220;

$: messageTextareaValue = "";
$: showErrorToast = "";
$: sumLetters = messageTextareaValue.length;

$: showErrorToast !== "" &&
  setTimeout(() => {
    showErrorToast = "";
  }, 5000);

async function sendMessage() {
  if (
    messageTextareaValue.length > 0 &&
    messageTextareaValue.length <= MAX_MESSAGE_LENGHT
  ) {
    await pb
      .collection("message")
      .create({
        message: messageTextareaValue,
        relationship: relationshipId,
        user: userId,
      })
      .then(() => {
        document.getElementById("message_modal").close();
      })
      .catch((_e) => {
        showErrorToast = "Fehler beim Senden der Nachricht";
      });
  } else if (messageTextareaValue.length > MAX_MESSAGE_LENGHT) {
    showErrorToast = "Nachricht darf nicht länger als 1000 Zeichen sein";
  } else {
    showErrorToast = "Nachricht darf nicht leer sein";
  }
}
</script>

<dialog id="message_modal" class="modal backdrop-blur-sm">
  <div class="modal-box flex flex-col gap-4">
    <h2 class="text-2xl">Sende eine Nachricht</h2>
    <div class="form-control">
      <textarea
        class="textarea textarea-bordered"
        placeholder="Nachricht..."
        bind:value={messageTextareaValue}
      />
      <div
        class={`form-control-hint w-full text-right text-sm mt-1 mb-3 ${sumLetters > MAX_MESSAGE_LENGHT ? "text-error" : ""}`}
      >
        {sumLetters}/{MAX_MESSAGE_LENGHT} Zeichen
      </div>
      <div class="flex gap-2 w-full">
        <button
          class="btn btn-warning"
          on:click={() => document.getElementById("message_modal").close()}
          >Abbrechen</button
        >
        <button class="btn btn-primary flex-1" on:click={() => sendMessage()}
          >Senden</button
        >
      </div>
    </div>
  </div>
  {#if showErrorToast}
    <div class="toast toast-top toast-end z-50">
      <div class="alert alert-error">
        <span>{showErrorToast}</span>
      </div>
    </div>
  {/if}
</dialog>
