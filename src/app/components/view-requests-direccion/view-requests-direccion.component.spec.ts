import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestsDireccionComponent } from './view-requests-direccion.component';

describe('ViewRequestsDireccionComponent', () => {
  let component: ViewRequestsDireccionComponent;
  let fixture: ComponentFixture<ViewRequestsDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRequestsDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequestsDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
