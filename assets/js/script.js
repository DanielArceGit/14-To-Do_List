// variables
const addTaskBtn = document.getElementById("add-task-button");
const listTask = document.getElementById("list");
let totalTask = 3;

// array
const tasks = [
  {
    id: Date.now(),
    description: "Primera Tarea",
    ID: 1,
    completed: false,
  },
  {
    id: Date.now() + 1,
    description: "Segunda Tarea",
    ID: 2,
    completed: false,
  },
  {
    id: Date.now() + 2,
    description: "Tercera Tarea",
    ID: 3,
    completed: false,
  },
];

// Pintar las tareas en HTML
const renderTasks = () => {
  let html = "";
  for (const task of tasks) {
    html += `
    <p data-id="${task.id}"><span>${task.ID}</span>
      ${task.description}
      <input type="checkbox" class="task-checkbox" ${
        task.completed ? "checked" : ""
      }>
      <button type="button" class="btn btn-danger btn-sm ms-2 delete-button">
        <i class="fa-solid fa-trash fa-1x"></i>
      </button>
    </p>
    `;
  }
  listTask.innerHTML = html;
  addCheckboxEvents();
  addDeleteEvents();
};

// Contando tareas realizadas
const addCheckboxEvents = () => {
  const checkboxes = document.querySelectorAll(".task-checkbox");
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", function (event) {
      const parentP = event.target.closest("p");
      const taskId = parentP.getAttribute("data-id");
      toggleTaskCompleted(taskId);
      updateCompletedTasksCount();
    });
  }
};

const toggleTaskCompleted = (taskId) => {
  const task = tasks.find((t) => t.id == taskId);
  if (task) {
    task.completed = !task.completed;
  }
};

const updateCompletedTasksCount = () => {
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const completedTasksElement = document.getElementById("completedTasks");
  completedTasksElement.textContent = completedTasksCount;
};

// Calculando total tareas
const countTotalTasks = () => {
  const totalTasksElement = document.getElementById("totalTasks");
  const total = tasks.length;
  totalTasksElement.textContent = total;
};

// Agregar una nueva tarea
const addTask = () => {
  const inputTask = document.getElementById("input").value;
  const newTask = {
    id: Date.now(),
    description: inputTask,
    ID: ++totalTask,
    completed: false,
  };

  tasks.push(newTask);
  renderTasks();
  document.getElementById("input").value = "";
  renderTasks();
  countTotalTasks();
};

// click event
addTaskBtn.addEventListener("click", addTask);

// Borrar tareas
const addDeleteEvents = () => {
  const deleteButtons = document.querySelectorAll(".delete-button");
  for (const button of deleteButtons) {
    button.addEventListener("click", function (event) {
      const parentP = event.target.closest("p");
      const taskId = parentP.getAttribute("data-id");
      deleteTask(taskId);
      renderTasks();
      countTotalTasks();
    });
  }
};

const deleteTask = (taskId) => {
  const index = tasks.findIndex((t) => t.id == taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
};

// Resetar tareas
window.addEventListener("load", function () {
  document.getElementById("input").value = "";
  renderTasks();
  updateCompletedTasksCount();
  countTotalTasks();
});
// --------------------------------------------------------------
// me quiero morir :´)