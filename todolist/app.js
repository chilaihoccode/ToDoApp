const ToDolist = 'ToDolist';
// create data
let data = [{
    task : 'Run 2km',
    is_complete: true
}]

// save Data
const saveData = (data) =>{
    data = localStorage.setItem(ToDolist,JSON.stringify(data))
}

// load Data
const loadData = () =>{
    data = JSON.parse(localStorage.getItem(ToDolist))
    data = data?data:[]
    return data
}

// console.log(loadData())

// new task
const addTask = (newTask) =>{
    let data;
    data = loadData();
    //data.push(newTask)
    data = [...data,newTask]
    saveData(data);
    // console.log(data)
}

// addTask
// const fromAdd = document.forms.add_task;
//     let newTask;
//     fromAdd.addEventListener('submit',(e)=>{
//         const task = document.querySelector('#task')
//         newTask = {
//             task : task.value,
//             is_complete: false
//         }
//         addTask(newTask);
//         renderTasks()
//         task.value = ''
//         //console.log(loadData())
//         e.preventDefault();
//     })


// createItem
const createItemTask = (task,is_complete,index) =>{
    return `
        <li class="task-item" index=${index} is-complete=${is_complete}>
            <span onclick='makeItemsComplete(${index})'>${task}</span>
            <div class="task-action">
                    <button onclick='editItemTask(${index})'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                     d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                        
                    </button>
                    <button onclick='deleteTask(this,${index})'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" 
                        class="w-6 h-6">
                            <path stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>                                
                    </svg>                              
                </button>
            </div>
        </li>
        `;
}




// render
const renderTasks = () =>{
    let ulTasks , ulTasksHTML, task_result, countTask; 
    ulTasks = document.querySelector('ul#tasks');
    task_result = document.querySelector('#result')
    countTask = 0;
    data = loadData();
    console.log(data)
    ulTasksHTML = data.map((element,index)=>{
        if (element.is_complete == true) countTask++;
        return createItemTask(element.task,element.is_complete,index)
    })

    task_result.innerText = `Yeah,${countTask} task completed`
    ulTasks.innerHTML = ulTasksHTML.join('');
}
renderTasks();

// makeItemsComplete
const makeItemsComplete = (index) => {
    data = loadData();
    data[index].is_complete = data[index].is_complete == false?true:false
    saveData(data)
   
    //console.log(data[index])
    renderTasks();
}

//deleteTasks
const deleteTask = (element,index) => {
    let verify = confirm('are you sure');
    //console.log(verify)
    if(verify == false ) return false;
    data = loadData();
    data.splice(index,1)
    element.closest('li.task-item').remove();
    saveData(data)
    //renderTasks()
    //console.log(data)
}

// editTask
const editItemTask = (index) =>{
    const btn = document.querySelector('#add_task button')
    data = loadData();
    const task = document.querySelector('#task')
    task.value = data[index].task;
    task.setAttribute('index',index)
    btn.innerText = 'EDIT TASK'
    saveData(data)
}

const editTask = (task,index) => {
    const btn = document.querySelector('#add_task button')
    data = loadData();
    data[index].task = task;
    saveData(data)
    btn.innerText = 'ADD TASK'
}

const fromAdd = document.forms.add_task;
    let newTask;
    fromAdd.addEventListener('submit',(e)=>{
        const task = document.querySelector('#task')
        const index = task.getAttribute('index');
        // console.log(loadData())
       
        //console.log(task.value.length)
        // if(task.value.length <2) {
        //     alert('Enter Task > 2')
        //     return false
        // }

        if(index) {
            editTask(task.value,index)
            task.getAttribute('index').remove();
        }else{
            newTask = {
                task : task.value,
                is_complete: false
            }
            addTask(newTask);
        }
  
        renderTasks()
        task.value = ''
        // //console.log(loadData())
        e.preventDefault();
    })

document.addEventListener('keyup',(e)=>{
    if (e.which == 27) {
        const task = document.querySelector('#task')
        task.value = '';
        task.removeAttribute('index');
        const btn = document.querySelector('#add_task button')
        btn.innerText = 'ADD TASK';
    }
})
