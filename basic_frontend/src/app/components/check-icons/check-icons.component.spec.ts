import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIconsComponent } from './check-icons.component';

describe('CheckIconsComponent', () => {
  let component: CheckIconsComponent;
  let fixture: ComponentFixture<CheckIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
