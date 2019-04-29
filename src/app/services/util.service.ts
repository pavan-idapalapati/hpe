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
            document.getElementsByTagName('body')[0].scrollTop = 0;
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
        document.cookie = `HPEstatus=active;expires=${this.getCookieExpiresTime()}`;
    }

    getCookieExpiresTime() {
        var now = new Date();
        var time = now.getTime();
        time += (5 * 1000);
        now.setTime(time);
        return now.toUTCString();
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
    sendEvent(action, label, event) {
        gtag('event', action, {
            'event_category': 'Vendor Interactive',
            'event_label': label + '295984',
            'non_interaction': false
        });
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    setUserCookieDataToUserFormData() {

        //getting cookie user information data.
        let cookieUserData = this.getCookie('userInfo');
        cookieUserData = JSON.parse(cookieUserData);
        let userData = this.getItemFromLocalStorage("userInfo", true);
        //setting user cookies data to userForm;
        userData.data.forEach(form => {
            form.formData.forEach(formData => {
                formData.value = cookieUserData[formData.cookieId];
            })
        })
        return userData;
    }

    cloneDeep(data) {
        return JSON.parse(JSON.stringify(data));
    }
    updateCookieExpiryTime() {
        setInterval(() => {
            ['HPEstatus', 'userInfo', 'stackholdersData'].forEach(cookie => {
                let cookieData = this.getCookie(cookie);
                if (cookieData) {
                    document.cookie = `${cookie}=${cookieData}; expires= ${this.getCookieExpiresTime()};`
                }
            })
        }, 60000)
    }

}
