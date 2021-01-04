import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGeneralesComponent } from './usuarios-generales.component';

describe('UsuariosGeneralesComponent', () => {
  let component: UsuariosGeneralesComponent;
  let fixture: ComponentFixture<UsuariosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
