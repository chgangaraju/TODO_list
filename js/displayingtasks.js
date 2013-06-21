/**
 * -------------------------------------------------------
 *  CREATION OF CHECKBOX, LABEL, CLEAR BUTTON AND EDIT BOX
 *  ------------------------------------------------------
 */
function createNewDivContainer(id) {
    "use strict"
    var taskObj = tasks[id],
        label = createNewLabel(id, taskObj.isDone, taskObj.task),
        checkBox = createNewCheckBox(id, taskObj.isDone),
        button = createNewClearButton(id),
        taskContainer = document.createElement("div");

    taskContainer.id = "task_container_" + id;
    taskContainer.className = "task_container";
    taskContainer.appendChild(checkBox);
    taskContainer.appendChild(label);
    taskContainer.appendChild(button);
    taskContainer.onmouseover = function () {
        taskMouseOver(id);
    }
    taskContainer.onmouseout = function () {
        taskMouseOut(id);
    }
    return taskContainer;
}
function createNewEditDiv(id) {
    "use strict"
    var editTextBox = createNewEditBox(id),
        editContainer = document.createElement("div");

    editContainer.id = "task_editbox_" + id;
    editContainer.className = "task_editbox";
    editContainer.appendChild(editTextBox);

    return editContainer;
}
function createNewCheckBox(id, checked) {
    "use strict"
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "task_checkbox_" + id;
    checkBox.className = "task_checkbox";
    checkBox.checked = checked;
    checkBox.onclick = function () {
        checkTask(id);
    }
    return checkBox;
}
function createNewLabel(id, isDone, taskData) {
    "use strict"
    var label = document.createElement("label");
    label.innerHTML = taskData;
    label.id = "task_label_" + id;

    if (isDone) {
        label.className = "task_label completed_task";
    } else {
        label.className = "task_label";
    }
    return label;
}
function createNewClearButton(id) {
    "use strict"
    var button = document.createElement("a");
    button.href = "javascript:clearTask(" + id + ")";
    button.className = "task_button";
    button.id = "task_button_" + id;
    button.innerHTML = "<img src='img/icon_delete.gif'> ";
    button.style.visibility = "hidden";
    return button;
}
function createNewEditBox(id) {
    "use strict"
    var textBox = document.createElement("input");
    textBox.type = "text";
    textBox.className = "task_edit_textbox";
    textBox.id = "task_edit_textbox_" + id;
    textBox.value = tasks[id].task;

    textBox.onkeyup = function (e) {
        if (( this.value.length < 1)) {
            // disabling events for empty text box
            activeEditBox.isActive = false;
            return;
        } else {
            activeEditBox.isActive = true;
        }
        if (e.keyCode != 13) {
            return;
        }
        updateTask(id);
        hideEditBox(id);
    }
    // stop hiding edit box when click inside text box
    textBox.onclick = function (e) {
        e.stopPropagation();
    }
    return textBox;
}

/**
 * -------------------------------
 *       DISPLAYING TASKS
 * -------------------------------
 */
function tasksReload() {
    "use strict"
    var tasks_body = document.getElementById("tasks_body"),
        tasksLeftLabel = document.getElementById("tasks_left_label"),
        tasksClearDiv = document.getElementById("tasks_remaining"),
        tasksCompletedLabel = document.getElementById("completed_items_label");
    // clearing output
    tasks_body.innerHTML = "";
    tasksClearDiv.style.visibility = "hidden";
    checkAndMarkAllTasks();
    // initially i assuming that all tasks left i.e no tasks completed
    tasksLeftLabel.innerHTML = (tasks.length).toString();
    tasksCompletedLabel.innerHTML = "0";
    for (var id in tasks) {
        displayTask(id);
        if (tasks[id].isDone) {
            incrementTaskCompletedCounter();
            decrementTaskLeftCounter();
        }

    }
    if (tasks.length < 1) {
        toggleTaskHeaderFooter(true);
    }
}

function displayTask(id) {
    "use strict"
    var tasksBody = document.getElementById("tasks_body"),
        taskDiv = document.createElement("div"),
        taskContainer = createNewDivContainer(id),
        taskEditContainer = createNewEditDiv(id);

    taskDiv.className = "task";
    taskDiv.id = "task_" + id;

    taskDiv.onmousedown = OnMouseDown;
    taskDiv.onmouseup = OnMouseUp;
    taskDiv.onmouseover = reOrderTasks;

    taskDiv.appendChild(taskContainer);
    taskDiv.appendChild(taskEditContainer);
    taskDiv.ondblclick = function () {
        displayEditBox(id);
    }
    tasksBody.appendChild(taskDiv);
}

