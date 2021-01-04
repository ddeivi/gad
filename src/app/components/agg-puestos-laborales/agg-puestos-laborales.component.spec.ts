import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggPuestosLaboralesComponent } from './agg-puestos-laborales.component';

describe('AggPuestosLaboralesComponent', () => {
  let component: AggPuestosLaboralesComponent;
  let fixture: ComponentFixture<AggPuestosLaboralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggPuestosLaboralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggPuestosLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
