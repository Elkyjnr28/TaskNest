// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../tasknest_loginpage/login.html';
    } else {
        loadTasks(); // Load tasks if logged in
    }
});

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../tasknest_homepage/index.html';
    });
}

// 1. Select DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearBtn');

// 2. Initialize State
let tasks = [];
let currentFilter = 'all';

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('taskNest_tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('taskNest_tasks', JSON.stringify(tasks));
}

// 3. Define Core Functions

// - Function: renderTasks()
function renderTasks() {
    taskInput.value = '';
    tasksList.innerHTML = '';

    // Filter the 'tasks' array based on 'currentFilter'
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    // Loop through the filtered tasks and create HTML elements for each
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
        <li class="empty-state">
            <p>No tasks found.</p>
        </li>
    `;
    } else {
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <p class="task-txt">${task.text}</p>
            </div>
            <div>
                <button class="task-delete" data-id="${task.id}">Delete</button>
            </div>
        `;
            tasksList.appendChild(li);
        });

        updateStats();
        updateClearBtnState();
    }
}

// - Function: addTask()
function addTask() {
    const taskValue = taskInput.value.trim();


    if (!taskValue) {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskValue,
        completed: false
    };

    //push task array
    tasks.unshift(newTask);
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

// - Function: toggleTask(id)
function toggleTask(id) {
    for (let task of tasks) {
        if (task.id === id) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }
}


// - Function: deleteTask(id)
function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }

    saveTasks();
    renderTasks();
}

// - Function: clearCompleted()
function clearCompleted() {
    let hasCompleted = tasks.some(task => task.completed);
    if (!hasCompleted) return;

    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// - Function: updateStats()
function updateStats() {
    let total = tasks.length;
    let completed = 0

    for (let task of tasks) {
        if (task.completed) completed++;
    }

    totalCount.textContent = total;
    completedCount.textContent = completed;
}

// - Function: updateClearBtnState()
function updateClearBtnState() {
    let hasCompleted = tasks.some(task => task.completed);
    clearBtn.disabled = !hasCompleted;
}

// 4. Set Up Event Listeners

// - Add Task Button: Listen for 'click' -> call addTask()
addBtn.addEventListener('click', addTask);

// - Task Input: Listen for 'keypress' (Enter) -> call addTask()
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// - Tasks List (Event Delegation)
tasksList.addEventListener('click', function (e) {
    if (e.target.classList.contains('task-delete')) {
        deleteTask(Number(e.target.dataset.id));
    }
});

tasksList.addEventListener('change', function (e) {
    if (e.target.classList.contains('task-checkbox')) {
        toggleTask(Number(e.target.dataset.id));
    }
});


// - Filter Buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        currentFilter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderTasks();
    });
});

// - Clear Completed Button
clearBtn.addEventListener('click', clearCompleted);

// 5. Initial Load
document.addEventListener('DOMContentLoaded', renderTasks);