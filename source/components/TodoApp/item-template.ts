export default class ItemTemplate {
    listItem(items: any[]) {
        let html: string[] = [];
        items.map((item) => {
            html.push(`<li data-id="${item.id}" class="todo-app__list-item">
                <input class="todo-app__list-checkbox" type="checkbox" ${item.completed === true ? 'checked' : ''}>
                <label class="todo-app__list-checkbox-label ${item.completed === true ? ' todo-app__list-checkbox-label_completed' : ''}" >
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