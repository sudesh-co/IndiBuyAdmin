import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldConfigFormComponent } from './field-config-form.component';

describe('FieldConfigFormComponent', () => {
  let component: FieldConfigFormComponent;
  let fixture: ComponentFixture<FieldConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
