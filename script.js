// DOM Manipulators
const inputEl = document.querySelector('#input');
const tasks = document.querySelector('.task-box');
const deleteAllBtn = document.querySelector('.clear-btn')

deleteAllBtn.addEventListener('click', () => {
    allTodoItems = [];
    displayTodos();
})
// Event Listeners
inputEl.addEventListener('keyup', addTodo);

// Functions
let allTodoItems = [];

function addTodo(e) {
    // Remove unwanted spaces when the user enters a task
    let task = inputEl.value.trim();
    if (e.key == 'Enter' && task) {

        // Create a new task once the user presses enter
        const taskEl = document.createElement('li');
        taskEl.classList.add('task');

        const contentEl = document.createElement('div');
        contentEl.classList.add('content');
        taskEl.appendChild(contentEl);

        const check_el = document.createElement('input');
        check_el.setAttribute('type', 'checkbox');
        contentEl.appendChild(check_el);

        const task_el = document.createElement('P');
        contentEl.appendChild(task_el);
        task_el.innerText = task;

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

        const index = allTodoItems.length;
        taskEl.setAttribute('id', `todo-${index}`);        

        // Add todo item to the array
        allTodoItems.push(taskEl);

        console.log(allTodoItems)
        
        // Call displayTodos to update the display
        displayTodos();

        inputEl.value = '';
    }
}



function editTodo(e) {
    // Traverse up the DOM to find the parent task element (li)
    const taskToEdit = e.target.closest('.task');
    // Find the paragraph element inside the task
    const paragraph = taskToEdit.querySelector('.content p');
    // Make the paragraph editable
    paragraph.contentEditable = true;
    // Set focus on the paragraph for editing
    paragraph.focus();
    const modalToShow = taskToEdit.querySelector('.modal')
    console.log(modalToShow)
    modalToShow.classList.remove('modal-show');
    modalToShow.classList.add('modal-hide');
}


function deleteTodo(e) {
    // Traverse up the DOM to find the parent task element (li)
    const taskToDelete = e.target.closest('.task');
    // Find the index of the task in the todoItems array
    const indexToDelete = allTodoItems.indexOf(taskToDelete);
    // Remove the task from the array
    allTodoItems.splice(indexToDelete, 1);
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



// Display all todos in the todoItems array
const displayTodos = () => {
    // Clear existing tasks
    tasks.innerHTML = '';
    // Append each todo item to the task list
    allTodoItems.forEach(todo => {
        tasks.appendChild(todo);
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


