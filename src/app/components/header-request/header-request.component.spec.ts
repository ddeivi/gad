import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRequestComponent } from './header-request.component';

describe('HeaderRequestComponent', () => {
  let component: HeaderRequestComponent;
  let fixture: ComponentFixture<HeaderRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
