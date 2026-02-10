const STORAGE_KEY = "todo_tasks";

let currentProject = "ALL";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const searchInput = document.querySelector(".search input");

  if (!searchInput) {
    console.error("Search input not found");
    return;
  }

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTasks(getTasks());
  });
});

// --------------------
// ADD TASK
// --------------------
function addTask() {
  const taskName = prompt("Enter new task:");
  if (!taskName) return;

  const project = document.getElementById("projectSelect").value;
  const section = document.getElementById("sectionSelect").value;

  const tasks = getTasks();

  tasks.push({
    text: taskName,
    done: false,
    status: "Working",
    project,
    section,
  });

  saveTasks(tasks);
  renderTasks(tasks);
}

// --------------------
// SELECT PROJECT
// --------------------
function selectProject(project) {
  currentProject = project;

  searchQuery = "";
  const input = document.querySelector(".search input");
  if (input) input.value = "";

  renderTasks(getTasks());
}

// --------------------
// RENDER TASKS
// --------------------
function renderTasks(tasks) {
  const todayContainer = document.querySelector(".today");
  const upcomingContainer = document.querySelector(".upcoming");

  todayContainer.querySelectorAll(".task").forEach((t) => t.remove());
  upcomingContainer.querySelectorAll(".task").forEach((t) => t.remove());

  tasks.forEach((task, index) => {
    // project filter
    if (currentProject !== "ALL" && task.project !== currentProject) return;

    // search filter
    if (
      searchQuery &&
      !task.text.toLowerCase().includes(searchQuery) &&
      !task.project.toLowerCase().includes(searchQuery)
    )
      return;

    const taskEl = document.createElement("div");
    taskEl.className = "task";

    taskEl.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <div style="display:flex; gap:10px; align-items:center;">
        <span class="status ${getStatusClass(task.status)}">${task.status}</span>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    taskEl.querySelector("input").addEventListener("change", (e) => {
      task.done = e.target.checked;
      task.status = e.target.checked ? "Done" : "Working";
      saveTasks(tasks);
      renderTasks(tasks);
    });

    taskEl.querySelector(".status").addEventListener("click", () => {
      task.status = nextStatus(task.status);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    taskEl.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    task.section === "today"
      ? todayContainer.appendChild(taskEl)
      : upcomingContainer.appendChild(taskEl);
  });
}

// --------------------
// STATUS HELPERS
// --------------------
function nextStatus(status) {
  if (status === "Working") return "Done";
  if (status === "Done") return "Pending";
  return "Working";
}

function getStatusClass(status) {
  if (status === "Done") return "approved";
  if (status === "Working") return "progress";
  return "waiting";
}

// --------------------
// STORAGE
// --------------------
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function loadTasks() {
  renderTasks(getTasks());
}

// --------------------
// CLEAR ALL
// --------------------
function clearAllTasks() {
  if (!confirm("Delete ALL tasks?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderTasks([]);
}
