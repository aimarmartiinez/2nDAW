const button = document.querySelector('button');
const input = document.querySelector('input');
const todoColumn = document.getElementById('todo');
const inProgressColumn = document.getElementById('in_progress');
const doneColumn = document.getElementById('done');
let taskDragged: HTMLElement | null = null;

if (button && input && todoColumn && inProgressColumn && doneColumn) {
  const columns = [todoColumn, inProgressColumn, doneColumn];

  for (const column of columns) {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();
      if (taskDragged) {
        column.appendChild(taskDragged);
      }
    });
  }

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
      const taskElement = document.createElement('div');
      taskElement.className = 'task';
      taskElement.draggable = true;
      taskElement.textContent = task;
      taskElement.addEventListener('dragstart', () => {
        taskDragged = taskElement;
      });
      taskElement.addEventListener('dragend', () => {
        taskDragged = null;
      });
      todoColumn.appendChild(taskElement);
      input.value = '';
    }
  });
}
