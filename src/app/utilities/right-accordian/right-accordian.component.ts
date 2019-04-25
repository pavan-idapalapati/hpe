import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { isArray } from 'util';

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
    showAll: boolean = false;
    currentPage;
    index;
    constructor() {

    }

    ngOnInit() {

    }

    /***
     * will open the accordion tab based on uid's.
     */
    openAccordion(option) {

        let accordionIndexes = [];
        //check option.uid is aan array or not if it is not an array, converting to array.
        if (!isArray(option.uid)) {
            option.uid = [option.uid];
        }
        //  if uid's more then one or showAllaccordions flag is true. then setting accordion property to open multiple accordions. 
        this.accordion.multiple = option.showallAccordions || option.uid.length > 1;
        if (option.isSelected == undefined || option.isSelected == true) {
            this.accordionElements && this.accordionElements.map((ae, index) => {
                if (!option.uid.includes(ae.header)) {
                    ae.selected = false;
                } 
                if(option.uid.includes(ae.header) || option.showallAccordions) {
                    accordionIndexes.push(index);
                }
            });
            this.accordion.activeIndex = this.accordion.multiple ? accordionIndexes : accordionIndexes[0];
        }
    }

}
