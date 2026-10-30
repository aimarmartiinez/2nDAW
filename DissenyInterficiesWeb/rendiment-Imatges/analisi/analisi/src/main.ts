document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const startTime = performance.now();
    img.onload = async () => {
      const endTime = performance.now();
      const time = endTime - startTime;
      await handleImage(img, time);
    };
  });
});

async function handleImage(img: HTMLImageElement, time: number) {

  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const orientation = width > height ? "landscape" : "portrait";

  //get size and format with headers
  const response = await fetch(img.src);
  const size = response.headers.get("content-length");
  const format = response.headers.get("content-type");

  const card = img.closest(".card") as HTMLElement;
  const info = card?.querySelector(".info") as HTMLElement;

  if (!info) return;

  const ul = document.createElement("ul");

  ul.innerHTML = `
    <li>Width: ${width}px</li>
    <li>Height: ${height}px</li>
    <li>Orientation: ${orientation}</li>
    <li>Format: ${format}</li>
    <li>Size: ${size} bytes</li>
    <li>Load time: ${time} ms</li>
  `;

  info.appendChild(ul);
}