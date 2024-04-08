# Challenge
# html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste de Tâches Interactive - Challenge</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo"><img src="Images/Logo_challenge.png" alt="Image d'illustration"/></div>
        <div class="title"><h1 class="content">Challenge</h1></div>
    </header>

    <main>
        <div class="image-container">
            <img src="Images/Accueil_image.png" alt="Image d'illustration"/>
            <h2 class="text">Pas de tâches ...</h2>
        </div>
        <div class="container">
            <section class="task-input">
                <h2>Ajouter une Nouvelle Tâche</h2>
                <form id="taskForm">
                    <input type="text" id="taskInput" placeholder="Nom de la nouvelle tâche" required>
                    <label for="deadlineInput">Date d'échéance :</label>
                    <input type="date" id="deadlineInput">
                    <label for="priorityInput">Priorité :</label>
                    <select id="priorityInput">
                        <option value="Urgente">Urgente</option>
                        <option value="Importante">Importante</option>
                        <option value="Ordinaire">Ordinaire</option>
                    </select>
                    <button type="submit">Valider</button>
                </form>
            </section>

            <section class="task-list">
                <h2>Liste des Tâches</h2>
            </section>
        </div>

        <div class="task-details">
            <h2>Détails de la Tâche</h2>
            <div id="taskDetails"></div>
        </div>
    </main>

    <footer>
        <button id="addTaskBtn">+</button>
    </footer>

    <script src="script.js"></script>
</body>
</html>

# css
/* Couleurs */
:root {
    --blue-color: #007bff;
    --green-color: #dfe9e1;
    --red-color: #dc3545;
}

/* Styles généraux */
body {
    font-family: 'Times New Roman', Times, serif, sans-serif;
    margin: 0;
    padding: 0;
}

/* En-tête */
header {
    color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    padding: 10px;
    align-items: center;
}

.logo {
    flex: 0 0 auto;
}

.logo img {
    width: 100px; /* Taille du logo */
}

.title {
    /* background-color: var(--blue-color); */
    flex: 1;
    text-align: right;
    width: 50px;
}
.content{
    background-color: var(--blue-color);
    width: 140px;
    float: right;
    color: #ffffff;
    border-radius: 8px;

}

/* Image d'accueil */
.image-container {
    text-align: center;
    margin-top: 20px;
}

.image-container img {
    max-width: 30%; /* Ajuster la largeur de l'image au conteneur */
}

/* Conteneur principal */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
}

/* Formulaire d'ajout de tâche */
.task-input {
    background-color: var(--green-color);
    border: 1px solid var(--blue-color);
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 500px; /* Largeur maximale du formulaire */
}

.task-input h2 {
    margin-top: 0;
}

.task-input form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-input input[type="text"],
.task-input select,
.task-input button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ced4da;
}

/* Liste des tâches */
.task-list {
    background-color: var(--green-color);
    border: 1px solid var(--blue-color);
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 500px; /* Largeur maximale de la liste des tâches */
}

.task-list h2 {
    margin-top: 0;
}

.task-list .task-item {
    display: flex;
    aligen-itms: center;
    gap: 10px;
}

.task-list .task-item label {
    flex: 1;
}

button[type="submit"] {
    background-color: var(--blue-color);
    color: #ffffff;
}

button[type="submit"]:hover {
    background-color: #218838;
    color: #ffffff;
}


.task-details {
    background-color: var(--green-color);
    border: 1px solid var(--blue-color);
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    display: none;
}



.task-details h2 {
    margin-top: 0;
}

.task-details p {
    margin: 5px 0;
}

/* Pied de page */
footer {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

footer button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--blue-color);
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
}

footer button:hover {
    background-color: #0056b3;
}


# js
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

# js2

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
        `;

        // Récupérer la date d'échéance du formulaire
const deadline = deadlineInput.value;

// Inclure la date d'échéance dans le contenu des détails de la tâche
taskDetailsContent.innerHTML += `<p><strong>Date d'échéance :</strong> ${deadline}</p>`;


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


