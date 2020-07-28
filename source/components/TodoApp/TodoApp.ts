import ItemTemplate from './item-template';
import { GenerateNum } from '../GenerateNum';

const footer = document.querySelector('.todo-app__footer') as HTMLDivElement;
const footer_active = 'todo-app__footer_active';

const itemTemplate = new ItemTemplate();
const getNewUserID = new GenerateNum();

type TodoType = {
    id: number,
    title: string,
    completed: boolean
}

export default class TodoApp {
    todoListArray: Array<TodoType>;
    $todoList: HTMLElement;
    $todoCount: HTMLElement;
    $todoItemsLeft: HTMLElement;
    $clearCompletedButton: HTMLElement;

    constructor($elem: HTMLElement) {
        this.todoListArray = [];
        this.$todoList = $elem.querySelector('.todo-app__list') as HTMLElement;
        this.$todoCount = $elem.querySelector('.todo-app__todo-count') as HTMLElement;
        this.$todoItemsLeft = $elem.querySelector('.todo-app__todo-count') as HTMLElement;
        this.$clearCompletedButton = $elem.querySelector('.todo-app__clear-completed') as HTMLElement;

    }

    getNewId() {
        return getNewUserID.generateNumByDate();
    }

    clearInput() {
        const inputValue = document.querySelector('.todo-app__input') as HTMLInputElement;
        inputValue.value = '';
    }

    addToArray(text: string) {
        this.todoListArray.push({
            id: this.getNewId(),
            title: text,
            completed: false,
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

    deleteTodoItem($elem: any) {
        const elemId = +$elem.getAttribute('data-id');
        this.todoListArray = this.todoListArray.filter((item: TodoType) => item.id !== elemId);
        this.renderItems();
    }

    updateTodoStatus($todoItem: HTMLElement) {
        const todoItemId = Number($todoItem.dataset.id);
        this.todoListArray.some((item: TodoType) => {
            const isCurrentItem = item.id === todoItemId;
            if (isCurrentItem) item.completed = !item.completed;
            return isCurrentItem;
        });
        this.renderItems();
    }

    showFooter() {
        this.todoListArray.length >= 1
            ? footer.classList.add(footer_active)
            : footer.classList.remove(footer_active);
    }

    toggleAllItems(isChecked: boolean) {
        this.todoListArray.map((item: { completed: boolean; }) => { return item.completed = isChecked });
        this.renderItems(); /* TODO: сделать чтобы при нажатии item.completed = false */
    }

    toggleClearCompletedButton() {
        this.todoListArray.filter((item: { completed: boolean; }) => item.completed).length >= 1 ?
            this.$clearCompletedButton.style.display = 'block' :
            this.$clearCompletedButton.style.display = 'none'
    }

    clearCompleted() {
        this.todoListArray = this.todoListArray.filter((item: { completed: boolean; }) => !item.completed);
        this.renderItems();
    }

    showAllItems() {
        this.renderItems();
    }

    showActiveItems() {
        const active = this.todoListArray.filter((item: { completed: boolean; }) => !item.completed);
        this.$todoList.innerHTML = itemTemplate.listItem(active);
        this.updateTodoList();
    }

    showCompleteItems() {
        const complete = this.todoListArray.filter((item: { completed: boolean; }) => item.completed);
        this.$todoList.innerHTML = itemTemplate.listItem(complete);
        this.updateTodoList();
    }

    updateTodoCount() {
        return this.todoListArray.filter((item: { completed: boolean; }) => !item.completed).length;
    }

    itemCounter() {
        this.$todoItemsLeft.innerText = this.todoListArray.filter((item: { completed: boolean; }) => 
            !item.completed).length > 1
                ? `${this.updateTodoCount()} items left of ${this.todoListArray.length}`
                : `${this.updateTodoCount()} item left of ${this.todoListArray.length}`;
    }
}