// Get Elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");

// Add Task
addBtn.addEventListener("click", () => {
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  // Create Elements
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");

  span.textContent = task;
  delBtn.textContent = "Delete";

  // Mark Complete
  span.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  // Delete Task
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  input.value = "";
});

// Clear All
clearBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
});
