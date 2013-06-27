/**
 * -------------------------------------------------------
 *  CREATION OF CHECKBOX, LABEL, CLEAR BUTTON AND EDIT BOX
 *  ------------------------------------------------------
 */

 todoApp.DisplayTasks = (function() {
    var instance;
    // singleton pattern
    function init() {
        // private data
        var tasks = todoApp.tasks,
            reOrderTasksModule = todoApp.ReOrderTasksModule,
            reOrderTasksInstance = reOrderTasksModule.getInstance(),
            createElement = todoApp.CreateElement.getInstance(),
            headerFooterManipulation = todoApp.HeaderFooterManipulation,
            toggleEditBox = todoApp.ToggleEditBox,
            tags = todoApp.tags;


        /**
         * -------------------------------
         *       DISPLAYING TASKS
         * -------------------------------
         */
        function tasksReload() {
            "use strict";
            var taskManipulation = todoApp.TaskManipulation,
                tasksList = $(tags.taskUoList),
                tasksLeftLabel = $(tags.tasksLeftLabel),
                tasksClearDiv = $(tags.tasksClearDiv),
                tasksCompletedLabel = $(tags.tasksCompletedLabel);
            // clearing output
            tasksList.innerHTML = "";
            tasksClearDiv.style.visibility = "hidden";
            taskManipulation.toggleMarkAllTasks();
            // initially i assuming that all tasks left i.e no tasks completed
            tasksLeftLabel.innerHTML = (tasks.length).toString();
            tasksCompletedLabel.innerHTML = "0";
            for (var id in tasks) {
                if(tasks.hasOwnProperty(id)) {
                    displayTask(id);
                    if (tasks[id].isDone) {
                        headerFooterManipulation.incrementTaskCompletedCounter();
                        headerFooterManipulation.decrementTaskLeftCounter();
                    }
                }
            }
            if (tasks.length < 1) {
                headerFooterManipulation.toggleTaskHeaderFooter(true);
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
                toggleEditBox.displayEditBox(id);
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
