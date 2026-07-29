(function () {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveToStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const container = document.createElement("div");
    container.style.maxWidth = "400px";
    container.style.margin = "50px auto";
    container.style.padding = "20px";
    container.style.borderRadius = "10px";
    container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    container.style.backgroundColor = "#fff";
    container.style.fontFamily = "sans-serif";
    document.body.appendChild(container);

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Search tasks...";
    searchInput.style.width = "100%";
    searchInput.style.padding = "8px";
    searchInput.style.marginBottom = "12px";
    searchInput.style.border = "1px solid #ccc";
    searchInput.style.borderRadius = "5px";
    searchInput.style.boxSizing = "border-box";

    const inputGroup = document.createElement("div");
    inputGroup.style.display = "flex";
    inputGroup.style.gap = "5px";

    const input = document.createElement("input");
    input.placeholder = "Enter Task...";
    input.style.flex = "1";
    input.style.padding = "8px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "5px";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.style.padding = "8px 15px";
    addBtn.style.border = "none";
    addBtn.style.backgroundColor = "#007bff";
    addBtn.style.color = "white";
    addBtn.style.borderRadius = "5px";
    addBtn.style.cursor = "pointer";

    inputGroup.append(input, addBtn);

    const taskContainer = document.createElement("div");
    taskContainer.style.marginTop = "20px";

    container.append(searchInput, inputGroup, taskContainer);

    function showTasks() {
        taskContainer.innerHTML = "";
        const query = searchInput.value.toLowerCase().trim();

        for (let i = 0; i < todos.length; i++) {

            if (query !== "" && !todos[i].text.toLowerCase().includes(query)) {
                continue;
            }

            const taskDiv = document.createElement("div");
            taskDiv.style.display = "flex";
            taskDiv.style.justifyContent = "space-between";
            taskDiv.style.alignItems = "center";
            taskDiv.style.padding = "10px";
            taskDiv.style.marginBottom = "8px";
            taskDiv.style.border = "1px solid #eee";
            taskDiv.style.borderRadius = "5px";
            taskDiv.style.backgroundColor = todos[i].completed ? "#e2e2e2" : "#f9f9f9";

            const text = document.createElement("span");
            text.textContent = todos[i].text;
            text.style.flex = "1";
            if (todos[i].completed) {
                text.style.textDecoration = "line-through";
                text.style.color = "#888";
            }

            const btnContainer = document.createElement("div");

            const completeBtn = document.createElement("button");
            completeBtn.textContent = todos[i].completed ? "Undo" : "Done";
            completeBtn.style.marginRight = "5px";
            completeBtn.style.border = "none";
            completeBtn.style.padding = "5px 8px";
            completeBtn.style.borderRadius = "3px";
            completeBtn.style.backgroundColor = "#28a745";
            completeBtn.style.color = "white";
            completeBtn.style.cursor = "pointer";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.style.marginRight = "5px";
            editBtn.style.border = "none";
            editBtn.style.padding = "5px 8px";
            editBtn.style.borderRadius = "3px";
            editBtn.style.backgroundColor = "#ffc107";
            editBtn.style.color = "black";
            editBtn.style.cursor = "pointer";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.border = "none";
            deleteBtn.style.padding = "5px 8px";
            deleteBtn.style.borderRadius = "3px";
            deleteBtn.style.backgroundColor = "#dc3545";
            deleteBtn.style.color = "white";
            deleteBtn.style.cursor = "pointer";

            completeBtn.onclick = function () {
                todos[i].completed = !todos[i].completed;
                saveToStorage();
                showTasks();
            };

            editBtn.onclick = function () {
                const newTask = prompt("Edit Task", todos[i].text);
                if (newTask !== null && newTask.trim() !== "") {
                    todos[i].text = newTask.trim();
                    saveToStorage();
                    showTasks();
                }
            };

            deleteBtn.onclick = function () {
                todos.splice(i, 1);
                saveToStorage();
                showTasks();
            };

            btnContainer.append(completeBtn, editBtn, deleteBtn);
            taskDiv.append(text, btnContainer);
            taskContainer.append(taskDiv);
        }
    }

    function addTask() {
        const task = input.value.trim();
        if (task === "") {
            return;
        }

        todos.push({ text: task, completed: false });
        saveToStorage();
        input.value = "";
        showTasks();
    }

    addBtn.onclick = addTask;

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    searchInput.addEventListener("input", showTasks);

    showTasks();
})(); 