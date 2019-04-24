import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-right-accordian',
    templateUrl: './right-accordian.component.html',
    styleUrls: ['./right-accordian.component.scss']
})
export class RightAccordianComponent implements OnInit {
    @Input() metaData;
    @ViewChildren('accordionElements') accordionElements: QueryList<any>;
    @ViewChild('accordion') accordion: any;
    openAccordionIndex;
    currentPage;
    index;
    constructor(private formData: FormDataService, private router: Router) {

    }

    ngOnInit() {

    }

    onTabOpen(event) {
        this.openAccordionIndex = event.index;
    }
    onTabClose(event) {
        this.openAccordionIndex = undefined;
    }

    openAccordion(option) {
        let selectedIndex;
        if (option.isSelected == undefined || option.isSelected == true) {
            this.accordionElements && this.accordionElements.map((ae, index) => {
                if (option.uid == ae.header) {
                    selectedIndex = index;
                    this.index = index;
                } else {
                    ae.selected = false;
                }
            });
            this.openAccordionIndex = selectedIndex;
        }
    }

}
