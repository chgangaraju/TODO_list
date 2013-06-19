/**
 * Created with JetBrains WebStorm.
 * User: dilip
 * Date: 18/6/13
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */

var tasks = new Array();

function createTask(e) {
    "use strict"
    if(e.keyCode != 13)     {
        return;
    }
    var inputBox = document.getElementById("todoTextInputBox");
    var taskObject = {
        isDone:false,
        task:inputBox.value
    };
    tasks.push(taskObject);
    displayTask(tasks.length - 1);
    inputBox.value="";
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
    newCheckBox.onclick = function() {
        checkTask(id);
    }
    return newCheckBox;
}
function createNewLabel(id,isDone, taskData) {
    var newLabel = document.createElement("label");
    newLabel.innerHTML = taskData;
    newLabel.id = "task_label_" + id;

    if(isDone) {
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
    newButton.id = "task_button_"+ id;
    newButton.innerHTML = "<img src='img/icon_delete.gif'> ";
    newButton.style.visibility = "hidden";
    return newButton;
}
function getMarkAllButton() {
      "use strict"
    return "";
}
function getlistTasksFooter() {
    "use strict"
    return "";
}

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

function checkTask(id) {
    "use strict"
    var checkBox = document.getElementById('task_checkbox_' + id),
        taskLabel = document.getElementById('task_label_' + id);
    if(checkBox.checked == true) {
        tasks[id].isDone = true;
        taskLabel.className =  "task_label completed_task";
    } else {
        tasks[id].isDone = false;
        taskLabel.className =  "task_label";
    }

}

// delete task from the list
function clearTask(id) {
    "use strict"
    tasks.splice(id,1);
    tasksReload();
}
// reload all tasks
function tasksReload() {
    "use strict"
    var tasks_body = document.getElementById("tasks_body");
    // clearing output
    tasks_body.innerHTML = "";
    for(var id in tasks) {
        displayTask(id);
    }
}
// display one task
function displayTask(id) {
    "use strict"
    var tasks_body = document.getElementById("tasks_body"),
        taskObj = tasks[id],
        newLabel = createNewLabel(id,taskObj.isDone,taskObj.task),
        newCheckBox = createNewCheckBox(id, taskObj.isDone),
        button = createNewClearButton(id),
        newDiv = document.createElement("div");
    newDiv.className = "task";
    newDiv.id = "task_" + id;
    newDiv.appendChild(newCheckBox);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(button);
    newDiv.onmouseover = function() {
        taskMouseOver(id);
    }
    newDiv.onmouseout = function() {
        taskMouseOut(id);
    }
    tasks_body.appendChild(newDiv);
}











/**
 function displayTasks() {
     "use strict"
    var listTasks = document.getElementById("list_tasks_div"),
        outputHtml = "";
    //outputHtml += getMarkAllButton() + "<div id='tasks'>";
    listTasks.innerHTML = "";

    for(var taskKey in tasks) {
        var task = tasks[taskKey],
            newDiv = document.createElement("div"),
            //newDiv = "<div id = 'task_div_" + task.id + "' class='task'>",
            checkBox = createNewCheckBox(task.id, task.isDone),
            label =  createNewLabel(task.id, task.isDone, task.task);
        newDiv.class = "task";
        newDiv.id = "task_div_" + task.id;

        newDiv.appendChild(checkBox);
        newDiv.appendChild(label);

        listTasks.appendChild(newDiv);
    }

    //outputHtml += " </div> " +getlistTasksFooter();
    //listTasks.innerHTML = outputHtml;
}

 function taskButtonMouseOver(id) {
    "use strict"
    var taskButtonGreyId = "icon-delete-grey-" + id,
        taskButtonRedId = "icon-delete-red-" + id,
        taskButtonGrey = document.getElementById(taskButtonGreyId),
        taskButtonRed = document.getElementById(taskButtonRedId);
    taskButtonRed.style.dispaly = "block";
    taskButtonGrey.style.display = "none";

}
 function taskButtonMouseOut(id) {
    "use strict"
    var taskButtonGreyId = "icon-delete-grey-" + id,
        taskButtonRedId = "icon-delete-red-" + id,
        taskButtonGrey = document.getElementById(taskButtonGreyId),
        taskButtonRed = document.getElementById(taskButtonRedId);
    taskButtonGrey.style.display = "block";
    taskButtonRed.style.dispaly = "none";
}
 */