const inputBox = document.getElementById('taskInput');
const submitBtn = document.getElementById('addBtn');

const inputValue = inputBox.value;

console.log(inputValue);

// function addTask() {
//     console.log(inputValue);
// }

submitBtn.addEventListener('click', addTask);
