const wrapper = document.querySelector(".wrapper");
const menubtn = document.querySelector(".menu-btn");
const backbtn = document.querySelector(".back-btn");

const toggleScreen = () => {
    wrapper.classList.toggle("show-category");
};

menubtn.addEventListener("click", toggleScreen);
backbtn.addEventListener("click", toggleScreen);

const addtaskbtn = document.querySelector(".add-task-btn");
const addtaskform = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () =>{
    addtaskform.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addtaskbtn.classList.toggle("active");
};

addtaskbtn.addEventListener("click",toggleAddTaskForm);
blackBackdrop.addEventListener("click",toggleAddTaskForm);

// adding categories and tasks with js

let categories = [
    {
        title: "Personal",
        img: "personal.png",
    },
    {
        title: "Work",
        img: "work.png",
    },
    {
        title: "Shopping",
        img: "shopping.png",
    },
    {
        title: "Coding",
        img: "coding.png",
    },
    {
        title: "Health",
        img: "health.png",
    },
    {
        title: "Fitness",
        img: "fitness.png",
    },
    {
        title: "Education",
        img: "education.png",
    },
    {
        title: "Finance",
        img: "finance.png",
    },

];

let tasks = [
    {
      id: 1,
      task: "Go to market",
      category: "Shopping",
      completed: false,
    },
    {
      id: 2,
      task: "Read a chapter of a book",
      category: "Personal",
      completed: false,
    },
    {
      id: 3,
      task: "Prepare presentation for meeting",
      category: "Work",
      completed: false,
    },
    {
      id: 4,
      task: "Complete coding challenge",
      category: "Coding",
      completed: false,
    },
    {
      id: 5,
      task: "Take a 30-minute walk",
      category: "Health",
      completed: false,
    },
    {
      id: 6,
      task: "Do a 20-minute HIIT workout",
      category: "Fitness",
      completed: false,
    },
    {
      id: 7,
      task: "Watch an educational video online",
      category: "Education",
      completed: false,
    },
    {
      id: 8,
      task: "Review monthly budget",
      category: "Finance",
      completed: false,
    },
    {
      id: 9,
      task: "Buy groceries for the week",
      category: "Shopping",
      completed: false,
    },
    {
      id: 10,
      task: "Write in a journal",
      category: "Personal",
      completed: false,
    },
    {
      id: 11,
      task: "Send follow-up emails",
      category: "Work",
      completed: false,
    },
    {
      id: 12,
      task: "Work on a coding side project",
      category: "Coding",
      completed: false,
    },
    {
      id: 13,
      task: "Try a new healthy recipe",
      category: "Health",
      completed: false,
    },
    {
      id: 14,
      task: "Attend a yoga class",
      category: "Fitness",
      completed: false,
    },
    {
      id: 15,
      task: "Read an article about a new topic",
      category: "Education",
      completed: false,
    },
    {
      id: 16,
      task: "Set up automatic bill payments",
      category: "Finance",
      completed: false,
    },
]

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");


const calculateTotal = () => {
    const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
      );
      totalCategoryTasks.innerHTML = `${categoryTasks.length} tasks`;
      totalTasks.innerHTML = tasks.length;
}



const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category)=>{
        // get all the tasks of current category
        const categoryTasks = tasks.filter(
            (task) => task.category.toLowerCase() === category.title.toLowerCase()
          );

        // create a div to render category
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click",() => {
            wrapper.classList.add("show-category");
            selectedCategory = category;
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `icons/${category.img}`;
            calculateTotal();
            // render tasks when category changes
            renderTasks();
        });
        div.innerHTML = `
        <div class="left">
                            <img src="icons/${category.img}" alt="${category.title}">
                            <div class="content">
                                <h1>${category.title}</h1>
                                <p>${categoryTasks.length} tasks</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="toggle-btn">
                                <img src="icons/options.png" alt="options">
                            </div>
                        </div> 
        `;

        categoriesContainer.appendChild(div)
    });
};

const taskContainer = document.querySelector(".tasks");

const renderTasks = () => {
    taskContainer.innerHTML = ""   
    const categoryTasks = tasks.filter(
        (task) => task.category.toLowerCase() == selectedCategory.title.toLowerCase()
);

// if no task for selected category
if (categoryTasks.length === 0) {
    taskContainer.innerHTML = `
    <p class="no-task">No tasks for this category</p>
    `;
} else {
    // if there are tasks for selected category render
    categoryTasks.forEach((task) => {
        const div = document.createElement("div");
        div.classList.add ("task-wrapper");
        const label = document.createElement("label");
        label.classList.add("task");
        label.setAttribute("for",task.id);
        const checkbox = document.createElement("input");
        checkbox.type="checkbox";
        checkbox.id = task.id;
        checkbox.checked = task.completed;

        // add completion funtionalities on click checkbox
        checkbox.addEventListener("change",() => {
            const index = tasks.findIndex((t) => t.id === task.id);
            // change the true to false or vice versa
           tasks[index].completed = !tasks[index].completed; 
        //    save in locAL
        saveLocal();
        });

        div.innerHTML = `
        <div class="delete">
                            <img src="icons/delete.png" alt="">
                        </div>
        `;
        label.innerHTML = `
        <span class="checkmark">
                                <img src="icons/right.png" alt="">
                            </span>
                            <p>${task.task}</p>
        `;
        label.prepend(checkbox);
        div.prepend(label);
        taskContainer.appendChild(div);


        // delete functionality
        const deleteBtn = div.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            const index = tasks.findIndex((t) => t.id === task.id);

            // remove the clicked task
            tasks.splice(index,1);
            saveLocal();
            renderTasks();
        })

    });
    renderCategories();
    calculateTotal();
}


};

// save and get tasks from local storage
const saveLocal = () => {
    localStorage.setItem("tasks",JSON.stringify(tasks));
};

const getLocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));

    // if tasks found
    if (localTasks) {
        tasks = localTasks;
    }
};

// adding functionality to add button to add new tasks

// render all categories in select

const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click",toggleAddTaskForm);

addBtn.addEventListener("click",() => {
    const task = taskInput.value;
    const category = categorySelect.value;

    if ((task === "")) {
        alert("Please enter a task");
    } else {
        const newTask = {
            id: tasks.length + 1,
            task,
            category,
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value = "";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
    }
});

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase ();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});


getLocal();
// renderCategories();
calculateTotal();
renderTasks();