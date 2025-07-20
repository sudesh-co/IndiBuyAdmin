import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCkeckComponent } from './custom-ckeck.component';

describe('CustomCkeckComponent', () => {
  let component: CustomCkeckComponent;
  let fixture: ComponentFixture<CustomCkeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCkeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCkeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
