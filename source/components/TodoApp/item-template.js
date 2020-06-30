export default class ItemTemplate {
    listItem(items) {
        let html = [];
        items.map((item) => {
            html.push(`<li data-id="${item.id}" class="todo-app__list-item">
                <input type="checkbox" class="todo-app__list-checkbox">
                <label class="todo-app__list-checkbox-label">
                    ${item.title}
                </label>
                <button class="todo-app__item-destroy"></button>
            </li>`);
        });
        
        return html.join("\r\n");
    }
}

// TODO: item - объект с ключ: значение

/* TODO: 1. Хранилище/данные/представление
         2. А когда нет доступа к серверу чтобы автоматом лез в локалсторедж
         3. Progressive web application
         4. Dictionary JS - localStorage сериализация
 */