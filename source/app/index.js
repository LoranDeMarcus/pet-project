import '../components/base.scss'
import '../components/TodoApp';

import { TodoApp } from '@components/TodoApp';

const todoApp = new TodoApp();

document.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const todoText = document.querySelector('.todo-app__input').value.trim();
        return !todoText.length ? false : todoApp.addToArray(todoText);
    }
    
});

