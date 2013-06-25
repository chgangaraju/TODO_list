var startX = 0; // mouse starting positions
var startY = 0;
var offsetX = 0; // current element offset
var offsetY = 0;
var dragElement; // needs to be passed from OnMouseDown to OnMouseMove
var oldZIndex = 0; // we temporarily increase the z-index during drag
//var _debug = $('debug'); // makes life easier
var drag = false; // represents the item being dragged or not
// variables for identifying click and double click events
var click = false;
var doubleClickWait = false;
var clickTimer;
var doubleClickTimer;

document.onmouseup = OnMouseUp;

function createItemPlaceHolder(target) {
    "use strict";
    var listItem = document.createElement("li"),
        ul = target.parentNode,
        targetIndex = 0,
        items = ul.getElementsByTagName("li"),
        i = 0;
    for (i = 0; i < items.length; i += 1) {
        if (items[i].id === target.id) {
            targetIndex = i;
            break;
        }
    }
    listItem.id = "taskPlaceHolder";
    ul.insertBefore(listItem, items[targetIndex + 1]);
}

function OnMouseDown(e) {
    "use strict";
    // IE is retarded and doesn't pass the event object
    if (e === null) {
        e = window.event;
    }
    // IE uses srcElement, others use target
    var target = e.target != null ? e.target : e.srcElement;
    // separating double click events
    if (doubleClickWait) {
        clearTimeout(doubleClickTimer);
        doubleClickWait = false;
        click = false;
        displayEditBox(target.id);
        return;
    }
    // separating click events
    clearTimeout(clickTimer);
    click = true;
    clickTimer = setTimeout(function () {
        // if its a drag initiating item drag
        doubleClickWait = false;
        click = false;
        dragStart(target, e);
    }, 150);
}
function dragStart(target, e) {
    "use strict";
    // preventing drag and drop for check box and input text box
    if (target.className === "task_checkbox" || target.className === "task_edit_textbox") {
        return;
    }
    // hack, drag item on clicking  anywhere on the list item.
    var counter = 0;
    while (target.className !== "task" && counter < 2) {
        target = target.parentNode;
        counter += 1;
    }
    if (target.className !== "task") {
        return;
    }
    initializeDrag(target, e);
    createItemPlaceHolder(target);
    drag = true;
}
function initializeDrag(target, e) {
    "use strict";
    // for IE, left click == 1,  Firefox, left click == 0
    if (e.button === 1 || e.button === 0) {
        // grab the mouse position
        startX = e.clientX;
        startY = e.clientY;
        // grab the clicked element's position
        var pos = getPosition(target);
        offsetX = pos.x;
        offsetY = pos.y;
        // bring the clicked element to the front while it is being dragged
        oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;
        target.style.left = offsetX;
        target.style.top = offsetY;
        target.className = "taskDragging task";
        target.onmouseout = function () {
            e.stopPropagation();
        };
        // we need to access the element in OnMouseMove
        dragElement = target;
        document.onmousemove = OnMouseMove;
        // cancel out any text selections
        document.body.focus();
        // prevent text selection in IE
        document.onselectstart = function () {
            return false;
        };
        // prevent IE from trying to drag an image
        target.ondragstart = function () {
            return false;
        };
        // prevent text selection (except IE)
        return false;
    }
}

function OnMouseMove(e) {
    "use strict";
    if (e === null) {
        e = window.event;
    }
    // this is the actual "drag code"
    dragElement.style.left = (offsetX + e.clientX - startX) + 'px';
    dragElement.style.top = (offsetY + e.clientY - startY) + 'px';
}

function OnMouseUp(e) {
    "use strict";
    // checking for click events
    if (click) {
        clearTimeout(clickTimer);
        doubleClickWait = true;
        doubleClickTimer = setTimeout(function () {
            click = false;
            doubleClickWait = false;
        }, 200);
        return;
    }
    if (dragElement != null) {
        dragEnd();
    }
}
function dragEnd() {
    "use strict";
    // placing item appropriate place
    var ul = dragElement.parentNode,
        placeHolder = $('taskPlaceHolder');
    // setting default values
    dragElement.style.zIndex = oldZIndex;
    dragElement.removeAttribute("style");
    dragElement.className = "task";
    dragElement.onmouseout = reOrderTasks;
    ul.insertBefore(dragElement, placeHolder);
    // we're done with these events until the next OnMouseDown
    document.onmousemove = null;
    document.onselectstart = null;
    dragElement.ondragstart = null;
    // this is how we know we're not dragging
    ul.removeChild(placeHolder);
    dragElement = null;
    drag = false;
}

function reOrderTasks(e) {
    "use strict";
    if (!drag) {
        return;
    }
    var target = e.target !== null ? e.target : e.srcElement;
    // checking the event trigger source
    if (target.className !== "task" || target.id === dragElement.id) {
        return;
    }
    var taskPlaceHolder = $('taskPlaceHolder'),
        ul = taskPlaceHolder.parentNode,
        targetTop = getPosition(target).y,
        targetBottom = targetTop + extractNumber(target.style.height);
    // for moving above
    if (targetBottom < e.clientY) {
        ul.insertBefore(target, taskPlaceHolder);
    } else if (targetTop > e.clientY) {
        ul.insertBefore(taskPlaceHolder, target);
    }
    swapArray(target);
}

// helper functions
function swapArray(target) {
    var sourceIndex = getArrayIndex(dragElement),
        destinationIndex = getArrayIndex(target),
        temp = tasks[sourceIndex];
    tasks[sourceIndex] = tasks[destinationIndex];
    tasks[destinationIndex] = temp;
    target.id = 'task_' + sourceIndex;
    dragElement.id = 'task_' + destinationIndex;
}
function getArrayIndex(element) {
    var i = 0;
    for(i = 0; i < tasks.length; i += 1) {
        if( ("task_" + i) == element.id) {
            return i;
        }
    }
    return null;
}
function getPosition(element) {
    "use strict";
    var lx = 0,
        ly = 0;
    for (lx = 0, ly = 0; element !== null; element = element.offsetParent) {
        lx += element.offsetLeft;
        ly += element.offsetTop;
    }

    return {x: lx, y: ly};
}
function extractNumber(value) {
    "use strict";
    var n = parseInt(value, 10);
    return n === null || isNaN(n) ? 0 : n;
}
function $(id) {
    "use strict";
    return document.getElementById(id);
}


