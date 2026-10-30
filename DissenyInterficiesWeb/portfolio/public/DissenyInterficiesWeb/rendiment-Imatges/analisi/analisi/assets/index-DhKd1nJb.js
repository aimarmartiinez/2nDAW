(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.addEventListener(`DOMContentLoaded`,()=>{document.querySelectorAll(`img`).forEach(t=>{let n=performance.now();t.onload=async()=>{await e(t,performance.now()-n)}})});async function e(e,t){let n=e.naturalWidth,r=e.naturalHeight,i=n>r?`landscape`:`portrait`,a=await fetch(e.src),o=a.headers.get(`content-length`),s=a.headers.get(`content-type`),c=e.closest(`.card`)?.querySelector(`.info`);if(!c)return;let l=document.createElement(`ul`);l.innerHTML=`
    <li>Width: ${n}px</li>
    <li>Height: ${r}px</li>
    <li>Orientation: ${i}</li>
    <li>Format: ${s}</li>
    <li>Size: ${o} bytes</li>
    <li>Load time: ${t} ms</li>
  `,c.appendChild(l)}