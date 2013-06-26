// this variable for storing current edited box. to enable event handler
var activeEditBox = todoApp.activeEditBox;

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

