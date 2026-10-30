import type { TeamInterface } from "../types/interfaces";

export let teamsCache: TeamInterface[];

//fetch teams
export async function getTeams() {
  try {
    const response = await fetch('/api/equips');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    teamsCache = data.teams;
    return teamsCache;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

export async function equipsAvailableOptions(): Promise<void> {
  if (!teamsCache) {
    teamsCache = await getTeams();
  };
  const select = document.querySelector('#equip-selection') as HTMLSelectElement;
  teamsCache!.forEach(team => {
    const option = document.createElement('option');
    //asignamos valor el id para que al actualizard/guardar, obtengamos del input este valor
    option.value = team.id_equip.toString();
    option.textContent = team.nom; //solo muestro el nombre del equipo, no afecta al valor del select, es el id el valor que cogemos.
    select.appendChild(option);
  });
  return
}