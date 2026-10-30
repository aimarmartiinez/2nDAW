type Jugador = "blanc" | "negre";
type ValorCasella = "buida" | "blanc" | "negre" | "fletxa";
type Fase = "moure_dama" | "tirar_fletxa" | "final";

type Posicio = {
  fila: number;
  columna: number;
};

const MIDA_TAULER = 10;

const DIRECCIONS: Posicio[] = [
  { fila: -1, columna: 0 },
  { fila: 1, columna: 0 },
  { fila: 0, columna: -1 },
  { fila: 0, columna: 1 },
  { fila: -1, columna: -1 },
  { fila: -1, columna: 1 },
  { fila: 1, columna: -1 },
  { fila: 1, columna: 1 },
];

function obtenirElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`No s'ha trobat ${selector}`);
  return element;
}

const taulerEl = obtenirElement<HTMLElement>("#board");
const estatEl = obtenirElement<HTMLElement>("#status");
const botoReset = obtenirElement<HTMLButtonElement>("#reset");

let tauler: ValorCasella[][] = [];
let tornActual: Jugador = "blanc";
let faseActual: Fase = "moure_dama";

let damaSeleccionada: Posicio | null = null;
let damaMoguda: Posicio | null = null;
let casellesValides = new Set<string>();

let arrossegant: Posicio | null = null;
let casellaDrop: string | null = null;

function clau(pos: Posicio): string {
  return `${pos.fila},${pos.columna}`;
}

function dinsTauler(fila: number, columna: number): boolean {
  return fila >= 0 && fila < MIDA_TAULER && columna >= 0 && columna < MIDA_TAULER;
}

function copiarPos(pos: Posicio): Posicio {
  return { fila: pos.fila, columna: pos.columna };
}

function crearTaulerInicial(): ValorCasella[][] {
  const nouTauler: ValorCasella[][] = Array.from({ length: MIDA_TAULER }, () =>
    Array.from({ length: MIDA_TAULER }, () => "buida" as ValorCasella)
  );

  // Posicions oficials del joc Amazones (Wikipedia)
  const blanques: Posicio[] = [
    { fila: 3, columna: 0 },
    { fila: 0, columna: 3 },
    { fila: 0, columna: 6 },
    { fila: 3, columna: 9 },
  ];

  const negres: Posicio[] = [
    { fila: 6, columna: 0 },
    { fila: 9, columna: 3 },
    { fila: 9, columna: 6 },
    { fila: 6, columna: 9 },
  ];

  for (const p of blanques) nouTauler[p.fila][p.columna] = "blanc";
  for (const p of negres) nouTauler[p.fila][p.columna] = "negre";

  return nouTauler;
}

function obtenirCasellaDOM(fila: number, columna: number): HTMLElement | null {
  return taulerEl.querySelector<HTMLElement>(`.cell[data-row='${fila}'][data-col='${columna}']`);
}

function movimentsDama(origen: Posicio, estatTauler: ValorCasella[][]): Posicio[] {
  const moviments: Posicio[] = [];

  for (const dir of DIRECCIONS) {
    let f = origen.fila + dir.fila;
    let c = origen.columna + dir.columna;

    while (dinsTauler(f, c) && estatTauler[f][c] === "buida") {
      moviments.push({ fila: f, columna: c });
      f += dir.fila;
      c += dir.columna;
    }
  }

  return moviments;
}

function teAlgunMoviment(jugador: Jugador): boolean {
  for (let f = 0; f < MIDA_TAULER; f += 1) {
    for (let c = 0; c < MIDA_TAULER; c += 1) {
      if (tauler[f][c] !== jugador) continue;
      if (movimentsDama({ fila: f, columna: c }, tauler).length > 0) return true;
    }
  }
  return false;
}

function nomJugador(jugador: Jugador): string {
  return jugador === "blanc" ? "les blanques" : "les negres";
}

function netejarSeleccioTemporal(): void {
  damaSeleccionada = null;
  damaMoguda = null;
  casellesValides.clear();
  arrossegant = null;
  casellaDrop = null;
}

function posarMissatge(text: string): void {
  estatEl.textContent = text;
}

function actualitzarMissatge(): void {
  if (faseActual === "final") return;

  if (faseActual === "moure_dama") {
    posarMissatge(`Torn de ${nomJugador(tornActual)}: selecciona o arrossega una dama.`);
  } else {
    posarMissatge(`Torn de ${nomJugador(tornActual)}: ara tira la fletxa.`);
  }
}

function canviarTorn(): void {
  tornActual = tornActual === "blanc" ? "negre" : "blanc";
}

function dibuixarEstructuraTauler(): void {
  taulerEl.innerHTML = "";

  for (let f = 0; f < MIDA_TAULER; f += 1) {
    for (let c = 0; c < MIDA_TAULER; c += 1) {
      const casella = document.createElement("div");
      casella.className = `cell ${(f + c) % 2 === 0 ? "light" : "dark"}`;
      casella.dataset.row = String(f);
      casella.dataset.col = String(c);
      taulerEl.appendChild(casella);
    }
  }
}

