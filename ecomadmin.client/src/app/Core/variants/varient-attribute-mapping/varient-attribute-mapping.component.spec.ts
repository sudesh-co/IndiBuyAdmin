import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarientAttributeMappingComponent } from './varient-attribute-mapping.component';

describe('VarientAttributeMappingComponent', () => {
  let component: VarientAttributeMappingComponent;
  let fixture: ComponentFixture<VarientAttributeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarientAttributeMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarientAttributeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
