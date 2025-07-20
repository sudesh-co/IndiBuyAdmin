import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientsComponent } from './product-varients.component';

describe('ProductVarientsComponent', () => {
  let component: ProductVarientsComponent;
  let fixture: ComponentFixture<ProductVarientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductVarientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVarientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
