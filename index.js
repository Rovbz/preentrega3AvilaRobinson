const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');

// Cargar tareas desde el LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTaskToDOM(task);
  });
}

// Guardar tareas en el LocalStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Agregar una tarea al DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task">${task}</span>
    <span class="delete">Eliminar</span>
  `;
  taskList.appendChild(li);

  const taskElement = li.querySelector('.task');
  taskElement.addEventListener('click', toggleTaskCompletion);

  const deleteButton = li.querySelector('.delete');
  deleteButton.addEventListener('click', () => {
    deleteTask(li);
  });
}

// Agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    saveTasksToLocalStorage(tasks);

    taskInput.value = '';
  }
}

// Marcar o desmarcar una tarea como completada
function toggleTaskCompletion(event) {
  const taskElement = event.target;
  taskElement.classList.toggle('completed');

  const taskText = taskElement.textContent;
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => {
    if (task.text === taskText) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToLocalStorage(updatedTasks);
}

// Eliminar una tarea
function deleteTask(taskElement) {
  const taskText = taskElement.querySelector('.task').textContent;
  taskElement.remove();

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  saveTasksToLocalStorage(updatedTasks);
}

// Limpiar tareas completadas
function clearCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const remainingTasks = tasks.filter(task => !task.completed);
  taskList.innerHTML = '';
  remainingTasks.forEach(task => {
    addTaskToDOM(task.text);
  });
  saveTasksToLocalStorage(remainingTasks);
}

// Agregar evento al botón "Agregar"
addButton.addEventListener('click', addTask);

// Agregar evento al botón "Limpiar Completadas"
clearButton.addEventListener('click', clearCompletedTasks);

// Cargar tareas al cargar la página
loadTasks();

