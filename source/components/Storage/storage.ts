export default class Storage {
    data: any;
    liveData: any;
    getLocalStorage: () => Array<any>;
    setLocalStorage: (items: any) => void;
    emptyItemQuery: object | undefined;

    constructor(name: any, callback: any) {
        const localStorage = window.localStorage;

        this.getLocalStorage = () => {
            return this.liveData || JSON.parse(localStorage.getItem(name) || '[]');
        }

        this.setLocalStorage = (items: any) => {
            localStorage.setItem(name, JSON.stringify(this.liveData = items))
        }

        if (callback) {
            callback();
        }
    }

    find(query: any, callback: any) {
        const items: Array<any> = this.getLocalStorage();

        callback(items.filter(item => {
            for (let j in query) {
                if (query[j] !== item[j]) {
                    return false;
                }
            }
            return this;
        }));
    }

   update(update: any, callback: any) {
        const id = update.id;
        const items: Array<any> = this.getLocalStorage();
        let i: number = items.length;

        while (i--) {
            if (items[i].id === id) {
                for (let j in update) {
                    items[i][j] = update[j];
                }
                break;
            }
        }

        this.setLocalStorage(items);

        if (callback) {
            callback();
        }
   }

   insert(item: any) {
        const items: Array<any> = this.getLocalStorage();
        items.push(item);
        this.setLocalStorage(items);
   }

   remove(query: any, callback: any) {
        const items: Array<any> = this.getLocalStorage().filter(item => {
            for (let j in query) {
                if (query[j] !== item[j]) {
                    return true;
                }
            }
            return false;
        });

        this.setLocalStorage(items);

        if (callback) {
            callback();
        }
   }

   count(callback: any) {
        this.find(this.emptyItemQuery, (data: string | any[]) => {
            const total: number = Number(data.length);

            let i: number = total;
            let completed: number = 0;

            while (i--) {
                completed += data[i].completed;
            }
            callback(total, total - completed, completed);
        });
   }
}