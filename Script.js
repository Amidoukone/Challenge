document.addEventListener("DOMContentLoaded", function() {
    // Sélection des éléments du formulaire
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const priorityInput = document.getElementById("priorityInput");

    // Sélection de la liste des tâches
    const taskList = document.querySelector(".task-list");

    // Charger les tâches depuis le stockage local au chargement de la page
    loadTasks();

    // Ajouter une nouvelle tâche
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

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

        const label = document.createElement("label");
        label.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Supprimer";

        // Ajouter les éléments à la tâche
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(deleteButton);

        // Ajouter la tâche à la liste des tâches
        taskList.appendChild(taskItem);

        // Enregistrer les tâches dans le stockage local
        saveTasks();

        // Effacer le formulaire après l'ajout de la tâche
        taskForm.reset();
    });

    // Supprimer une tâche
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const taskItem = event.target.closest(".task-item");
            taskItem.remove();
            // Enregistrer les tâches dans le stockage local après la suppression
            saveTasks();
        }
    });

    // Charger les tâches depuis le stockage local
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.dataset.priority = task.priority;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const label = document.createElement("label");
            label.textContent = task.text;

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.textContent = "Supprimer";

            // Ajouter les éléments à la tâche
            taskItem.appendChild(checkbox);
            taskItem.appendChild(label);
            taskItem.appendChild(deleteButton);

            // Ajouter la tâche à la liste des tâches
            taskList.appendChild(taskItem);
        });
    }

    // Enregistrer les tâches dans le stockage local
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector("label").textContent,
                priority: taskItem.dataset.priority
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

// Sélection de la liste des tâches
const taskList = document.querySelector(".task-list");

// Sélection de la section des détails de la tâche
const taskDetails = document.querySelector(".task-details");
const taskDetailsContent = document.getElementById("taskDetails");

// Gérer le clic sur une tâche pour afficher les détails
taskList.addEventListener("click", function(event) {
    const taskItem = event.target.closest(".task-item");
    if (taskItem) {
        // Récupérer les détails de la tâche
        const taskText = taskItem.querySelector("label").textContent;
        const taskPriority = taskItem.dataset.priority;
        const taskStatus = taskItem.querySelector("input[type='checkbox']").checked ? "Terminée" : "En cours";

        // Mettre à jour les détails de la tâche dans la section des détails
        taskDetailsContent.innerHTML = `
            <p><strong>Tâche :</strong> ${taskText}</p>
            <p><strong>Priorité :</strong> ${taskPriority}</p>
            <p><strong>Statut :</strong> ${taskStatus}</p>
            <p><strong>Date d'échéance :</strong> ${deadlineInput.value}</p>
        `;

        // Mettre à jour les styles en fonction de la priorité de la tâche
        switch (taskPriority) {
            case "Urgente":
                taskDetails.style.backgroundColor = "#dc3545";
                taskDetails.style.color = "white";
                break;
            case "Importante":
                taskDetails.style.backgroundColor = "#007bff";
                taskDetails.style.color = "white";
                break;
            case "Ordinaire":
                taskDetails.style.backgroundColor = "#28a745";
                taskDetails.style.color = "white";
                break;
        }

        // Afficher la section des détails de la tâche
        taskDetails.style.display = "block";
    }
});
