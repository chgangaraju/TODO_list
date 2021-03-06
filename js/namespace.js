/**
 * Created with JetBrains WebStorm.
 * User: dilip
 * Date: 26/6/13
 * Time: 1:31 PM
 * To change this template use File | Settings | File Templates.
 */

var todoApp = {
    tasks : [],
    tags: {
        taskInputTextBox: "todoTextInputBox",
        taskUoList: "tasks_list",
        markAllCB: "mark-all-checkbox",
        tasksHeaderDiv: "tasks_header",
        taskFooterDiv: "tasks_footer",
        tasksClearDiv: "tasks_remaining",
        tasksLeftLabel:"tasks_left_label",
        tasksCompletedLabel:"completed_items_label",
        tasksClearButton: "clear_all_button"
    },
    tagPrefix: {
        taskDiv: "task_",
        taskDivContainer: "task_container_",
        taskEditDivContainer: "task_editbox_",
        taskLabel: "task_label_",
        taskCheckBox: "task_checkbox_",
        taskEditBox: "task_edit_textbox_",
        taskClearButton: "task_button_"

    },
    activeEditBox : {
        isActive: false,
        id: 0
    },
    CreateElement: {},
    DisplayTasks: {},
    HeaderFooterManipulation: {},
    ReOrderTasksModule: {},
    TaskManipulation: {},
    ToggleEditBox: {}
};

function $(id) {
    "use strict";
    return document.getElementById(id);
}
function createTask(e) {
    "use strict";
    todoApp.TaskManipulation.createTask(e);
}
function checkTask(id) {
    "use strict";
    todoApp.TaskManipulation.checkTask(id);
}
function checkAllTasks() {
    "use strict";
    todoApp.TaskManipulation.checkAllTasks();
}
function clearTask(id) {
    "use strict";
    todoApp.TaskManipulation.clearTask(id);
}
function clearAllCompletedItems() {
    "use strict";
    todoApp.TaskManipulation.clearAllCompletedItems();
}
function hideEditBoxIfActive()  {
    "use strict";
    todoApp.ToggleEditBox.hideEditBoxIfActive();
}