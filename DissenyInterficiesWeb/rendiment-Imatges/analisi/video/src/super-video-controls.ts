export function setupControls(video: HTMLVideoElement, shadow: ShadowRoot) {
  const playBtn = shadow.querySelector("#play") as HTMLButtonElement;
  const backBtn = shadow.querySelector("#back") as HTMLButtonElement;
  const forwardBtn = shadow.querySelector("#forward") as HTMLButtonElement;
  const fullBtn = shadow.querySelector("#full") as HTMLButtonElement;

  const bar = shadow.querySelector(".bar") as HTMLElement;
  const progress = shadow.querySelector(".progress") as HTMLElement;
  const time = shadow.querySelector(".time") as HTMLElement;

  // PLAY / PAUSE
  playBtn.onclick = () => {
    if (video.paused) {
      video.play();
      playBtn.textContent = "Pause";
    } else {
      video.pause();
      playBtn.textContent = "Play";
    }
  };

  // -10s
  backBtn.onclick = () => {
    video.currentTime -= 10;
  };

  // +10s
  forwardBtn.onclick = () => {
    video.currentTime += 10;
  };

  // FULLSCREEN
  fullBtn.onclick = () => {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // CLICK PROGRESS BAR
  bar.onclick = (e: MouseEvent) => {
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  // UPDATE TIME + BAR
  video.ontimeupdate = () => {
    const current = format(video.currentTime);
    const total = format(video.duration);

    time.textContent = `${current} / ${total}`;

    progress.style.width =
      (video.currentTime / video.duration) * 100 + "%";
  };

  function format(t: number) {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60);
    const currentTime = `${min}:${sec}`;
    return currentTime;
  }
}