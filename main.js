const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = () => {
  if (inputBox.value === "") {
    alert("Please enter a task");
  } else {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.class = "checkbox";
    li.appendChild(checkbox);
    const textNode = document.createTextNode(inputBox.value);
    li.appendChild(textNode);
    listContainer.appendChild(li);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.class = "delete-button";
    li.appendChild(deleteButton);
  }
  inputBox.value = "";
  saveData();
};

inputBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  (event) => {
    if (event.target.class === "checkbox") {
      event.target.parentElement.classList.toggle("checked");
      saveData();
    } else if (event.target.class === "delete-button") {
      event.target.parentElement.remove();
      saveData();
    }
  },
  false
);

const saveData = () => {
  localStorage.setItem("toDoListData", listContainer.innerHTML);
};

const loadData = () => {
  if (localStorage.getItem("toDoListData")) {
    listContainer.innerHTML = localStorage.getItem("toDoListData");
  }
};

loadData();
