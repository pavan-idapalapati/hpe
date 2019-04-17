import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'HPE-callguide-WS2008EOL';
    openAccordionIndex;
    accordionData =[1,2]


  onTabOpen(event)  {
    this.openAccordionIndex = event.index;
  }
  onTabClose(event) {
      this.openAccordionIndex = undefined;
  }
}
