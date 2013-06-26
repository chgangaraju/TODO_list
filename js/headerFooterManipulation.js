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