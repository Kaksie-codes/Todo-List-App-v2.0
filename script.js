import { sayHello } from "./test.js";
// DOM Manipulators
const inputEl = document.querySelector('#input');
const tasks = document.querySelector('.task-box');
const deleteAllBtn = document.querySelector('.clear-btn');
const dateInputEl = document.querySelector('#date');
const addBtn = document.querySelector('.add-btn')

sayHello();
// Functions
let allTodoItems = JSON.parse(localStorage.getItem('todos')) || [];

displayTodos();


// Event Listeners
addBtn.addEventListener('click', addTodo);
deleteAllBtn.addEventListener('click', () => {
    allTodoItems = [];
    localStorage.setItem('todos', JSON.stringify(allTodoItems))
    displayTodos();
})

let taskObject;


// Remove unwanted spaces when the user enters a task
let task;
let date;


function addTodo(e) { 
    task = inputEl.value.trim();
    date = dateInputEl.value;

    taskObject = {
        task,
        date
    }
   
    // Add todo item to the array
    allTodoItems.push(taskObject);

    localStorage.setItem('todos', JSON.stringify(allTodoItems))
    // console.log(allTodoItems)
        
    inputEl.value = '';

    // Call displayTodos to update the display
    displayTodos();   
    
}

// Display all todos in the todoItems array
function displayTodos(){
    // Clear existing tasks
    tasks.innerHTML = '';

    // Append each todo item to the task list
    allTodoItems.forEach((todo, index) => {
        // tasks.appendChild(todo);
        // console.log('todo ==>>', todo)
        const taskEl = document.createElement('li');
        taskEl.classList.add('task');

        const contentEl = document.createElement('div');
        contentEl.classList.add('content');
        taskEl.appendChild(contentEl);

        const check_el = document.createElement('input');
        check_el.setAttribute('type', 'checkbox');
        contentEl.appendChild(check_el);


        const spansWrapper = document.createElement('div');
        contentEl.appendChild(spansWrapper);
        spansWrapper.classList.add('spans');
        contentEl.appendChild(spansWrapper);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = todo.task;
        taskSpan.classList.add('text');
        spansWrapper.appendChild(taskSpan);

        const dateSpan = document.createElement('span');
        dateSpan.textContent = todo.date;
        dateSpan.classList.add('date');
        spansWrapper.appendChild(dateSpan);


        const settingEL = document.createElement('div');
        settingEL.classList.add('settings');
        taskEl.appendChild(settingEL);
        
        const modalToggleBtn = document.createElement('i');
        modalToggleBtn.classList.add('fa', 'fa-ellipsis-h', 'open-modal');
        modalToggleBtn.addEventListener('click', showModal)
        settingEL.appendChild(modalToggleBtn);

        const modal = document.createElement('ul');
        modal.classList.add('modal', 'modal-hide');


        
        const editBtn = document.createElement('li');
        // editBtn.setAttribute('id', 'your_id_here');
        const editIcon = document.createElement('i');
        editIcon.classList.add("fa", "fa-pencil");
        const editText = document.createElement('span');
        editText .innerText = 'Edit'
        editBtn.appendChild(editIcon)
        editBtn.appendChild(editText)
        editBtn.addEventListener('click', editTodo)
        modal.appendChild(editBtn)

        const delBtn = document.createElement('li');
        // delBtn.setAttribute('id', 'your_id_here');
        const delIcon = document.createElement('i');
        delIcon.classList.add("fa", "fa-trash");
        const delText = document.createElement('span');
        delText.innerText = 'Delete'
        delBtn.appendChild(delIcon)
        delBtn.appendChild(delText)
        delBtn.addEventListener('click', deleteTodo)
        modal.appendChild(delBtn)

        settingEL.appendChild(modal) 

        // const index = allTodoItems.length;
        console.log('lenght', index)
        taskEl.setAttribute('id', `todo-${index}`); 

        tasks.appendChild(taskEl)
    });
    
}


document.body.addEventListener('click', function(e) {
    const clickedElement = e.target;
    // Check if the clicked element is not inside any modal
    if (!clickedElement.closest('.modal') && !clickedElement.classList.contains('open-modal')) {
        // Close all modals
        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(modal => {
            modal.classList.remove('modal-show');
            modal.classList.add('modal-hide');
        });
    }
});

function deleteTodo(e) {
    // Traverse up the DOM to find the parent task element (li)
    const taskToDelete = e.target.closest('.task');
    // Find the index of the task in the todoItems array
    const indexToDelete = allTodoItems.indexOf(taskToDelete);
    // Remove the task from the array
    allTodoItems.splice(indexToDelete, 1);
    localStorage.setItem('todos', JSON.stringify(allTodoItems))
    // Re-display the updated todos
    displayTodos();
}

function showModal(e) {
    // Get the ID of the clicked task
    const taskId = e.target.closest('.task').getAttribute('id');
    // Find the corresponding modal element using the task ID
    const todo = document.getElementById(taskId);    
    const modalToShow = todo.querySelector('.modal')    
    modalToShow.classList.remove('modal-hide');
    modalToShow.classList.add('modal-show');
}



function editTodo(e) {
    // Traverse up the DOM to find the parent task element (li)
    const taskToEdit = e.target.closest('.task');
    console.log('taskToEdit ==>>',taskToEdit)
    // Find the paragraph element inside the task
    const textSpan = taskToEdit.querySelector('.text');
    // Make the paragraph editable
    textSpan.contentEditable = true;
    // Set focus on the paragraph for editing
    textSpan.focus();
    const modalToShow = taskToEdit.querySelector('.modal')
    console.log('modalToShow ==>>',modalToShow)
    textSpan.addEventListener('input', () => {
        // Update the task content in the local storage
        // Get the index of the task being edited
        const taskId = taskToEdit.getAttribute('id');
        const taskIndex = parseInt(taskId.split('-')[1]);

        // Update the task content in the array
        allTodoItems[taskIndex].task = textSpan.textContent;

        // Save the updated todos array in localStorage
        localStorage.setItem('todos', JSON.stringify(allTodoItems));
    });
    modalToShow.classList.remove('modal-show');
    modalToShow.classList.add('modal-hide');    
}