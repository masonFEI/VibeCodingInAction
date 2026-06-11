const taskList = document.querySelector("#taskList");
const newTaskButton = document.querySelector("#newTaskButton");

taskList.addEventListener("change", (event) => {
  const checkbox = event.target;
  if (!(checkbox instanceof HTMLInputElement)) {
    return;
  }

  checkbox.closest("li")?.classList.toggle("done", checkbox.checked);
});

newTaskButton.addEventListener("click", () => {
  const taskName = window.prompt("请输入任务名称");
  if (!taskName?.trim()) {
    return;
  }

  const item = document.createElement("li");
  item.innerHTML = `
    <label>
      <input type="checkbox" />
      <span></span>
    </label>
    <strong>新</strong>
  `;
  item.querySelector("span").textContent = taskName.trim();
  taskList.prepend(item);
});
