document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('toggleTheme').addEventListener('click', toggleTheme);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');

        taskItem.innerHTML = `
            <span onclick="toggleComplete(event)">${taskText}</span>
            <div>
                <button class="important" onclick="markImportant(event)">Important</button>
                <button class="edit" onclick="editTask(event)">Edit</button>
                <button onclick="removeTask(event)">Remove</button>
            </div>
        `;

        taskList.appendChild(taskItem);
        saveTasks();

        taskInput.value = '';
        taskInput.focus();
    }
}

function toggleComplete(event) {
    event.target.parentElement.classList.toggle('completed');
    saveTasks();
}

function removeTask(event) {
    event.target.parentElement.parentElement.remove();
    saveTasks();
}

function markImportant(event) {
    event.target.parentElement.parentElement.classList.toggle('important-task');
    saveTasks();
}

function editTask(event) {
    const taskItem = event.target.parentElement.parentElement;
    const taskText = taskItem.querySelector('span').innerText;
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.querySelector('span').innerText = newTaskText.trim();
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        const taskItem = taskList.children[i];
        const taskText = taskItem.querySelector('span').innerText;
        const isCompleted = taskItem.classList.contains('completed');
        const isImportant = taskItem.classList.contains('important-task');

        tasks.push({ text: taskText, completed: isCompleted, important: isImportant });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span onclick="toggleComplete(event)">${task.text}</span>
            <div>
                <button class="important" onclick="markImportant(event)">Important</button>
                <button class="edit" onclick="editTask(event)">Edit</button>
                <button onclick="removeTask(event)">Remove</button>
            </div>
        `;

        if (task.completed) {
            taskItem.classList.add('completed');
        }
        if (task.important) {
            taskItem.classList.add('important-task');
        }

        taskList.appendChild(taskItem);
    });
}

function toggleTheme() {
    document.body.classList.toggle('theme-dark');
}
