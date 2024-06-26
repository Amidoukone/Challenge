document.addEventListener("DOMContentLoaded", function() {
    // Sélection du premier h2
    const noTasksMessage = document.getElementById('noTasksMessage');

    // Sélection des éléments du formulaire
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const priorityInput = document.getElementById("priorityInput");

    // Sélection de la liste des tâches
    const taskList = document.querySelector(".task-list");

    // Charger les tâches depuis le stockage local au chargement de la page
    loadTasks();

    // Fonction pour vérifier si des tâches sont présentes et afficher/masquer le premier h2 en conséquence
    function checkTasksPresence() {
        // Sélection de tous les éléments de tâche
        const taskItems = document.querySelectorAll('.task-item');

        // Vérifier s'il y a des tâches présentes
        if (taskItems.length > 0) {
            // S'il y a des tâches, masquer le premier h2
            noTasksMessage.style.display = 'none';
        } else {
            // S'il n'y a pas de tâches, afficher le premier h2
            noTasksMessage.style.display = 'block';
        }
    }

    // Appeler la fonction pour vérifier la présence de tâches une fois que le DOM est chargé
    checkTasksPresence();

    // Ajouter une nouvelle tâche
    const taskForm = document.getElementById("taskForm");
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addTask();
        checkTasksPresence(); // Appeler la fonction pour vérifier à nouveau la présence de tâches après l'ajout d'une nouvelle tâche
    });

    // Fonction pour ajouter une nouvelle tâche
    function addTask() {
        // Récupérer les valeurs du formulaire
        const taskText = taskInput.value;
        const deadline = deadlineInput.value;
        const priority = priorityInput.value;

        // Créer un nouvel élément de tâche
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.dataset.priority = priority; // Enregistrer la priorité de la tâche

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            updateTaskStatus(taskItem);
        });

        const label = document.createElement("label");
        label.textContent = `${taskText} (Priorité : ${priority})`; // Afficher la valeur de la tâche avec la priorité

        const deadlinePara = document.createElement("p");
        deadlinePara.textContent = `Date d'échéance : ${deadline}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", function() {
            deleteTask(taskItem);
        });

        // Ajouter les éléments à la tâche
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(deadlinePara);
        taskItem.appendChild(deleteButton);

        // Ajouter la tâche à la liste des tâches
        taskList.appendChild(taskItem);

        // Enregistrer les tâches dans le stockage local
        saveTasks();

        // Effacer le formulaire après l'ajout de la tâche
        taskForm.reset();
    }

    // Charger les tâches depuis le stockage local
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.deadline, task.priority, task.completed);
            taskList.appendChild(taskItem);
        });
    }

    // Fonction pour créer un élément de tâche
    function createTaskElement(taskText, deadline, priority, completed) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.dataset.priority = priority;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", function() {
            updateTaskStatus(taskItem);
        });

        const label = document.createElement("label");
        label.textContent = taskText;
        if (completed) {
            label.style.textDecoration = "line-through";
        }

        const deadlinePara = document.createElement("p");
        deadlinePara.textContent = `Date d'échéance : ${deadline}`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", function() {
            deleteTask(taskItem);
        });

        // Ajouter les éléments à la tâche
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(deadlinePara);
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    // Fonction pour supprimer une tâche
    function deleteTask(taskItem) {
        taskItem.remove();
        // Enregistrer les tâches dans le stockage local après la suppression
        saveTasks();
        // Vérifier à nouveau la présence de tâches après la suppression
        checkTasksPresence();
    }

    // Fonction pour mettre à jour le statut d'une tâche
    function updateTaskStatus(taskItem) {
        const checkbox = taskItem.querySelector("input[type='checkbox']");
        const label = taskItem.querySelector("label");
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "none";
        }
        // Enregistrer les tâches dans le stockage local après la mise à jour du statut
        saveTasks();
    }

    // Fonction pour enregistrer les tâches dans le stockage local
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector("label").textContent,
                deadline: taskItem.querySelector("p").textContent.split(": ")[1],
                priority: taskItem.dataset.priority,
                completed: taskItem.querySelector("input[type='checkbox']").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

});
