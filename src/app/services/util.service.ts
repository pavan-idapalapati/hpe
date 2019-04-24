import { Injectable } from '@angular/core';


declare let gtag: Function;

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
            document.getElementsByTagName('html')[0].scrollTop = 0;
        })
    }

    clearCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    setSessionInCookies() {
        var now = new Date();
        var time = now.getTime();
        time += (1800 * 1000);
        now.setTime(time);
        document.cookie = `HPEstatus=active;expires=${now.toUTCString()}`;
    }

    getSessionStatusFromCookies() {
        let HPECookie = document.cookie.split(";")
        let status = HPECookie.find((ck) => { return ck.indexOf("HPEstatus") > -1 });
        return status ? true : false;
    }


    //page view triggering to google analytics.
    sendPageView(page) {
        var gaPrefix = 'edge.spiceworksstatic.com/service.labs/HPE/callguide/295984/en/sw/';
        gtag('config', 'UA-314222-5', {
            'page_location': gaPrefix + page,
            'non_interaction': true
        });
    }

    //Event triggering for google analytics
    sendEvent(action, label,event) {
        gtag('event', action, {
            'event_category': 'Vendor Interactive',
            'event_label': label + '295984',
            'non_interaction': false        
        });
    }

}
