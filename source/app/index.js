import '../components/base.scss'
import '../components/TodoApp';

import ItemTemplate from "@components/TodoApp/itemTemplate";

const todoList = [];
const itemTemplate = new ItemTemplate();
const list = document.querySelector('.todo-app__list');

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        const newId = getNewUserID();
        const text = document.querySelector('.todo-app__input').value.trim();
        document.querySelector('.todo-app__input').value = '';
        
        todoList.push({
            id: newId,
            title: text,
            completed: false
        });
        console.log(todoList);
        console.log(itemTemplate.listItem(todoList));
        list.innerHTML = itemTemplate.listItem(todoList);
        
    }
});

function getNewUserID() {
    return Date.now();
}