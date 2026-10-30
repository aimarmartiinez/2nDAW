import type { PlayerInterface} from '../types/interfaces';
import { formatDate, resetData } from '../utils/data';
import {teamsCache} from './team'

export let playersCache: PlayerInterface[] = [];

export async function getPlayers(): Promise<PlayerInterface[]> {
  try {
    const respone = await fetch('/api/jugadors');
    if (!respone.ok) {
      throw new Error(`HTTP error! status: ${respone.status}`);
    }

    const data = await respone.json();
    playersCache = data;

    return playersCache;

  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
}

export function showPlayers(): void {
  const tbody = document.querySelector('#jugadors-table-body') as HTMLTableSectionElement;
  tbody.innerHTML = '';
  playersCache.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${player.nom}</td>
      <td>${player.nacionalitat}</td>
      <td>${getPlayerTeamName(player.id_equip)}</td>
      <td>${player.posicio}</td>
      <td>${player.dorsal}</td>
      <td>${formatDate(player.data_naixement)}</td>
      <td>
        <button class="edit-btn" data-id="${player.id_jugador}">Editar</button>
        <button class="delete-btn" data-id="${player.id_jugador}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
};

export async function createPlayer(player: PlayerInterface): Promise<void> {
  try {
    const data = player;
    const response = await fetch('/api/jugadors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert('Error creant:' + player.nom);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert('Jugador creat correctament');
    await resetData();
  } catch (error) {
    console.error('Error creating player:', error);
  }
};

export async function updatePlayer(player: PlayerInterface): Promise<void> {
  try {
    const response = await fetch(`/api/jugadors/${player.id_jugador}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      alert('Error actualitzant:' + player.nom);
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      alert('Player updated successfully');
      await resetData();
    }
  } catch (error) {
    console.error('Error updating player:', error);
  }
};

export async function deletePlayer(id_jugador: number):Promise<void> {
  try {
    const response = await fetch(`/api/jugadors/${id_jugador}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }else{
      alert('Player deleted successfully');
      await resetData();
    }
  } catch (error) {
    console.error('Error deleting player:', error);
  }
};
//para mostrar en la tabla y formulario el nombre del equipo en vez del id.
export function getPlayerTeamName(id_equip: number): string {
  const team = teamsCache.find(team => team.id_equip === id_equip);
  if (team) {
    return team.nom;
  }
  return 'undefined';
};
