import './public/style.css';
import { showModal } from './src/utils/components';
import { resetData } from './src/utils/data';
import { playersCache,deletePlayer } from './src/models/player';

document.addEventListener('DOMContentLoaded', async () => {
  const createBtn = document.querySelector('#create-player-btn');
  createBtn?.addEventListener('click', () => {
    showModal("create", null);
  });
  resetData()

  const tbody = document.querySelector('#jugadors-table-body') as HTMLTableSectionElement;

  // Delegació de events
  tbody.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('edit-btn')) {
      const id = parseInt(target.dataset.id!);
      const player = playersCache.find(p => p.id_jugador === id) || null;
      showModal("update", player);
    }

    if (target.classList.contains('delete-btn')) {
      const id = parseInt(target.dataset.id!);
      await deletePlayer(id);
      await resetData();
    }
  });
});
