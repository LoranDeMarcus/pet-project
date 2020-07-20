import ItemTemplate from './item-template';
import { GenerateNum } from '../GenerateNum';

const footer = document.querySelector('.todo-app__footer');
const footer_active = 'todo-app__footer_active';

const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();

export default class TodoApp {
    constructor() {
        this.todoListArray = [];
        this.todoList = document.querySelector('.todo-app__list');
        this.todoListItem = document.querySelector('.todo-app__list-item');
        this.todoCount = document.querySelector('.todo-app__todo-count');
    }
    
    getNewId() {
        return getNewUserID.generateByDate();
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
        this.showFooter();
        this.updateCount();
    }
    
    insertTodoText() {
        this.todoList.innerHTML = itemTemplate.listItem(this.todoListArray);
    }
    
    insertTodoCount() {
        this.todoCount.innerText = this.todoListArray.map(item => {
            return item.completed.false;
        }).length;
    }
    
    updateTodoStatus() {
        // TODO: посмотреть https://github.com/LoranDeMarcus/todo-array/blob/master/js/application.js  $('#todo-list').on('click', 'button.destroy', function() {...} куда ссылается
    }
    
    showFooter() {
        this.todoListArray.length >= 1 ? footer.classList.add(footer_active) : footer.classList.remove(footer_active);
    }
    
    updateCount() {
        this.insertTodoCount();
    }
}