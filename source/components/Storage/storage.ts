export default class Storage {
    data: any;

    constructor() {
        this.data = localStorage.getItem(this.data) ? JSON.parse(localStorage.getItem(this.data) as any) : [];
    }

    insertToStorage(data: any) {
        localStorage.setItem(data.id, JSON.stringify(data));
    }

    getFromStorage() {
        return this.data;
    }
}