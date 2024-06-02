var myNewTask = document.getElementById("newTask");
var taskContent = document.getElementById("taskContent");
var addBtn = document.getElementById('add');
var taskArray = [];
var isUpdating = false;
var currentIndex;

if (localStorage.getItem("allTasks") != null) {
    taskArray = JSON.parse(localStorage.getItem("allTasks"));
    display();
}

function addOrUpdateTask() {
    if (isUpdating) {
        updateTask();
    } else {
        addTask();
    }
}

function addTask() {
    var task = { taskInfo: myNewTask.value };
    taskArray.push(task);
    localStorage.setItem("allTasks", JSON.stringify(taskArray));
    clearTaskInput();
    display();
}

function updateTask() {
    taskArray[currentIndex].taskInfo = myNewTask.value;
    localStorage.setItem("allTasks", JSON.stringify(taskArray));
    clearTaskInput();
    display();
    addBtn.innerHTML = 'Add';
    isUpdating = false;
}

function clearTaskInput() {
    myNewTask.value = "";
}

function display() {
    var taskBox = '';
    for (var i = 0; i < taskArray.length; i++) {
        taskBox += `
            <div class="taskBox rounded border border-secondary d-flex justify-content-between align-items-center mx-auto mt-4 pe-2 w-50 ">
                <div class="d-flex align-items-center justify-content-between mx-2">
                    <span class="text-dark-emphasis fw-bold" id="toDoTask">${taskArray[i].taskInfo}</span>
                </div>
                <button class="trash border-0 d-flex justify-content-center align-items-center pe-2 ms-auto" onclick="deleteTask(${i})">
                <i class="fa-solid fa-trash border-0"></i>
            </button>
            <button class="update border-0 bg-secondary-subtle border-white d-flex justify-content-end-50 align-items-center  me-0" onclick="startUpdating(${i})">
                <i class="fa-solid fa-pen border-0"></i>
            </button>
            </div>
        `;
    }
    taskContent.innerHTML = taskBox;
}

function deleteTask(i) {
    taskArray.splice(i, 1);
    localStorage.setItem('allTasks', JSON.stringify(taskArray));
    display();
}

function startUpdating(index) {
    currentIndex = index;
    myNewTask.value = taskArray[index].taskInfo;
    addBtn.innerHTML = 'Update';
    isUpdating = true;
}