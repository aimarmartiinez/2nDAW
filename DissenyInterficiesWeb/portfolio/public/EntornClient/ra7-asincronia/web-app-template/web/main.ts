import './public/style.css';
import { showModal } from './src/utils/components';
import { resetData } from './src/utils/data';
import { deletePlayer, playersCache } from './src/models/player';

document.addEventListener('DOMContentLoaded', async () => {
  const createBtn = document.querySelector('#create-player-btn');
  createBtn?.addEventListener('click', () => {
    showModal("create", null);
  });

  const tbody = document.querySelector('#jugadors-table-body');
  tbody?.addEventListener('click', async (ev) => {
    const target = ev.target as HTMLElement;
    if (!target) return;

    const button = target.closest('button');
    if (!(button instanceof HTMLButtonElement)) return;

    const id = Number.parseInt(button.dataset.id || '');
    if (isNaN(id)) return;

    if (button.classList.contains('edit-btn')) {
      const player = playersCache.find(p => p.id_jugador === id);
      if (!player) return;
      showModal('update', player);
    } else if (button.classList.contains('delete-btn')) {
      await deletePlayer(id);
    }
  });
  
  await resetData();
});
