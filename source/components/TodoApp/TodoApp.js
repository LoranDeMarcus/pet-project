import ItemTemplate from './itemTemplate';
import { GenerateNum } from '../GenerateNum';

const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();

export default class TodoApp {
    constructor() {
        this.todoListArray = [];
        this.newId = getNewUserID.generateByDate();
        this.todoList = document.querySelector('.todo-app__list');
        this.todoCount = document.querySelector('.todo-app__todo-count');
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
        this.insertTodoCount();
    }
    
    insertTodoText() {
        this.todoList.innerHTML = itemTemplate.listItem(this.todoListArray);
    }
    
    insertTodoCount() {
        console.log(this.todoListArray);
        this.todoCount.innerHTML = this.todoListArray.length;
    }
}