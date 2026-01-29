// 1. Select DOM Elements

// 2. Initialize State

// 3. Define Core Functions

// - Function: renderTasks()

// - Function: addTask()

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

const inputBox = document.getElementById('taskInput');
const submitBtn = document.getElementById('addBtn');

const inputValue = inputBox.value;

console.log(inputValue);

// function addTask() {
//     console.log(inputValue);
// }

submitBtn.addEventListener('click', addTask);
