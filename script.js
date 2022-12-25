//DOM Manipulators
const inputEl = document.querySelector('#input');
const filterAll = document.querySelector('#all');
const filterPending = document.querySelector('#pending');
const filterCompleted = document.querySelector('#completed');
const clearBtn = document.querySelector('.clear-btn');
const tasks = document.querySelector('.task-box');
const show_menu = document.querySelector('.fa-ellipsis-h');
// console.log(tasks)


//Event Listeners
inputEl.addEventListener('keyup', addTodo);
clearBtn.addEventListener('click', deleteAllTodos); 
show_menu.addEventListener('click', showMenu);

//Functions

function addTodo(e){
     //Remove unwanted spaces when the user enters a task
    const task = inputEl.value.trim();    
    if(e.key == 'Enter' && task == false){
        // alert('Enter Valid Task');
        console.log('Invalid Task')  
    }else if(e.key == 'Enter'  && task){
        console.log('Valid Task')
        console.log(task)

    //create a new task once the user presses enter
    const taskEl = document.createElement('li');
    taskEl.classList.add('task');
    tasks.appendChild(taskEl);
    // taskEl.innerText = task

    const label = document.createElement('label');
    taskEl.appendChild(label);

    const check_el = document.createElement('input');
    check_el.setAttribute('type', 'checkbox');
    label.appendChild(check_el);

    const task_el = document.createElement('p');
    label.appendChild(task_el);
    task_el.innerText = task;

    const settingZ = document.createElement('div');
    settingZ.classList.add('settings');
    taskEl.appendChild(settingZ);
    settingZ.innerHTML = `<i class="fa fa-ellipsis-h" aria-hidden="true"></i>`

    const menu = document.createElement('ul');
    menu.classList.add('task-menu');    
    menu.innerHTML = `<li><i class="fa fa-pencil" aria-hidden="true"></i>Edit</li>
                        <li><i class="fa fa-trash"></i>Delete</li>`
    settingZ.appendChild(menu);

    inputEl.value = '';
    } 
}

function deleteAllTodos(e){

}

// function showMenu(selectedTask){
//     //Getting Task-menu div
//     let taskMenu = selectedTask.parentElement.lastElementChild;
//     menu.classList.add('show');
//     document.addEventListener('click', (e) => {
//         //removing the class of show
//         if(e.target.tagName != 'I' || e.target != selectedTask){
//             taskMenu.classList.remove('show')
//         }
//     })
// }

function showMenu(){
    menu.classList.add('show')
}