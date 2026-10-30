export interface Grup {
  id: string;
  nom: string;
  color: string;
}

export interface Contacte {
  id: string;
  nom: string;
  cognoms: string;
  telefon: string;
  email: string;
  grupId: string;
  favorit: boolean;
  foto?: string | null;
  dataCreacio: string;
}

export type TipusAccio = 'trucada' | 'missatge' | 'email';

export interface Historial {
  id: string;
  contacteId: string;
  tipus: TipusAccio;
  data: string;
  durada?: number;
  missatge?: string;
}
