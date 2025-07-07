// Load existing tasks on page load
window.onload = () => {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("input-task");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">🗑</button>
  `;

  taskList.appendChild(li);
  saveTasks();
  input.value = "";
}

function toggleComplete(element) {
  element.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById("task-list");
  const tasks = [];

  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (!stored) return;

  const tasks = JSON.parse(stored);
  const taskList = document.getElementById("task-list");

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task.text}</span>
      <button onclick="deleteTask(this)">🗑</button>
    `;

    taskList.appendChild(li);
  });
}
