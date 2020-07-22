import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '@components/TodoApp';

const todoList = document.querySelector('.todo-app__list');

const todoApp = new TodoApp(document.querySelector('.todo-app'));

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
    todoApp.updateTodoStatus();
});

todoList.addEventListener('change', (e) => {
    const listItem = e.target.parentNode;
    todoApp.updateTodoStatus(listItem);
});

todoList.addEventListener('click', (e) => {
    const buttonDestroy = e.target.querySelector('.todo-app__item-destroy');
    console.log(buttonDestroy);
});