function renderitzar(): void {
  for (let f = 0; f < MIDA_TAULER; f += 1) {
    for (let c = 0; c < MIDA_TAULER; c += 1) {
      const casella = obtenirCasellaDOM(f, c);
      if (!casella) continue;

      casella.innerHTML = "";
      casella.classList.remove("selectable", "valid-move", "selected", "drop-target");

      const valor = tauler[f][c];

      if (valor === "blanc" || valor === "negre") {
        const peça = document.createElement("div");
        peça.className = `piece ${valor === "blanc" ? "white" : "black"}`;
        casella.appendChild(peça);
      }

      if (valor === "fletxa") {
        const fletxa = document.createElement("span");
        fletxa.className = "arrow";
        fletxa.textContent = "x";
        casella.appendChild(fletxa);
      }

      if (faseActual === "moure_dama" && valor === tornActual) casella.classList.add("selectable");
      if (casellesValides.has(`${f},${c}`)) casella.classList.add("valid-move");
      if (damaSeleccionada && damaSeleccionada.fila === f && damaSeleccionada.columna === c) {
        casella.classList.add("selected");
      }
      if (casellaDrop === `${f},${c}`) casella.classList.add("drop-target");

      casella.draggable = faseActual === "moure_dama" && valor === tornActual;
    }
  }

  actualitzarMissatge();
}

function seleccionarDama(pos: Posicio): void {
  damaSeleccionada = copiarPos(pos);
  damaMoguda = null;
  casellesValides = new Set(movimentsDama(pos, tauler).map(clau));
}

function moureDama(destinacio: Posicio): void {
  if (!damaSeleccionada) return;

  tauler[destinacio.fila][destinacio.columna] = tornActual;
  tauler[damaSeleccionada.fila][damaSeleccionada.columna] = "buida";

  damaMoguda = copiarPos(destinacio);
  damaSeleccionada = null;
  faseActual = "tirar_fletxa";
  casellesValides = new Set(movimentsDama(destinacio, tauler).map(clau));
}

function tirarFletxa(destinacio: Posicio): void {
  if (!damaMoguda) return;

  tauler[destinacio.fila][destinacio.columna] = "fletxa";
  netejarSeleccioTemporal();

  canviarTorn();

  if (!teAlgunMoviment(tornActual)) {
    faseActual = "final";
    const guanyador: Jugador = tornActual === "blanc" ? "negre" : "blanc";
    alert(`Partida acabada! Guanyen ${nomJugador(guanyador)}!`);
    renderitzar();
    return;
  }

  faseActual = "moure_dama";
  renderitzar();
}

function clickCasella(pos: Posicio): void {
  if (faseActual === "final") return;

  const valor = tauler[pos.fila][pos.columna];
  const k = clau(pos);

  if (faseActual === "moure_dama") {
    if (valor === tornActual) {
      seleccionarDama(pos);
    } else if (damaSeleccionada && casellesValides.has(k)) {
      moureDama(pos);
    } else {
      damaSeleccionada = null;
      casellesValides.clear();
    }

    renderitzar();
    return;
  }

  if (faseActual === "tirar_fletxa" && casellesValides.has(k)) {
    tirarFletxa(pos);
  }
}

function dragStart(event: DragEvent, pos: Posicio): void {
  if (faseActual !== "moure_dama") return;
  if (tauler[pos.fila][pos.columna] !== tornActual) return;

  arrossegant = copiarPos(pos);
  seleccionarDama(pos);
  renderitzar();

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", clau(pos));
  }
}

function dragOver(event: DragEvent, pos: Posicio): void {
  if (faseActual !== "moure_dama" || !arrossegant) return;

  const k = clau(pos);

  if (!casellesValides.has(k)) {
    if (casellaDrop) {
      casellaDrop = null;
      renderitzar();
    }
    return;
  }

  event.preventDefault();

  if (casellaDrop !== k) {
    casellaDrop = k;
    renderitzar();
  }
}

function dropCasella(event: DragEvent, pos: Posicio): void {
  if (faseActual !== "moure_dama" || !arrossegant) return;

  event.preventDefault();
  const k = clau(pos);

  if (casellesValides.has(k)) moureDama(pos);

  arrossegant = null;
  casellaDrop = null;
  renderitzar();
}

function dragEnd(): void {
  arrossegant = null;
  casellaDrop = null;

  if (faseActual === "moure_dama") {
    damaSeleccionada = null;
    casellesValides.clear();
  }

  renderitzar();
}

function prepararEvents(): void {
  taulerEl.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const casella = target.closest<HTMLElement>(".cell");
    if (!casella) return;

    clickCasella({
      fila: Number(casella.dataset.row),
      columna: Number(casella.dataset.col),
    });
  });

  taulerEl.addEventListener("dragstart", (event) => {
    const target = event.target as HTMLElement;
    const casella = target.closest<HTMLElement>(".cell");
    if (!casella) return;

    dragStart(event, {
      fila: Number(casella.dataset.row),
      columna: Number(casella.dataset.col),
    });
  });

  taulerEl.addEventListener("dragover", (event) => {
    const target = event.target as HTMLElement;
    const casella = target.closest<HTMLElement>(".cell");
    if (!casella) return;

    dragOver(event, {
      fila: Number(casella.dataset.row),
      columna: Number(casella.dataset.col),
    });
  });

  taulerEl.addEventListener("drop", (event) => {
    const target = event.target as HTMLElement;
    const casella = target.closest<HTMLElement>(".cell");
    if (!casella) return;

    dropCasella(event, {
      fila: Number(casella.dataset.row),
      columna: Number(casella.dataset.col),
    });
  });

  taulerEl.addEventListener("dragend", () => {
    dragEnd();
  });

  botoReset.addEventListener("click", () => {
    iniciarPartida();
  });
}

function iniciarPartida(): void {
  tauler = crearTaulerInicial();
  tornActual = "blanc";
  faseActual = "moure_dama";
  netejarSeleccioTemporal();
  renderitzar();
}

function init(): void {
  dibuixarEstructuraTauler();
  prepararEvents();
  iniciarPartida();
}

init();
