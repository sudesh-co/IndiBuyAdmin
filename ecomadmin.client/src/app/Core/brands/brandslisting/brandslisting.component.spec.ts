import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandslistingComponent } from './brandslisting.component';

describe('BrandslistingComponent', () => {
  let component: BrandslistingComponent;
  let fixture: ComponentFixture<BrandslistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandslistingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandslistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
