const STORAGE_KEY = "todo_tasks";

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskName = prompt("Enter new task:");
  if (!taskName) return;

  const tasks = getTasks();
  tasks.push({
    text: taskName,
    done: false,
    status: "Working",
  });

  saveTasks(tasks);
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const container = document.querySelector(".today");

  // Clear UI first
  container.querySelectorAll(".task").forEach((t) => t.remove());

  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    taskEl.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.done ? "checked" : ""}/>
                <span>${task.text}</span>
            </div>

            <div style="display:flex; gap:10px; align-items:center;">
                <span class="status ${getStatusClass(task.status)}">
                    ${task.status}
                </span>
                <button class="delete-btn">
                <img src="img/trash.png" alt="Delete">
                </button>
            </div>
        `;

    // checkbox
    taskEl.querySelector("input").addEventListener("change", (e) => {
      task.done = e.target.checked;
      task.status = e.target.checked ? "Done" : "Working";
      saveTasks(tasks);
      renderTasks(tasks);
    });

    // status cycle
    taskEl.querySelector(".status").addEventListener("click", () => {
      task.status = nextStatus(task.status);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    // delete single task
    taskEl.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    });

    container.appendChild(taskEl);
  });
}

function nextStatus(current) {
  if (current === "Working") return "Done";
  if (current === "Done") return "Pending";
  return "Working";
}

function getStatusClass(status) {
  if (status === "Done") return "approved";
  if (status === "Working") return "progress";
  return "waiting";
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function loadTasks() {
  renderTasks(getTasks());
}

function clearAllTasks() {
  if (!confirm("Delete ALL tasks?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderTasks([]);
}
