import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '@components/TodoApp';

const $todoList = document.querySelector('.todo-app__list');
const $clearCompletedButton = document.querySelector('.todo-app__clear-completed');

const todoApp = new TodoApp(document.querySelector('.todo-app'));

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
});

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
    console.log(todoApp.clearCompleted());
    todoApp.clearCompleted();
})