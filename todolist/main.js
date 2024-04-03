const ToDolist = "ToDolist";

let data = [{
    task : 'run' ,
    is_complete : true,
}]

// save data localhost 
const saveData = function(data) {
    data = localStorage.setItem(ToDolist,JSON.stringify(data))
}
// load data localhost
const loadData = function() {
    data = JSON.parse(localStorage.getItem(ToDolist))
    data = data ? data : [];
    return data
}

const addTask = (newTask) =>{
    let data;
    data = loadData();
    //data.push(newTask)
    data = [...data,newTask]
    console.log(data)
    // saveData(data);
    // console.log(data)
}
const formTask = document.forms.add_task
    formTask.addEventListener('submit',(e)=> { 
        let newTask;
        const task = document.querySelector('#task');
        console.log(task.value )
        newTask = {
            task : task.value,
            is_complete : false
        };
        addTask(newTask)
        e.preventDefault();
    })