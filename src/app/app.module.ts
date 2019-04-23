import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';
import { AccordionComponent } from './utilities/accordion/accordion.component';
import { FormComponent } from './components/form/form.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { LandingComponent } from './components/landing/landing.component';
import { QuestionnaireNavComponent } from './components/questionnaire-nav/questionnaire-nav.component';
import { RightAccordianComponent } from './utilities/right-accordian/right-accordian.component';
import { BackendService } from './backend.service';
import { AssetsPipe } from './pipe/assets.pipe';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'questionaire', component: FormComponent },
  { path: 'conclusion', component: ConclusionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    FormComponent,
    ConclusionComponent,
    LandingComponent,
    QuestionnaireNavComponent,
    RightAccordianComponent,
    AssetsPipe
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
     FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
