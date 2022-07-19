import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperFormsComponent } from './developer-forms.component';

describe('DeveloperFormsComponent', () => {
  let component: DeveloperFormsComponent;
  let fixture: ComponentFixture<DeveloperFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
