import { setupControls } from "./super-video-controls";

class SuperVideo extends HTMLElement {
  private video!: HTMLVideoElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        video { width: 100%; }
        .bar { height: 6px; background: #444; cursor: pointer; }
        .progress { height: 100%; width: 0; background: red; }
        button { margin: 5px; }
      </style>

      <video></video>

      <div>
        <button id="play">Play</button>
        <button id="back">-10s</button>
        <button id="forward">+10s</button>
        <button id="full">Full</button>
      </div>

      <div class="bar">
        <div class="progress"></div>
      </div>

      <div class="time"></div>

      <slot></slot>
    `;

    this.video = this.shadowRoot!.querySelector("video")!;

    // copiar sources
    this.querySelectorAll("source").forEach((s) => {
      this.video.appendChild(s.cloneNode(true));
    });

    this.video.controls = false;

    setupControls(this.video, this.shadowRoot!);
  }
}

customElements.define("super-video", SuperVideo);