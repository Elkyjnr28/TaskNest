// 1. Select DOM Elements

// 2. Initialize State
let tasks = [];
let currentFilter = 'all';

// 3. Define Core Functions

console.log(pa);

// - Function: renderTasks()
function renderTasks() {

    console.log(tasksList);

    //
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
    }


}

// - Function: addTask()
function addTask() {
    const taskValue = taskInput.value;


    if (!taskValue) return;

    const newTask = {
        id: Date.now().toString(),
        text: taskValue,
        completed: false
    };

    //push task array
    tasks.push(newTask);
}

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
renderTasks();
