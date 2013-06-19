/**
 * Created with JetBrains WebStorm.
 * User: dilip
 * Date: 18/6/13
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */

var tasks = new Array();
// this variable for storing current edited box. to enable event handler
var activeEditBox = {
    isActive: false,
    id: 0
};

function hideEditBoxIfActive() {
    if (activeEditBox.isActive) {
        updateTask(activeEditBox.id);
        hideEditBox(activeEditBox.id);
    }
}

/**
 *  CREATION OF CHECKBOX, LABEL, CLEAR BUTTON AND EDIT BOX
 *  ------------------------------------------------------
 */
function createNewDivContainer(id) {
    var taskObj = tasks[id],
        newLabel = createNewLabel(id, taskObj.isDone, taskObj.task),
        newCheckBox = createNewCheckBox(id, taskObj.isDone),
        button = createNewClearButton(id),
        newDivContainer = document.createElement("div");

    newDivContainer.id = "task_container_" + id;
    newDivContainer.className = "task_container";
    newDivContainer.appendChild(newCheckBox);
    newDivContainer.appendChild(newLabel);
    newDivContainer.appendChild(button);
    newDivContainer.onmouseover = function () {
        taskMouseOver(id);
    }
    newDivContainer.onmouseout = function () {
        taskMouseOut(id);
    }
    return newDivContainer;
}
function createNewEditDiv(id) {
    var editTextBox = createNewEditBox(id),
        newDivEditBox = document.createElement("div");

    newDivEditBox.id = "task_editbox_" + id;
    newDivEditBox.className = "task_editbox";
    newDivEditBox.appendChild(editTextBox);

    return newDivEditBox;
}
function createNewCheckBox(id, checked) {
    "use strict"
    var newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = "task_checkbox_" + id;
    newCheckBox.className = "task_checkbox";
    newCheckBox.checked = checked;
    newCheckBox.style.width = "20px";
    newCheckBox.style.borderRadius = "4px";
    newCheckBox.style.height = "20px";
    newCheckBox.style.margin = "4px 4px 4px 4px";
    newCheckBox.onclick = function () {
        checkTask(id);
    }
    return newCheckBox;
}
function createNewLabel(id, isDone, taskData) {
    var newLabel = document.createElement("label");
    newLabel.innerHTML = taskData;
    newLabel.id = "task_label_" + id;

    if (isDone) {
        newLabel.className = "task_label completed_task";
    } else {
        newLabel.className = "task_label";
    }
    return newLabel;
}
function createNewClearButton(id) {
    "use strict"
    var newButton = document.createElement("a");
    newButton.href = "javascript:clearTask(" + id + ")";
    newButton.className = "task_button";
    newButton.id = "task_button_" + id;
    newButton.innerHTML = "<img src='img/icon_delete.gif'> ";
    newButton.style.visibility = "hidden";
    return newButton;
}
function createNewEditBox(id) {
    "use strict"
    var newTextBox = document.createElement("input");
    newTextBox.type = "text";
    newTextBox.className = "task_edit_textbox";
    newTextBox.id = "task_edit_textbox_" + id;
    newTextBox.value = tasks[id].task;

    newTextBox.onkeyup = function (e) {
        if (e.keyCode != 13) {
            return;
        }
        updateTask(id);
        hideEditBox(id);
    }
    // stop hiding edit box when click inside text box
    newTextBox.onclick = function (e) {
        e.stopPropagation();
    }
    return newTextBox;
}

function getMarkAllButton() {
    "use strict"
    return "";
}
function getlistTasksFooter() {
    "use strict"
    return "";
}

/**
 * HIDING AND UN HIDING CLEAR TASK BUTTON ON MOUSE EVENTS
 * -------------------------------------------------------
 */
function taskMouseOver(id) {
    "use strict"
    var taskButtonId = "task_button_" + id,
        taskButton = document.getElementById(taskButtonId);
    taskButton.style.visibility = "visible";
}
function taskMouseOut(id) {
    "use strict"
    var taskButtonId = "task_button_" + id,
        taskButton = document.getElementById(taskButtonId);
    taskButton.style.visibility = "hidden";
}


//display edit box
function displayEditBox(id) {
    var divTaskContainer = document.getElementById('task_container_' + id),
        divEditBox = document.getElementById('task_editbox_' + id);
    divTaskContainer.style.display = "none";
    divEditBox.style.display = "block";
    activeEditBox.isActive = true;
    activeEditBox.id = id;
}
//hide editBox
function hideEditBox(id) {
    var divTaskContainer = document.getElementById('task_container_' + id),
        divEditBox = document.getElementById('task_editbox_' + id);
    divTaskContainer.style.display = "block";
    divEditBox.style.display = "none";
}
/**
 * -------------------------------------------
 * TASK MANIPULATION FUNCTIONS
 * ---------------------------------------------
 */

function createTask(e) {
    "use strict"
    if (e.keyCode != 13) {
        return;
    }
    var inputBox = document.getElementById("todoTextInputBox");
    var taskObject = {
        isDone: false,
        task: inputBox.value
    };
    tasks.push(taskObject);
    displayTask(tasks.length - 1);
    inputBox.value = "";
}

function checkAllTasks() {
    "use strict"
    var checkAllBox = document.getElementById('mark-all-checkbox');
    for(var id in tasks) {
        tasks[id].isDone = checkAllBox.checked;
    }
    tasksReload();
}

function checkTask(id) {
    "use strict"
    var checkBox = document.getElementById('task_checkbox_' + id),
        taskLabel = document.getElementById('task_label_' + id);
    if (checkBox.checked == true) {
        tasks[id].isDone = true;
        taskLabel.className = "task_label completed_task";
    } else {
        tasks[id].isDone = false;
        taskLabel.className = "task_label";
    }
}

function updateTask(id) {
    var editInputBox = document.getElementById('task_edit_textbox_' + id),
        taskLabel = document.getElementById('task_label_' + id),
        newValue = editInputBox.value;
    taskLabel.innerHTML = newValue;
    tasks[id].task = newValue;
}

// delete task from the list
function clearTask(id) {
    "use strict"
    tasks.splice(id, 1);
    tasksReload();
}


/**
 * -------------------------------
 *       DISPLAYING TASKS
 * -------------------------------
 */
function tasksReload() {
    "use strict"
    var tasks_body = document.getElementById("tasks_body");
    // clearing output
    tasks_body.innerHTML = "";
    for (var id in tasks) {
        displayTask(id);
    }
}

function displayTask(id) {
    "use strict"
    var tasks_body = document.getElementById("tasks_body"),
        newDiv = document.createElement("div"),
        newDivContainer = createNewDivContainer(id),
        newDivEditBox = createNewEditDiv(id);

    newDiv.className = "task";
    newDiv.id = "task_" + id;


    newDiv.appendChild(newDivContainer);
    newDiv.appendChild(newDivEditBox);
    newDiv.ondblclick = function () {
        displayEditBox(id);
    }
    tasks_body.appendChild(newDiv);
}
