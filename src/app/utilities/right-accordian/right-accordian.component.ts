import { Component, OnInit,Input } from '@angular/core';
import { FormDataService } from 'src/app/services/form-data.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AnimationMetadataType } from '@angular/animations';

@Component({
  selector: 'app-right-accordian',
  templateUrl: './right-accordian.component.html',
  styleUrls: ['./right-accordian.component.scss']
})
export class RightAccordianComponent implements OnInit {
  @Input() metaData;
  openAccordionIndex; 
  currentPage;
  constructor(private formData: FormDataService, private router: Router) {
    // this.formData.getQuestionChangeSubject().subscribe((data) =>{
    //   this.onInitOfComponent();
    // })
  }


  ngOnInit() {
    // this.onInitOfComponent();
  }


  onInitOfComponent() {
    // let metaData = this.formData.getFormData();
    // if(metaData && metaData.data && metaData.currentPage) {
    //     this.metaData = metaData.data.data;
    //     this.currentPage = metaData.currentPage;
    //     // console.log(this.currentPage);        
    //     this.metaData = this.metaData[this.currentPage];
    // }
}

 
  onTabOpen(event) {
    this.openAccordionIndex = event.index;
  }
  onTabClose(event) {
    this.openAccordionIndex = undefined;
  }

}
