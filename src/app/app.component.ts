import { Component, OnInit, ViewChild } from '@angular/core';
import { FormDataService } from './services/form-data.service';

import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isLandingPage:boolean = true;

    constructor(private router: Router, private formData: FormDataService) { 
        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
               if(event.url == '/'){
                 this.isLandingPage = false;
               }
               else{
                this.isLandingPage = true;
               }
            }
            
          });
    }

    ngOnInit() {        
        this.init();
    }

    init() {
        var formData = this.formData.getFormData();
        if (!formData || !formData.currentPage || !formData.data) {
            this.router.navigate(['/']);
        } else if (formData && formData.currentPage && formData.data && formData.currentPage < formData.data.data.length) {
            this.router.navigate(['/questionaire']);
        } else {
            this.router.navigate(['/conclusion']);
        }
    }



}
