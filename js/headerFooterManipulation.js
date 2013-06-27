/**
 * ------------------------------------------------------
 * UPDATING AND TOGGLE HEADER AND FOOTER VALUES
 * ------------------------------------------------------
 */
var HeaderFooterManipulation = function() {
    var tags = todoApp.tags;
    function toggleTaskHeaderFooter(hidden) {
        "use strict";
        var tasksFooterDiv =$(tags.taskFooterDiv),
            tasksHeader =$(tags.tasksHeaderDiv);
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
        "use strict";
        var tasksLeftLabel =$(tags.tasksLeftLabel),
            prevValue = Number(tasksLeftLabel.innerHTML);
        tasksLeftLabel.innerHTML = (prevValue + 1).toString();
    }
    function decrementTaskLeftCounter() {
        "use strict";
        var tasksLeftLabel =$(tags.tasksLeftLabel),
            prevValue = Number(tasksLeftLabel.innerHTML);
        tasksLeftLabel.innerHTML = (prevValue - 1).toString();
    }

    function incrementTaskCompletedCounter() {
        "use strict";
        var tasksCompletedLabel =$(tags.tasksCompletedLabel),
            tasksClearDiv =$(tags.tasksClearDiv),
            prevValue = Number(tasksCompletedLabel.innerHTML);
        tasksCompletedLabel.innerHTML = (prevValue + 1).toString();
        // simply displaying clear all div, there is no checking needed
        tasksClearDiv.style.visibility = "visible";
    }
    function decrementTaskCompletedCounter() {
        "use strict";
        var tasksCompletedLabel =$(tags.tasksCompletedLabel),
            tasksClearDiv =$(tags.tasksClearDiv),
            newValue = Number(tasksCompletedLabel.innerHTML) - 1;
        tasksCompletedLabel.innerHTML = newValue.toString();
        // Hiding clear all div if no checked tasks
        if (newValue < 1) {
            tasksClearDiv.style.visibility = "hidden";
        }
    }
    return {
        toggleTaskHeaderFooter: function(hidden) {
            return toggleTaskHeaderFooter(hidden);
        },
        incrementTaskLeftCounter: function() {
            return incrementTaskLeftCounter();
        },
        decrementTaskLeftCounter: function() {
            return decrementTaskLeftCounter();
        },
        incrementTaskCompletedCounter: function() {
            return incrementTaskCompletedCounter();
        },
        decrementTaskCompletedCounter: function() {
            return decrementTaskCompletedCounter();
        }
    };
}();