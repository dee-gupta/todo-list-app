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

function updateTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}