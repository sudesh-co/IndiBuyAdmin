import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeAddEditComponent } from './attribute-add-edit.component';

describe('AttributeAddEditComponent', () => {
  let component: AttributeAddEditComponent;
  let fixture: ComponentFixture<AttributeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
