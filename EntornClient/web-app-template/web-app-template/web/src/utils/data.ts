import { showSpinner, hideSpinner } from "./components";
import { showPlayers, getPlayers } from "../models/player";
import {getTeams} from "../models/team";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-CA');
  return formattedDate;
};

export async function fetchData() {
  await getPlayers();
  await getTeams();
};

export async function resetData(){
  showSpinner();
  await fetchData();
  showPlayers();
  hideSpinner();
}
