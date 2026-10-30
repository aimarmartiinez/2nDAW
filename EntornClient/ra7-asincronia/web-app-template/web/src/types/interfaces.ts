export interface PlayerInterface {
  id_jugador: number;
  nom: string;
  data_naixement: string;
  nacionalitat: string;
  posicio: string;
  dorsal: number;
  id_equip: number;
}

export interface TeamInterface {
  id_equip: number;
  nom: string;
}