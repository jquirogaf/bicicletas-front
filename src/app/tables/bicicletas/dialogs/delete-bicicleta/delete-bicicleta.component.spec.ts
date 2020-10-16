import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBicicletaComponent } from './delete-bicicleta.component';

describe('DeleteBicicletaComponent', () => {
  let component: DeleteBicicletaComponent;
  let fixture: ComponentFixture<DeleteBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
