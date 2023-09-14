window.addEventListener("load", () => {
    const inputText = document.getElementById("input-box");
    const btnSubmit = document.querySelector(".btn-submit");
    const todoList = document.querySelector(".todo-list");
    if (!localStorage.getItem("TODO")) {
        localStorage.setItem("TODO", JSON.stringify([]));
    }
    let LIST = JSON.parse(localStorage.getItem("TODO"));
    let id;
    if (!LIST.length) {
        id = 1;
    } else {
        id = LIST.slice(-1)[0].id + 1;
    }

    LIST.forEach((item) => {
        let newItem = document.createElement("li");
        newItem.classList.add("item");
        if (item.done) {
            newItem.classList.add("done");
        }
        newItem.setAttribute("id-item", item.id);
        newItem.innerHTML = `
                                <div class="check-box"></div>
                                <p class="item-text">${item.name}</p>
                                <div class="trash"></div>`;
        todoList.appendChild(newItem);
    });

    // add new task
    const addTask = () => {
        if (inputText.value === "") {
            alert("You must write something!!!");
            return;
        }
        // create new DOM item
        const newTask = {
            name: inputText.value,
            done: false,
            id: id,
        };
        id++;
        let newItem = document.createElement("li");
        newItem.classList.add("item");
        newItem.setAttribute("id-item", newTask.id);
        let checkBox = document.createElement("div");
        checkBox.classList.add("check-box");
        let itemText = document.createElement("p");
        itemText.classList.add("item-text");
        itemText.textContent = newTask.name;
        let trash = document.createElement("trash");
        trash.classList.add("trash");
        newItem.appendChild(checkBox);
        newItem.appendChild(itemText);
        newItem.appendChild(trash);
        todoList.append(newItem);
        // update local storage
        LIST.push(newTask);
        localStorage.setItem("TODO", JSON.stringify(LIST));
        inputText.value = "";
        inputText.focus();
    };

    btnSubmit.addEventListener("click", () => {
        addTask();
    });

    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 && inputText === document.activeElement) {
            addTask();
        }
    });

    // done and delete task
    todoList.addEventListener("click", (e) => {
        if (e.target.className === "check-box") {
            e.target.parentNode.classList.toggle("done");
            doneTask(e.target.parentNode.getAttributeNode("id-item").value);
        } else if (e.target.className === "trash") {
            todoList.removeChild(e.target.parentNode);
            deleteTask(e.target.parentNode.getAttributeNode("id-item").value);
        }
    });

    const deleteTask = (idHTMLElement) => {
        let LIST1 = LIST.filter((item) => {
            return item.id !== Number(idHTMLElement);
        });
        LIST = LIST1;
        localStorage.setItem("TODO", JSON.stringify(LIST));
    };

    const doneTask = (idHTMLElement) => {
        let LIST1 = LIST.map((item) => {
            if (item.id === Number(idHTMLElement)) {
                let tg = item;
                tg.done = !tg.done;
                return tg;
            }
            return item;
        });
        LIST = LIST1;
        localStorage.setItem("TODO", JSON.stringify(LIST));
    };
});
