/**
 * -------------------------------------------------------
 *  CREATION OF CHECKBOX, LABEL, CLEAR BUTTON AND EDIT BOX
 *  ------------------------------------------------------
 */

 var DisplayTasks = (function() {
    var instance;
    // singleton pattern
    function init() {
        // private data
        var tasks = todoApp.tasks;
        var reOrderTasksInstance = ReOrderTasksModule.getInstance();
        var createElement = CreateElement.getInstance();
        var tags = todoApp.tags;


        /**
         * -------------------------------
         *       DISPLAYING TASKS
         * -------------------------------
         */
        function tasksReload() {
            "use strict";
            var tasksList = $(tags.taskUoList),
                tasksLeftLabel = $(tags.tasksLeftLabel),
                tasksClearDiv = $(tags.tasksClearDiv),
                tasksCompletedLabel = $(tags.tasksCompletedLabel);
            // clearing output
            tasksList.innerHTML = "";
            tasksClearDiv.style.visibility = "hidden";
            TaskManipulation.toggleMarkAllTasks();
            // initially i assuming that all tasks left i.e no tasks completed
            tasksLeftLabel.innerHTML = (tasks.length).toString();
            tasksCompletedLabel.innerHTML = "0";
            for (var id in tasks) {
                if(tasks.hasOwnProperty(id)) {
                    displayTask(id);
                    if (tasks[id].isDone) {
                        HeaderFooterManipulation.incrementTaskCompletedCounter();
                        HeaderFooterManipulation.decrementTaskLeftCounter();
                    }
                }
            }
            if (tasks.length < 1) {
                HeaderFooterManipulation.toggleTaskHeaderFooter(true);
            }
        }

        function displayTask(id) {
            "use strict";
            var taskPrefix = todoApp.tagPrefix.taskDiv;
            var tasksList = $(tags.taskUoList),
                taskListItem = document.createElement("li"),
                taskContainer = createElement.createDivContainer(id),
                taskEditContainer = createElement.createEditDiv(id);

            taskListItem.className = "task";
            taskListItem.id = taskPrefix + id;

            taskListItem.onmousedown = reOrderTasksInstance.OnMouseDown;
            taskListItem.onmouseout = function(event)  {
                reOrderTasksInstance.reOrderTasks(event);
            };

            taskListItem.appendChild(taskContainer);
            taskListItem.appendChild(taskEditContainer);
            taskListItem.ondblclick = function () {
                ToggleEditBox.displayEditBox(id);
            };
            tasksList.insertBefore(taskListItem, null);
        }
        return {
            // public functions
            displayTask: function(id) {
                return displayTask(id);
            },
            tasksReload: function() {
                return tasksReload();
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
