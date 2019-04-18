import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightAccordianComponent } from './right-accordian.component';

describe('RightAccordianComponent', () => {
  let component: RightAccordianComponent;
  let fixture: ComponentFixture<RightAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
