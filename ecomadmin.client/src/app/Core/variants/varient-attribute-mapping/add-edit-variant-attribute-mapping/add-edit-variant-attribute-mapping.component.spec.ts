import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVariantAttributeMappingComponent } from './add-edit-variant-attribute-mapping.component';

describe('AddEditVariantAttributeMappingComponent', () => {
  let component: AddEditVariantAttributeMappingComponent;
  let fixture: ComponentFixture<AddEditVariantAttributeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditVariantAttributeMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditVariantAttributeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
