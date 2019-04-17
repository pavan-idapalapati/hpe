import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { LandingComponent } from './components/landing/landing.component';
import { QuestionnaireNavComponent } from './components/questionnaire-nav/questionnaire-nav.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'questionaire', component: FormComponent },
  { path: 'conclusion', component: ConclusionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ConclusionComponent,
    LandingComponent,
    QuestionnaireNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
