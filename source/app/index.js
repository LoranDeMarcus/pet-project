import '../components/base.scss'
import '../components/TodoApp';

import ItemTemplate from '@components/TodoApp/itemTemplate';
import { GenerateNum } from '@components/GenerateNum';

const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();

class TodoApp {
    constructor() {
        this.todoListArray = [];
        this.newId = getNewUserID.generateByDate();
        this.todoList = document.querySelector('.todo-app__list');
    }
    
    getNewId() {
        return this.newId;
    }
    
    clearInput() {
        document.querySelector('.todo-app__input').value = '';
    }
    
    addToArray(text) {
        this.todoListArray.push({
            id: this.getNewId(),
            title: text,
            completed: false
        });
        
        this.insertTodoText();
        this.clearInput();
        console.log(this.todoListArray);
    }
    
    insertTodoText() {
        this.todoList.innerHTML = itemTemplate.listItem(this.todoListArray);
    }
}

const todoApp = new TodoApp();

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        //console.log(todoText)
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
    
});