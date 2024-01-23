const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = ({ text, done }) => {
  // if (inputBox.value === "") {
  //   alert("Please enter a task");
  // } else {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.class = "checkbox";
  li.appendChild(checkbox);
  const textNode = document.createTextNode(text);
  li.appendChild(textNode);
  listContainer.appendChild(li);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.class = "delete-button";
  li.appendChild(deleteButton);
  // }
  // inputBox.value = "";
  // saveData();
};

const formElement = document.querySelector("form");
formElement.addEventListener("submit", (e) => {
  event.preventDefault();

  const formData = new FormData(formElement);
  for (const [key, value] of formData) {
    const currentData =
      localStorage.getItem("toDoListData") ?? JSON.stringify([]);
    let parsedData = [];
    if (currentData) {
      parsedData = JSON.parse(currentData);
    }

    localStorage.setItem(
      "toDoListData",
      JSON.stringify([...parsedData, { text: value, done: false }]),
    );

    addTask({ text: value, done: false });
  }
  formElement.reset();
});

// inputBox.addEventListener("keyup", (event) => {
//   if (event.key === "Enter") {
//     addTask();
//   }
// });

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
  false,
);

const saveData = () => {
  localStorage.setItem("toDoListData", listContainer.innerHTML);
};

const loadData = () => {
  if (localStorage.getItem("toDoListData")) {
    const currentData =
      localStorage.getItem("toDoListData") ?? JSON.stringify([]);
    let parsedData = [];
    if (currentData) {
      parsedData = JSON.parse(currentData);
    }

    parsedData.forEach((item) => {
      addTask({ text: item.text, done: item.done });
    });

    // listContainer.innerHTML = localStorage.getItem("toDoListData");
  }
};

loadData();
