var tasks = new Array();
/**
 * -------------------------------------------
 * TASK MANIPULATION FUNCTIONS
 * ---------------------------------------------
 */

function createTask(e) {
    "use strict"
    var inputBox = document.getElementById("todoTextInputBox");
    if ((inputBox.value.length) < 1 || e.keyCode != 13) {
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
    toggleTaskHeaderFooter(false);
    checkAndMarkAllTasks();
}

function checkAllTasks() {
    "use strict"
    var checkAllBox = document.getElementById('mark-all-checkbox');
    for (var id in tasks) {
        tasks[id].isDone = checkAllBox.checked;
    }
    tasksReload();
}
function checkAndMarkAllTasks() {
    "use strict"
    var checkAllBox = document.getElementById('mark-all-checkbox');
    for (var id in tasks) {
        if (!tasks[id].isDone) {
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
    for (var i = 0; i < length; i++) {
        if (tasks[i].isDone) {
            // removing task from the array
            tasks.splice(i, 1);
            // adjusting changing indexes
            i--;
            length--;
        }
    }
    tasksReload();
}
