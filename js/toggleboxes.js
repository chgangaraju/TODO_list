// this variable for storing current edited box. to enable event handler
var activeEditBox = {
    isActive: false,
    id: 0
};

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
 * ------------------------------------------------------
 * UPDATING AND TOGGLE HEADER AND FOOTER VALUES
 * ------------------------------------------------------
 */
function toggleTaskHeaderFooter(hidden) {
    "use strict"
    var tasksFooterDiv = document.getElementById("tasks_footer"),
        tasksHeader = document.getElementById("tasks_header");
    if (hidden) {
        // hiding header and footer
        tasksHeader.style.display = "none";
        tasksFooterDiv.style.display = "none";
    } else {
        // displaying header and footer
        tasksHeader.style.display = "inline-block";
        tasksFooterDiv.style.display = "inline-block";
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
    if (newValue < 1) {
        tasksClearDiv.style.visibility = "hidden";
    }
}


