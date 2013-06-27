// modular pattern
todoApp.TaskManipulation = function () {

    var displayTasks = todoApp.DisplayTasks.getInstance(),
        tags = todoApp.tags,
        tagPrefix = todoApp.tagPrefix,
        tasks = todoApp.tasks,
        headerFooterManipulation = todoApp.HeaderFooterManipulation;

    function createTask(e) {
        "use strict";
        var inputBox = $(tags.taskInputTextBox);
        if ((inputBox.value.length) < 1 || e.keyCode != 13) {
            return;
        }
        var taskObject = {
            isDone: false,
            task: inputBox.value
        };
        tasks.push(taskObject);
        displayTasks.displayTask(tasks.length - 1);
        inputBox.value = "";
        headerFooterManipulation.incrementTaskLeftCounter();
        headerFooterManipulation.toggleTaskHeaderFooter(false);
        toggleMarkAllTasks();
    }

    function checkAllTasks() {
        "use strict";
        var checkAllBox = $(tags.markAllCB);
        for (var id in tasks) {
            if (tasks.hasOwnProperty(id)) {
                tasks[id].isDone = checkAllBox.checked;
            }
        }
        displayTasks.tasksReload();
    }

    function toggleMarkAllTasks() {
        "use strict";
        var checkAllBox = $(tags.markAllCB);
        for (var id in tasks) {
            if (tasks.hasOwnProperty(id)) {
                if (!tasks[id].isDone) {
                    checkAllBox.checked = false;
                    return;
                }
            }
        }
        checkAllBox.checked = true;
    }

    function checkTask(id) {
        "use strict";
        var checkBox = $(tagPrefix.taskCheckBox + id),
            taskLabel = $(tagPrefix.taskLabel + id),
            checkAllBox = $(tags.markAllCB);
        if (checkBox.checked == true) {
            tasks[id].isDone = true;
            taskLabel.className = "task_label completed_task";
            toggleMarkAllTasks();
            // updating counters
            headerFooterManipulation.incrementTaskCompletedCounter();
            headerFooterManipulation.decrementTaskLeftCounter();
        } else {
            tasks[id].isDone = false;
            taskLabel.className = "task_label";
            //simply un checking mark all button
            checkAllBox.checked = false;
            // updating counters
            headerFooterManipulation.incrementTaskLeftCounter();
            headerFooterManipulation.decrementTaskCompletedCounter();
        }
    }

    // delete task from the list
    function clearTask(id) {
        "use strict";
        tasks.splice(id, 1);
        displayTasks.tasksReload();
    }

    function clearAllCompletedItems() {
        "use strict";
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
        displayTasks.tasksReload();
    }
    return {
        createTask: function (e) {
            return createTask(e);
        },
        checkAllTasks: function () {
            return checkAllTasks();
        },
        checkTask: function (id) {
            return checkTask(id);
        },
        clearTask: function (id) {
            return clearTask(id);
        },
        clearAllCompletedItems: function () {
            return clearAllCompletedItems();
        },
        toggleMarkAllTasks: function() {
            return toggleMarkAllTasks();
        }
    };

}();
