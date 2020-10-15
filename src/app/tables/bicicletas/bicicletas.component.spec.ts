import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletasComponent } from './bicicletas.component';

describe('BicicletasComponent', () => {
  let component: BicicletasComponent;
  let fixture: ComponentFixture<BicicletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicicletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicicletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
