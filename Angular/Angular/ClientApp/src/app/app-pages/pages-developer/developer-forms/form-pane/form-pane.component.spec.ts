import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaneComponent } from './form-pane.component';

describe('FormPaneComponent', () => {
  let component: FormPaneComponent;
  let fixture: ComponentFixture<FormPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
