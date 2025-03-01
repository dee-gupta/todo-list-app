function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: task })
        })
        .then(response => response.json())
        .then(data => {
            updateTaskList(data.tasks);
            taskInput.value = '';
        });
    }
}

function deleteTask(taskId) {
    fetch(`/delete/${taskId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => updateTaskList(data.tasks));
}

function toggleTask(taskId) {
    fetch(`/toggle/${taskId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => updateTaskList(data.tasks));
}

function updateTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button onclick="deleteTask(${index})" class="delete-btn">×</button>
        `;
        taskList.appendChild(li);
    });
}

// Add task on Enter key press
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});