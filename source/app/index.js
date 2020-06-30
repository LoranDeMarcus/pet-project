import '../components/base.scss'
import '../components/TodoApp';

import ItemTemplate from "@components/TodoApp/itemTemplate";
import { GenerateNum } from "@components/GenerateNum";

const todoList = [];
const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();
const list = document.querySelector('.todo-app__list');

document.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        const newId = getNewUserID.generateByDate();
        const text = document.querySelector('.todo-app__input').value.trim();
        document.querySelector('.todo-app__input').value = '';
        
        todoList.push({
            id: newId,
            title: text,
            completed: false
        });
        
        list.innerHTML = itemTemplate.listItem(todoList);
        
    }
});