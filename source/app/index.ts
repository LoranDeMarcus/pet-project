import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '../components/TodoApp';

const $toggleAll = document.querySelector('#select-all') as HTMLElement;
const $todoList = document.querySelector('.todo-app__list') as HTMLElement;
const $filtersList = document.querySelector('.todo-app__filters-list') as HTMLElement;
const filterItemSelected = 'todo-app__filters-item_selected';
const $filterAll = $filtersList.querySelector('.todo-app__filters-item_all') as HTMLElement;
const $filterActive = $filtersList.querySelector('.todo-app__filters-item_active') as HTMLElement;
const $filterComplete = $filtersList.querySelector('.todo-app__filters-item_complete') as HTMLElement;
const $clearCompletedButton = document.querySelector('.todo-app__clear-completed') as HTMLElement;

const $todoApp = document.querySelector('.todo-app') as HTMLElement;
const todoApp = new TodoApp($todoApp);

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        let todoText = document.querySelector('.todo-app__input') as any;

        todoText = todoText.value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
});

$toggleAll.addEventListener('click', e => {
    todoApp.toggleAllItems((e.target as HTMLInputElement).checked);
});

$todoList.addEventListener('change', (e: Event) => {
    const $listItem = (<HTMLElement>e.target).parentNode as HTMLElement;
    if ((<HTMLElement>e.target).classList.contains('todo-app__list-checkbox')) {
        todoApp.updateTodoStatus($listItem);
    }
});

$todoList.addEventListener('click', (e: MouseEvent) => {
    const $listItem = (<HTMLElement>e.target).parentNode;
    if ((<HTMLElement>e.target).classList.contains('todo-app__item-destroy')) {
        todoApp.deleteTodoItem($listItem);
    }
});

$clearCompletedButton.addEventListener('click', () => {
    todoApp.clearCompleted();
})

$filterAll.addEventListener('click', (e: MouseEvent) => {
    todoApp.showAllItems();
    if (!(<HTMLElement>e.currentTarget).classList.contains(filterItemSelected)) {
        (<HTMLElement>e.currentTarget).classList.add(filterItemSelected);
        $filterActive.classList.remove(filterItemSelected);
        $filterComplete.classList.remove(filterItemSelected);
    }
});

$filterActive.addEventListener('click', (e: MouseEvent) => {
    todoApp.showActiveItems();
    if (!(<HTMLElement>e.currentTarget).classList.contains(filterItemSelected)) {
        (<HTMLElement>e.currentTarget).classList.add(filterItemSelected);
        $filterAll.classList.remove(filterItemSelected);
        $filterComplete.classList.remove(filterItemSelected);
    }
});

$filterComplete.addEventListener('click', (e: MouseEvent) => {
    todoApp.showCompleteItems();
    if (!(<HTMLElement>e.currentTarget).classList.contains(filterItemSelected)) {
        (<HTMLElement>e.currentTarget).classList.add(filterItemSelected);
        $filterActive.classList.remove(filterItemSelected);
        $filterAll.classList.remove(filterItemSelected);
    }
});