import { writable } from "svelte/store";

function createWidthStore() {
  const { subscribe, set } = writable(0); // Initialize with a default value

  if (typeof window !== "undefined") {
    // Set the initial width if window is available
    set(window.innerWidth);

    // Define the resize event handler
    function handleResize() {
      set(window.innerWidth);
    }

    // Add the event listener to the window
    window.addEventListener("resize", handleResize);

    // Provide a way to clean up when the store is no longer needed
    return {
      subscribe,
      destroy: () => {
        window.removeEventListener("resize", handleResize);
      },
    };
  }
  // Return a simple store with just a subscribe method if window is not available
  return {
    subscribe,
  };
}

export const width = createWidthStore();
