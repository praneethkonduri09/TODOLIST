window.onload = () => {
    const items = document.getElementById("items");
    const message = document.getElementById("message");

    document.querySelector(".inp button").addEventListener("click", addItem);
    items.addEventListener("click", handleTaskClick);

    // Check if there are already tasks in the list, and update the message accordingly.
    updateMessage();
};

function updateMessage() {
    const itemsList = document.getElementById("items");
    const message = document.getElementById("message");

    if (itemsList.children.length > 0) {
        message.textContent = "Pending Tasks:";
    } else {
        message.textContent = "No Pending Tasks Yet";
    }
}

function addItem() {
    const newItem = document.getElementById("item").value.trim();
    if (newItem === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    const editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit";
    editButton.appendChild(document.createTextNode("Edit"));

    li.appendChild(document.createTextNode(newItem));
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    items.appendChild(li);

    document.getElementById("item").value = "";

    document.getElementById("lblsuccess").innerHTML = "Task added successfully";
    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
        document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

    // Update the message.
    updateMessage();
}

function handleTaskClick(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you Sure?")) {
            const li = e.target.parentNode;
            items.removeChild(li);

            document.getElementById("lblsuccess").innerHTML = "Task deleted successfully";
            document.getElementById("lblsuccess").style.display = "block";

            setTimeout(function () {
                document.getElementById("lblsuccess").style.display = "none";
            }, 3000);

            // Update the message.
            updateMessage();
        }
    }
    if (e.target.classList.contains("edit")) {
        const listItem = e.target.parentNode;
        const taskText = listItem.childNodes[0].textContent;
        document.getElementById("item").value = taskText;

        // Change the button text to "Save" while in edit mode.
        e.target.textContent = "Save";
        e.target.classList.add("edit-mode");

        // Add an event listener to save the edited task.
        e.target.removeEventListener("click", handleTaskClick);
        e.target.addEventListener("click", editTask);
    }
}

function editTask(e) {
    const editedText = document.getElementById("item").value.trim();
    if (editedText === "") return;

    const listItem = e.target.parentNode;
    listItem.childNodes[0].textContent = editedText;

    // Exit edit mode.
    e.target.textContent = "Edit";
    e.target.classList.remove("edit-mode");

    // Change the event listener back to handleTaskClick.
    e.target.removeEventListener("click", editTask);
    e.target.addEventListener("click", handleTaskClick);

    document.getElementById("item").value = "";

    document.getElementById("lblsuccess").innerHTML = "Task edited successfully";
    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
        document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

    // Update the message.
    updateMessage();
}
