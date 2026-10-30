import type { PlayerInterface } from '../types/interfaces';
import { createPlayer, getPlayerTeamName, updatePlayer } from '../models/player';
import { equipsAvailableOptions } from '../models/team';
import { formatDate } from './data';

export async function showModal(action: string, player: PlayerInterface | null) {
    let modal = document.querySelector('#modal') as HTMLDivElement | null;
    if (!modal) {
        createModal();
        modal = document.querySelector('#modal') as HTMLDivElement;
    }

    const title = modal.querySelector('.modal-header h1') as HTMLHeadingElement;
    const body = modal.querySelector('.modal-body') as HTMLDivElement;

    if (action === 'update') {
        title.textContent = 'Editar Jugador';
    } else{
        title.textContent = 'Crear Jugador';
    }

    await createForm(body, player);
    modal.classList.remove('hidden');
}

export function createModal(){
    const modal = document.createElement('DIV');
    const modalContent = document.createElement('DIV');
    const header = document.createElement('DIV');
    const body = document.createElement('DIV');

    const title = document.createElement('H1');
    const closeBtn = document.createElement('BUTTON') as HTMLButtonElement;

    modal.classList.add('modal-dialog');
    modal.classList.add('hidden');
    modalContent.classList.add('modal-content');
    header.classList.add('modal-header');
    body.classList.add('modal-body');
    closeBtn.classList.add('close-btn');

    modal.id="modal";
    closeBtn.textContent='X';
    closeBtn.type = 'button';

    header.appendChild(title);
    header.appendChild(closeBtn)
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    closeBtn.addEventListener('click', ()=>{
        body.innerHTML='';
        modal.classList.add('hidden');
    });
}

async function createForm(modalBody: HTMLDivElement, player: PlayerInterface | null): Promise<void> {
    modalBody.replaceChildren();
    const form = document.createElement('form');
    form.id = 'player-form';
    form.innerHTML = `
        <input type="hidden" id="id_jugador" name="id_jugador" value="${player ? player.id_jugador : ''}">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom" value="${player ? player.nom : ''}" required>

        <label for="nacionalitat">Nacionalitat:</label>
        <input type="text" id="nacionalitat" name="nacionalitat" value="${player ? player.nacionalitat : ''}" required>

        <label for="equip">Equip:</label>
        <select id="equip-selection" name="equip" required>
            <option value="">${player ? getPlayerTeamName(player.id_equip) : 'Selecciona equip'}</option>
        </select>
        <label for="posicio">Posició:</label>
        <input type="text" id="posicio" name="posicio" value="${player ? player.posicio : ''}" required>

        <label for="dorsal">Dorsal:</label>
        <input type="number" id="dorsal" name="dorsal" value="${player ? player.dorsal : ''}" required>

        <label for="data_naixement">Data de Naixement:</label>
        <input type="date" id="data_naixement" name="data_naixement" value="${player ? formatDate(player.data_naixement) : ''}" required>
        <button type="submit" id="submitBtn" class="edit-btn">${player ? 'Actualizar' : 'Crear'}</button>
    `;
    modalBody.appendChild(form);
    await equipsAvailableOptions();
    const select = form.querySelector('#equip-selection') as HTMLSelectElement | null;
    if (player && select) select.value = String(player.id_equip);

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const newPlayer = getInputsForm(player?.id_jugador ?? null);
        if (!newPlayer) return;

        if (player) {
            await updatePlayer(newPlayer);
        } else {
            await createPlayer(newPlayer);
        }

        const modal = document.querySelector('#modal') as HTMLDivElement;
        const body = modal?.querySelector('.modal-body') as HTMLDivElement;
        if (body) body.innerHTML = '';
        modal?.classList.add('hidden');
    });
}

function getInputsForm(id_jugador: number | null) {
    const form = document.querySelector('#player-form') as HTMLFormElement;
    const nomInput = form.querySelector('#nom') as HTMLInputElement;
    const nacionalitatInput = form.querySelector('#nacionalitat') as HTMLInputElement;
    const equipSelect = form.querySelector('#equip-selection') as HTMLSelectElement;
    const posicioInput = form.querySelector('#posicio') as HTMLInputElement;
    const dorsalInput = form.querySelector('#dorsal') as HTMLInputElement;
    const dataNaixementInput = form.querySelector('#data_naixement') as HTMLInputElement;

    const nom = nomInput.value.trim();
    const nacionalitat = nacionalitatInput.value.trim();
    const id_equip = Number.parseInt(equipSelect.value, 10) || 0;
    const posicio = posicioInput.value.trim();
    const dorsal = Number.parseInt(dorsalInput.value, 10) || 0;
    const data_naixement = dataNaixementInput.value;

    const player: PlayerInterface = {
        id_jugador: id_jugador ?? 0,
        nom,
        nacionalitat,
        id_equip,
        posicio,
        dorsal,
        data_naixement,
    };
    return player;
}

export function showSpinner() {
    let spinner = document.getElementById('spinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'spinner';
        spinner.className = 'spinner';
        const app = document.querySelector('#app');
        app?.appendChild(spinner);
    }
    spinner.classList.remove('hidden');
}

export function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
}
