const $taskInput = document.getElementById("taskInput");
const $taskButton = document.getElementById("taskButton");
const $taskList = document.getElementById("taskList");

const tasks = [];

function newTask() {
  const taskName = $taskInput.value;
  if (taskName.trim() === "") {
    alert("Nazwa zadania nie może być pusta.");
  } else {
    tasks.push({ name: taskName, isEdit: false });
    $taskInput.value = "";
    showTasks();
  }
}

function showTasks() {
  $taskList.innerHTML = "";
  tasks.forEach((task, e) => {
    const newLi = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task.name;
    const editButton = document.createElement("button");
    editButton.textContent = "Edycja";
    editButton.classList.add("edit-button");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("delete-button");
    editButton.addEventListener("click", () => {
      editTask(e, editButton);
    });
    deleteButton.addEventListener("click", () => {
      deleteTask(e);
    });
    newLi.appendChild(taskText);
    newLi.appendChild(editButton);
    newLi.appendChild(deleteButton);
    $taskList.appendChild(newLi);
  });
}

function editTask(e, editButton) {
  const task = tasks[e];
  const taskText = document.querySelectorAll("li")[e].querySelector("span");
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.name;
  taskText.replaceWith(input);
  editButton.textContent = "Zatwierdź zmiany";
  editButton.removeEventListener("click", () => {
    editTask(e, editButton);
  });
  editButton.addEventListener("click", () => {
    const newName = input.value.trim();
    if (newName === "") {
      alert("Nazwa zadania nie może być pusta.");
    } else {
      tasks[e].name = newName;
      showTasks();
    }
  });
}

function deleteTask(e) {
  tasks.splice(e, 1);
  showTasks();
}

$taskButton.addEventListener("click", newTask);
