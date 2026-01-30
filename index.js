// 1. Select DOM Elements
const inputBox = document.getElementById('taskInput');
const submitBtn = document.getElementById('addbtn');
const total = document.getElementById('totalCount');
const completed = document.getElementById('completedCount');
const taskList = document.getElementById('tasksList');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// 2. Initialize State
let tasks = [];
let currentFilter = 'all';

// 3. Define Core Functions

// - Function: renderTasks()
function renderTasks() {
    taskList.innerHTML = '';
}

// filter the 'tasks' array based on 'currentFilter'
const filteredTasks = taskList.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
});

// Loop through the filtered tasks and create HTML 
if (filteredTasks === 0) {
    taskList.innerHTML = ``;
}

// - Function: addTask()
tasks.push(newTask);

// - Function: toggleTask(id)

// - Function: deleteTask(id)

// - Function: updateStats()

// 4. Set Up Event Listeners

// - Add Task Button: Listen for 'click' -> call addTask()

// - Task Input: Listen for 'keypress' (Enter) -> call addTask()

// - Tasks List (Event Delegation)

// - Filter Buttons

// - Clear Completed Button

// 5. Initial Load
