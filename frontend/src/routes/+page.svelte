<script>
import PocketBase from "pocketbase";
import { writable } from "svelte/store";

const pb = new PocketBase("http://127.0.0.1:8090");

let username = "";
let password = "";
let loginFailed = false;

pb.authStore.onChange(() => {
	if (pb.authStore.isValid) {
		document.location.href = "/app";
	}
});

async function handleLogin() {
	const authData = await pb
		.collection("users")
		.authWithPassword(username, password)
		.catch((e) => {
			loginFailed = true;
			setTimeout(() => {
				loginFailed = false;
			}, 3000);
		});
}
</script>

<main class="w-full h-screen flex justify-center items-center bg-black">
  <img
    src="/map2.jpeg"
    alt="map"
    class="absolute object-cover w-full h-full blur-sm"
  />
  <div class="card w-96 bg-base-100 shadow-xl">
    <form class="card-body" on:submit={() => handleLogin()}>
      <h2 class="card-title">Anmelden</h2>
      <label
        class={`input input-bordered flex items-center gap-2 ${loginFailed ? "input-error" : ""} transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
          ><path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
          /></svg
        >
        <input
          type="text"
          class="grow"
          value={username}
          placeholder="Username"
          on:change={(e) => (username = e.target?.value || "")}
        />
      </label>
      <label
        class={`input input-bordered flex items-center gap-2 ${loginFailed ? "input-error" : ""} transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
          ><path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          /></svg
        >
        <input
          type="password"
          class="grow"
          value={password}
          placeholder="Passwort"
          on:change={(e) => (password = e.target?.value || "")}
        />
      </label>
      <div class="card-actions justify-stretch">
        <button class="btn btn-primary w-full" type="submit">Login</button>
      </div>
    </form>
  </div>
</main>

{#if loginFailed}
  <div class="toast toast-top toast-end">
    <div class="alert alert-error">
      <span>Login fehlgeschlagen</span>
    </div>
  </div>
{/if}