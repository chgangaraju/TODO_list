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


/**
 * -------------------------------------------------------
 *  CREATION OF CHECKBOX, LABEL, CLEAR BUTTON AND EDIT BOX
 *  ------------------------------------------------------
 */
function createNewDivContainer(id) {
    "use strict"
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
    "use strict"
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
    "use strict"
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
        if(( this.value.length < 1) ) {
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
 * --------------------------------------------------------
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

/**
 * --------------------------------------
 * Hiding and displaying edit boxes
 * ---------------------------------------
 */

function hideEditBoxIfActive() {
    "use strict"
    if (activeEditBox.isActive) {
        updateTask(activeEditBox.id);
        hideEditBox(activeEditBox.id);
    }
}

//display edit box
function displayEditBox(id) {
    "use strict"
    var divTaskContainer = document.getElementById('task_container_' + id),
        divEditBox = document.getElementById('task_editbox_' + id);
    divTaskContainer.style.display = "none";
    divEditBox.style.display = "block";
    activeEditBox.isActive = true;
    activeEditBox.id = id;
}
//hide editBox
function hideEditBox(id) {
    "use strict"
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
    var inputBox = document.getElementById("todoTextInputBox");
    if ( (inputBox.value.length) < 1 ||e.keyCode != 13) {
        return;
    }
    var taskObject = {
        isDone: false,
        task: inputBox.value
    };
    tasks.push(taskObject);
    displayTask(tasks.length - 1);
    inputBox.value = "";
    incrementTaskLeftCounter();
    hideAndUnhideTaskHeaderFooter(false);
    checkAndMarkAllTasks();
}

function checkAllTasks() {
    "use strict"
    var checkAllBox = document.getElementById('mark-all-checkbox');
    for(var id in tasks) {
        tasks[id].isDone = checkAllBox.checked;
    }
    tasksReload();
}
function checkAndMarkAllTasks() {
    "use strict"
    var checkAllBox = document.getElementById('mark-all-checkbox');
    for(var id in tasks) {
        if(!tasks[id].isDone) {
            checkAllBox.checked = false;
            return;
        }
    }
    checkAllBox.checked = true;
}

function checkTask(id) {
    "use strict"
    var checkBox = document.getElementById('task_checkbox_' + id),
        taskLabel = document.getElementById('task_label_' + id),
        checkAllBox = document.getElementById('mark-all-checkbox');
    if (checkBox.checked == true) {
        tasks[id].isDone = true;
        taskLabel.className = "task_label completed_task";
        checkAndMarkAllTasks();
        // updating counters
        incrementTaskCompletedCounter();
        decrementTaskLeftCounter();
    } else {
        tasks[id].isDone = false;
        taskLabel.className = "task_label";
        //simply un checking mark all button
        checkAllBox.checked = false;
        // updating counters
        incrementTaskLeftCounter();
        decrementTaskCompletedCounter();
    }
}

function updateTask(id) {
    "use strict"
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
function clearAllCompletedItems() {
    "use strict"
    var length = tasks.length;
    for(var i = 0; i < length; i++) {
        if(tasks[i].isDone) {
            // removing task from the array
            tasks.splice(i,1);
            // adjusting changing indexes
            i--;
            length--;
        }
    }
    tasksReload();
}

/**
 * ------------------------------------------------------
 * UPDATING AND HIDE, UN HIDE HEADER AND FOOTER VALUES
 * ------------------------------------------------------
 */
function hideAndUnhideTaskHeaderFooter(hidden) {
    "use strict"
    var tasksFooterDiv = document.getElementById("tasks_footer"),
        tasksHeader = document.getElementById("tasks_header");
    if(hidden) {
        // hiding header and footer
        tasksHeader.style.display = "none";
        tasksFooterDiv.style.display = "none";
    } else {
        // displaying header and footer
        tasksHeader.style.display = "inline-block";
        tasksFooterDiv.style.display = "inline-block";
    }
}
function checkAndHideHeaderAndFooter() {
    "use strict"
    if(tasks.length < 1) {
        hideAndUnhideTaskHeaderFooter(true);
    }
}
function incrementTaskLeftCounter() {
    "use strict"
    var tasksLeftLabel = document.getElementById("tasks_left_label");

    var prevValue = Number(tasksLeftLabel.innerHTML);
    tasksLeftLabel.innerHTML = (prevValue + 1).toString();
}
function decrementTaskLeftCounter() {
    "use strict"
    var tasksLeftLabel = document.getElementById("tasks_left_label"),
        prevValue = Number(tasksLeftLabel.innerHTML);
    tasksLeftLabel.innerHTML = (prevValue - 1).toString();
}

function incrementTaskCompletedCounter() {
    "use strict"
    var tasksCompletedLabel = document.getElementById("completed_items_label"),
        tasksClearDiv = document.getElementById("tasks_remaining"),
        prevValue = Number(tasksCompletedLabel.innerHTML);
    tasksCompletedLabel.innerHTML = (prevValue + 1).toString();
    // simply displaying clear all div, there is no checking needed
    tasksClearDiv.style.visibility = "visible";
}
function decrementTaskCompletedCounter() {
    "use strict"
    var tasksCompletedLabel = document.getElementById("completed_items_label"),
        tasksClearDiv = document.getElementById("tasks_remaining"),
        newValue = Number(tasksCompletedLabel.innerHTML) - 1;
    tasksCompletedLabel.innerHTML = newValue.toString();
    // Hiding clear all div if no checked tasks
    if(newValue < 1) {
        tasksClearDiv.style.visibility = "hidden";
    }
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
        if(tasks[id].isDone) {
            incrementTaskCompletedCounter();
            decrementTaskLeftCounter();
        }

    }
    checkAndHideHeaderAndFooter();
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
