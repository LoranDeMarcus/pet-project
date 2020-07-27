import ItemTemplate from './item-template.ts';
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
        this.$todoItemsLeft = $elem.querySelector('.todo-app__todo-count');
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

        this.renderItems();
    }

    renderItems() {
        this.$todoList.innerHTML = itemTemplate.listItem(this.todoListArray);
        this.updateTodoList();
    }

    updateTodoList() {
        this.showFooter();
        this.clearInput();
        this.itemCounter();
        this.toggleClearCompletedButton();
        console.log(this.todoListArray);
    }

    deleteTodoItem($elem) {
        const elemId = +$elem.getAttribute('data-id');
        const index = this.todoListArray.findIndex( item => item.id === elemId );
        this.todoListArray.splice(index, 1);
        this.renderItems();
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
        this.renderItems();
    }

    showFooter() {
        this.todoListArray.length >= 1 ?
            footer.classList.add(footer_active) :
            footer.classList.remove(footer_active);
    }

    toggleAllItems() {
        this.todoListArray.map(item => { return item.completed = true });
        this.renderItems(); /* TODO: сделать чтобы при нажатии item.completed = false */
    }

    toggleClearCompletedButton() {
        this.todoListArray.filter(item => item.completed === true).length >= 1 ?
            this.$clearCompletedButton.style.display = 'block' :
            this.$clearCompletedButton.style.display = 'none'
    }

    clearCompleted() {
        this.todoListArray = this.todoListArray.filter(item => item.completed !== true);
        this.renderItems();
    }

    showAllItems() {
        this.renderItems();
    }

    showActiveItems() {
        const active = this.todoListArray.filter(item => item.completed !== true);
        this.$todoList.innerHTML = itemTemplate.listItem(active);
        this.updateTodoList();
    }

    showCompleteItems() {
        const complete = this.todoListArray.filter(item => item.completed !== false);
        this.$todoList.innerHTML = itemTemplate.listItem(complete);
        this.updateTodoList();
    }

    updateTodoCount() {
        return this.todoListArray.filter(item => item.completed === false).length;
    }

    itemCounter() {
        this.$todoItemsLeft.innerText = this.todoListArray.filter(item => item.completed === false).length > 1 ? `${this.updateTodoCount()} items left` : `${this.updateTodoCount()} item left`;
    }
}