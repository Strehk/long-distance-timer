<script>
  let bubbleOne = "It's over Anakin, I have the high ground.";
  let bubbleTwo = "You underestimate my power.";

  let now = new Date(Date.now());
  let end = new Date("2024-12-12T00:00:00");
  let start = new Date("2022-12-12T00:00:00");

  let progress =
    (((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
    100).toFixed(2);
</script>

<div class="w-full h-screen flex justify-center items-start relative">
  <div class="w-full flex justify-center items-center relative">
    <img
      src="/map.jpeg"
      alt="map"
      class="w-full h-full contrast-75 saturate-75 brightness-125"
    />
    <div
      class="chat chat-start absolute top-[32%] left-[14.5%] -translate-y-full"
    >
      <div class="chat-bubble bg-[#ffc079] text-orange-900 shadow-md">
        {bubbleOne}
      </div>
    </div>
    <div
      class="chat chat-end absolute top-[21%] left-[48.5%] -translate-x-full -translate-y-full"
    >
      <div class="chat-bubble bg-[#aaaaff] text-blue-900 shadow-md">
        {bubbleTwo}
      </div>
    </div>
  </div>
  <div
    id="banner"
    class="bg-[#999999] w-full h-1/2 absolute bottom-0 right-0 flex flex-col justify-end items-center p-10"
  >
    <h2 class="text-3xl mb-2">Wir sehen uns das nächste Mal in</h2>
    <h1 class="text-7xl font-mono mb-10">12 | 23:59:20</h1>
    <h2 class="text-xl">
      Insgesamt sind nur noch <span class="font-mono">{now.getDate()}</span> Tage,
      <span class="font-mono">{now.getHours()}</span>
      Stunden und <span class="font-mono">{now.getMinutes()}</span> Minuten übrig
    </h2>
    <div class="w-1/2 font-mono text-center"><progress class="progress w-full" value="{progress}" max="100"></progress>{progress}%</div>
  </div>
</div>

<style>
  #banner {
    background: linear-gradient(
      to bottom,
      rgba(183, 180, 204, 0),
      rgb(222, 222, 222) 30%
    );
  }
</style>
