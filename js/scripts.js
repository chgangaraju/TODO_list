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
        id : tasks.length,
        isDone:"false",
        task:inputBox.value
    };
    tasks.push(taskObject);
    displayTasks();
    inputBox.value="";
}
function displayTasks() {
     "use strict"
    var listTasks = document.getElementById("list_tasks_div"),
        outputHtml = "";
    outputHtml += getMarkAllButton() + "<div id='tasks'>";

    for(var taskKey in tasks) {
        var task = tasks[taskKey],
            newDiv = "<div id = 'task_div_" + task.id + "' class='task'>",
            checkBox = createNewCheckBox(task.id, task.isDone),
            Label =  createNewLabel(task.id, task.isDone, task.task);

        newDiv += checkBox.innerHTML;
        newDiv += Label.innerHTML;

        outputHtml += newDiv + "</div>";
    }

    outputHtml += " </div> " +getlistTasksFooter();
    listTasks.innerHTML = outputHtml;
}
function createNewCheckBox(id, checked) {
    "use strict"
   var newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = "task_checkbox_" + id;
    newCheckBox.checked = checked;
    return newCheckBox;
}
function createNewLabel(id,isDone, taskData) {
    var newLabel = document.createElement("label");
    newLabel.value = taskData;
    newLabel.id = "task_label_" + id;

    if(isDone) {
        newLabel.class = "completed_task";
    }
    return newLabel;
}
function getMarkAllButton() {
      "use strict"
    return "";
}
function getlistTasksFooter() {
    "use strict"
    return "";
}