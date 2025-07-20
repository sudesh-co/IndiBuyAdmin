import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeValueAddEditComponent } from './attribute-value-add-edit.component';

describe('AttributeValueAddEditComponent', () => {
  let component: AttributeValueAddEditComponent;
  let fixture: ComponentFixture<AttributeValueAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttributeValueAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeValueAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
