let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let todo = "";

let showTodos = document.querySelector(".todos-container");
let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

addTodoButton.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = todoInput.value;
    if (todo.length > 0) {
        todoList.push({
            todo,
            id: uuid(),
            isCompleted: false
        });
        renderTodoList(todoList);
        localStorage.setItem("todos", JSON.stringify(todoList));
        todoInput.value= "";
    }
    })
 showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey
    todoList = todoList.map(todo => todo.id === key ?{...todo, isCompleted: !todo.isCompleted} : todo);
    todoList = todoList.filter(todo =>todo.id !== delTodokey)
    localStorage.setItem("todo", JSON.stringify(todoList)); 
    console.log(todoList)
    renderTodoList(todoList);
    
 });


function renderTodoList(todoList){
    
 showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class="todo relative">
 <input class="t-checkbox t-pointer" type="checkbox" id="item-${id}" 
 data ${isCompleted ? "checked" : ""} data-key="${id}"/>
 <label class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" 
 data-key=${id}>${todo}</label><button class="button cursor del-btn absolute right-0">
 <span data-todokey=${id} class="material-icons-outlined">
 delete
 </span></button>
 </div>`)

};



renderTodoList(todoList);