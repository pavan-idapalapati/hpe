import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() { }

    setItemInLocalStorage(key, item, isObject) {
        // Put the item into storage
        if (isObject) {
            localStorage.setItem(key, JSON.stringify(item));
            return;
        }
        localStorage.setItem(key, item);
    }

    getItemFromLocalStorage(key, isObject) {
        // Retrieve the item from storage
        if (isObject) {
            return JSON.parse(localStorage.getItem(key));
        }
        return localStorage.getItem(key);
    }

    clearStorage() {
        localStorage.clear();
    }

    scrolltoTop() {
        setTimeout(() => {
            document.getElementsByTagName('app-root')[0].scrollTo({
                top: 0
              });
        })
    }

}
