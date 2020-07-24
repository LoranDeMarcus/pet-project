import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '@components/TodoApp';

const $toggleAll = document.querySelector('.todo-app__input-checkbox-label');
const $todoList = document.querySelector('.todo-app__list');
const $filtersList = document.querySelector('.todo-app__filters-list');
const filterItemSelected = 'todo-app__filters-item_selected';
const $filterAll = $filtersList.querySelector('.todo-app__filters-item_all');
const $filterActive = $filtersList.querySelector('.todo-app__filters-item_active');
const $filterComplete = $filtersList.querySelector('.todo-app__filters-item_complete');
const $clearCompletedButton = document.querySelector('.todo-app__clear-completed');

const todoApp = new TodoApp(document.querySelector('.todo-app'));

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
});

$toggleAll.addEventListener('click', () => {
    todoApp.toggleAllItems();
})

$todoList.addEventListener('change', (e) => {
    const $listItem = e.target.parentNode;
    if (e.target.classList.contains('todo-app__list-checkbox')) {
        todoApp.updateTodoStatus($listItem);
    }
});

$todoList.addEventListener('click', (e) => {
    const $listItem = e.target.parentNode;
    if (e.target.classList.contains('todo-app__item-destroy')) {
        todoApp.deleteTodoItem($listItem);
    }
});

$clearCompletedButton.addEventListener('click', () => {
    todoApp.clearCompleted();
})

$filterAll.addEventListener('click', (e) => {
    todoApp.showAllItems();
    if (!e.currentTarget.classList.contains(filterItemSelected)) {
        e.currentTarget.classList.add(filterItemSelected);
        $filterActive.classList.remove(filterItemSelected);
        $filterComplete.classList.remove(filterItemSelected);
    }
});

$filterActive.addEventListener('click', (e) => {
    todoApp.showActiveItems();
    if (!e.currentTarget.classList.contains(filterItemSelected)) {
        e.currentTarget.classList.add(filterItemSelected);
        $filterAll.classList.remove(filterItemSelected);
        $filterComplete.classList.remove(filterItemSelected);
    }
});

$filterComplete.addEventListener('click', (e) => {
    todoApp.showCompleteItems();
    if (!e.currentTarget.classList.contains(filterItemSelected)) {
        e.currentTarget.classList.add(filterItemSelected);
        $filterActive.classList.remove(filterItemSelected);
        $filterAll.classList.remove(filterItemSelected);
    }
});