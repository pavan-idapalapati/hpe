import { Component, OnInit, HostListener, } from '@angular/core';
import { FormDataService } from './services/form-data.service';

import { Router, NavigationStart, NavigationExtras } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isLandingPage: boolean = true;

    constructor(private router: Router, private formData: FormDataService, private utils: UtilService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url = event.url.substring(0, (event.url.indexOf("?") > -1 ? event.url.indexOf("?") : event.url.length - 1)).trim();
                if (url == '/' || url == '') {
                    this.isLandingPage = false;
                }
                else {
                    this.isLandingPage = true;
                }
            }
        });
    }

    ngOnInit() {
        this.init();
    }

    init() {
        let hasSession = this.utils.getSessionStatusFromCookies();
        if (hasSession) {
            var formData = this.formData.getFormData();
            if (!formData || !formData.currentPage || !formData.data) {
                let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "new": true
                    }
                };
                this.router.navigate(['/'], navigationExtras);
            } else {
                this.router.navigate(['/']);
            }
        } else {
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "new": true
                }
            };
            this.router.navigate(['/'], navigationExtras);
        }
    }


    @HostListener('window:scroll', ['$event']) private onScroll($event: any): void {
        let leftSideNav = document.getElementById('left-side-section');
        if(leftSideNav) {
            let top;
            if(window.pageYOffset <= 100) {
                 top = 100-window.pageYOffset
            } else if (window.pageYOffset > 100) {
                top = 0;
            }
            leftSideNav.style.top = `${top}px`;
        }
    };

}
