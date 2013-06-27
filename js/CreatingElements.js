/**
 * Created with JetBrains WebStorm.
 * User: dilip
 * Date: 27/6/13
 * Time: 12:11 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * --------------------------------------------------------
 * HIDING AND UN HIDING CLEAR TASK BUTTON ON MOUSE EVENTS
 * -------------------------------------------------------
 */
var CreateElement = (function() {
    var instance,
        activeEditBox = todoApp.activeEditBox;

    function init() {
        var tagPrefix = todoApp.tagPrefix;
        var tasks = todoApp.tasks;
        function taskMouseOver(id) {
            "use strict";
            var taskButtonId = tagPrefix.taskClearButton + id,
                taskButton =$(taskButtonId);
            taskButton.style.visibility = "visible";
        }
        function taskMouseOut(id) {
            "use strict";
            var taskButtonId = tagPrefix.taskClearButton + id,
                taskButton =$(taskButtonId);
            taskButton.style.visibility = "hidden";
        }
        function createCheckBox(id, checked) {
            "use strict";
            var checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.id = tagPrefix.taskCheckBox + id;
            checkBox.className = "task_checkbox";
            checkBox.checked = checked;
            checkBox.onclick = function () {
                checkTask(id);
            };
            return checkBox;
        }
        function createLabel(id, isDone, taskData) {
            "use strict";
            var label = document.createElement("label");
            label.innerHTML = taskData;
            label.id = tagPrefix.taskLabel + id;

            if (isDone) {
                label.className = "task_label completed_task";
            } else {
                label.className = "task_label";
            }
            return label;
        }
        function createClearButton(id) {
            "use strict";
            var button = document.createElement("a");
            button.href = "javascript:clearTask(" + id + ")";
            button.className = "task_button";
            button.id = tagPrefix.taskClearButton + id;
            button.innerHTML = "<img src='img/icon_delete.gif'> ";
            button.style.visibility = "hidden";
            return button;
        }
        function createEditBox(id) {
            "use strict";
            var textBox = document.createElement("input");
            textBox.type = "text";
            textBox.className = "task_edit_textbox";
            textBox.id = tagPrefix.taskEditBox + id;
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
                ToggleEditBox.updateTask(id);
                ToggleEditBox.hideEditBox(id);
            };
            // stop hiding edit box when click inside text box
            textBox.onmousedown = function(e) {
                e.stopPropagation();
            };
            textBox.onclick = function (e) {
                e.stopPropagation();
            };
            return textBox;
        }
        function createDivContainer(id) {
            "use strict";
            var taskObj = tasks[id],
                label = createLabel(id, taskObj.isDone, taskObj.task),
                checkBox = createCheckBox(id, taskObj.isDone),
                button = createClearButton(id),
                taskContainer = document.createElement("div");

            taskContainer.id = tagPrefix.taskDivContainer + id;
            taskContainer.className = "task_container";
            taskContainer.appendChild(checkBox);
            taskContainer.appendChild(label);
            taskContainer.appendChild(button);
            taskContainer.onmouseover = function () {
                taskMouseOver(id);
            };
            taskContainer.onmouseout = function () {
                taskMouseOut(id);
            };
            return taskContainer;
        }
        function createEditDiv(id) {
            "use strict";
            var editTextBox = createEditBox(id),
                editContainer = document.createElement("div");

            editContainer.id = tagPrefix.taskEditDivContainer + id;
            editContainer.className = "task_editbox";
            editContainer.appendChild(editTextBox);

            return editContainer;
        }

        return {
            createEditDiv: function(id) {
                return createEditDiv(id);
            },
            createDivContainer: function(id) {
                return createDivContainer(id);
            }
        };
    }
    return {
        getInstance: function() {
            if(!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
