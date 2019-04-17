import { Component, OnInit, ViewChild } from '@angular/core';
import { FormDataService } from './services/form-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    openSideNavFlag;
    @ViewChild('rightNavAccordion') rightNavAccordion: any;

    constructor(private router: Router, private formData: FormDataService) { }

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

    openSideNav() {
        this.openSideNavFlag = true;
        this.rightNavAccordion.nativeElement.classList
        .remove('remove-right-nav-accordion-transition')
        this.rightNavAccordion.nativeElement.classList
        .add('right-nav-accordion-transition');

    }
    closeSideNav() {
        this.openSideNavFlag = false;
        this.rightNavAccordion.nativeElement.classList.remove('right-nav-accordion-transition')
        this.rightNavAccordion.nativeElement.classList.add('remove-right-nav-accordion-transition');

    }

}
