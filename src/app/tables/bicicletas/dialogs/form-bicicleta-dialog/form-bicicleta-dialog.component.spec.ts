import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBicicletaDialogComponent } from './form-bicicleta-dialog.component';

describe('FormBicicletaDialogComponent', () => {
  let component: FormBicicletaDialogComponent;
  let fixture: ComponentFixture<FormBicicletaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBicicletaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBicicletaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
