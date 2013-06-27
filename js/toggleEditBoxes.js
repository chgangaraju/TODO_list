var ToggleEditBox = function() {
    // this variable for storing current edited box. to enable event handler
    var activeEditBox = todoApp.activeEditBox;
    var tagPrefix = todoApp.tagPrefix;
    var tasks = todoApp.tasks;

    /**
     * --------------------------------------
     * Hiding and displaying edit boxes
     * ---------------------------------------
     */

    function hideEditBoxIfActive() {
        "use strict";
        if (activeEditBox.isActive) {
            updateTask(activeEditBox.id);
            hideEditBox(activeEditBox.id);
        }
    }
    function updateTask(id) {
        "use strict";
        var editInputBox = $(tagPrefix.taskEditBox + id),
            taskLabel = $(tagPrefix.taskLabel + id),
            newValue = editInputBox.value;
        taskLabel.innerHTML = newValue;
        tasks[id].task = newValue;
    }

    //display edit box
    function displayEditBox(id) {
        "use strict";
        var divTaskContainer =$(tagPrefix.taskDivContainer + id),
            divEditBox =$(tagPrefix.taskEditDivContainer + id);
        divTaskContainer.style.display = "none";
        divEditBox.style.display = "block";
        activeEditBox.isActive = true;
        activeEditBox.id = id;
    }
    //hide editBox
    function hideEditBox(id) {
        "use strict";
        var divTaskContainer =$(tagPrefix.taskDivContainer + id),
            divEditBox =$(tagPrefix.taskEditDivContainer + id);
        divTaskContainer.style.display = "block";
        divEditBox.style.display = "none";
    }

    return {
        hideEditBoxIfActive: function() {
            return hideEditBoxIfActive();
        },
        updateTask: function(id) {
            return updateTask(id);
        },
        displayEditBox: function(id) {
            return displayEditBox(id);
        },
        hideEditBox: function(id) {
            return hideEditBox(id);
        }
    };
}();
