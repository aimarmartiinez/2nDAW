(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){let n=t.querySelector(`#play`),r=t.querySelector(`#back`),i=t.querySelector(`#forward`),a=t.querySelector(`#full`),o=t.querySelector(`.bar`),s=t.querySelector(`.progress`),c=t.querySelector(`.time`);n.onclick=()=>{e.paused?(e.play(),n.textContent=`Pause`):(e.pause(),n.textContent=`Play`)},r.onclick=()=>{e.currentTime-=10},i.onclick=()=>{e.currentTime+=10},a.onclick=()=>{document.fullscreenElement?document.exitFullscreen():e.requestFullscreen()},o.onclick=t=>{let n=o.getBoundingClientRect();e.currentTime=(t.clientX-n.left)/n.width*e.duration},e.ontimeupdate=()=>{c.textContent=`${l(e.currentTime)} / ${l(e.duration)}`,s.style.width=e.currentTime/e.duration*100+`%`};function l(e){return`${Math.floor(e/60)}:${Math.floor(e%60)}`}}var t=class extends HTMLElement{video;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.shadowRoot.innerHTML=`
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
    `,this.video=this.shadowRoot.querySelector(`video`),this.querySelectorAll(`source`).forEach(e=>{this.video.appendChild(e.cloneNode(!0))}),this.video.controls=!1,e(this.video,this.shadowRoot)}};customElements.define(`super-video`,t);