import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '@components/TodoApp';

const todoApp = new TodoApp(document.querySelector('.todo-app'));

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
    todoApp.updateTodoStatus();
});

document.querySelector('.todo-app__list').addEventListener('click', function(e) {
    const li = e.target.classList.contains('todo-app__list-item');
    console.log(li);
    todoApp.updateTodoStatus(li);
});