import ItemTemplate from './item-template';
import { GenerateNum } from '../GenerateNum';

const footer = document.querySelector('.todo-app__footer');
const footer_active = 'todo-app__footer_active';

const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();

export default class TodoApp {
    constructor($elem) {
        this.todoListArray = [];
        this.$todoList = $elem.querySelector('.todo-app__list');
        this.$todoCount = $elem.querySelector('.todo-app__todo-count');
        this.$clearCompletedButton = $elem.querySelector('.todo-app__clear-completed');
    }
    
    getNewId() {
        return getNewUserID.generateNumByDate();
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
        
        this.updateTodoList();
    }
    
    updateTodoList() {
        this.$todoList.innerHTML = itemTemplate.listItem(this.todoListArray);
        this.showFooter();
        this.clearInput();
        this.updateTodoCount();
        this.toggleClearCompletedButton();
        console.log(this.todoListArray);
    }
    
    updateTodoCount() {
        this.$todoCount.innerText = this.todoListArray.filter(item => item.completed === false).length;
    }
    
    updateTodoStatus($elem) {
        if ($elem === undefined) {
            return false
        } else {
            const elemId = +$elem.getAttribute('data-id');
            const object = this.todoListArray.find(item => item.id === elemId);
            object.completed === false ?
                object.completed = true :
                object.completed = false;
        }
        this.updateTodoList();
    }
    
    deleteTodoItem($elem) {
        const elemId = +$elem.getAttribute('data-id');
        const index = this.todoListArray.findIndex( item => item.id === elemId );
        this.todoListArray.splice(index, 1);
        this.updateTodoList();
    }
    
    showFooter() {
        this.todoListArray.length >= 1 ?
            footer.classList.add(footer_active) :
            footer.classList.remove(footer_active);
    }
    
    toggleClearCompletedButton() {
        this.todoListArray.filter(item => item.completed === true).length >= 1 ?
            this.$clearCompletedButton.style.display = 'block' :
            this.$clearCompletedButton.style.display = 'none'
    }
    
    clearCompleted() {
        this.todoListArray = this.todoListArray.filter(item => item.completed !== true);
        this.updateTodoList();
    }
}