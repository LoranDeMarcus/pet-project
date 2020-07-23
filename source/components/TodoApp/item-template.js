export default class ItemTemplate {
    listItem(items) {
        let html = [];
        items.map((item) => {
            html.push(`<li data-id="${item.id}" class="todo-app__list-item">
                <input type="checkbox" ${item.completed === true ? 'checked' : ''} class="todo-app__list-checkbox"> <!-- FIXME: в чекбоксе вствавить статус checked/unchecked -->
                <label class="todo-app__list-checkbox-label">
                    ${item.title}
                </label>
                <button class="todo-app__item-destroy"></button>
            </li>`);
        });
        
        return html.join("\r\n");
    }
}

/* TODO: 1. Хранилище/данные/представление
         2. Когда нет доступа к серверу чтобы автоматом лез в локалсторедж
         3. Progressive web application
         4. Dictionary JS - localStorage сериализация
 */