import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
    openAccordionIndex;
    accordionData = [1, 2]

    constructor() { }

    ngOnInit() {
    }
    onTabOpen(event) {
        this.openAccordionIndex = event.index;
    }
    onTabClose(event) {
        this.openAccordionIndex = undefined;
    }



}
