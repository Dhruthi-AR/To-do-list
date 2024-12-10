let tasks = [];
function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }
    const task = {
        id: Date.now(),
        text: taskInput.value,
        completed: false,
        addedAt: new Date().toLocaleString(),
        completedAt: null
    };
    tasks.push(task);
    taskInput.value = "";  
    renderTasks();
}
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toLocaleString() : null;   
        renderTasks();
    }
}
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);   
    renderTasks();
}
function renderTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text} 
            ${task.completed ? `(Completed at ${task.completedAt})` : `(Added at ${task.addedAt})`}</span>
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}