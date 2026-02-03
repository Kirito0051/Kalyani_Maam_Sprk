const studentNameInput = document.getElementById("studentName");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const studentList = document.getElementById("studentList");

// Add student
addBtn.addEventListener("click", function () {
  const name = studentNameInput.value.trim();

  if (name === "") {
    alert("Please enter a student name");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${name}</span>
    <div>
      <button class="presentBtn">Present</button>
      <button class="absentBtn">Absent</button>
      <button class="deleteBtn">Delete</button>
    </div>
  `;

  studentList.appendChild(li);
  studentNameInput.value = "";

  const presentBtn = li.querySelector(".presentBtn");
  const absentBtn = li.querySelector(".absentBtn");
  const deleteBtn = li.querySelector(".deleteBtn");

  presentBtn.addEventListener("click", function () {
    li.classList.add("present");
    li.classList.remove("absent");
  });

  absentBtn.addEventListener("click", function () {
    li.classList.add("absent");
    li.classList.remove("present");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });
});

// Reset all
resetBtn.addEventListener("click", function () {
  studentList.innerHTML = "";
});
