import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHomeCarouselItemsComponent } from './add-edit-home-carousel-items.component';

describe('AddEditHomeCarouselItemsComponent', () => {
  let component: AddEditHomeCarouselItemsComponent;
  let fixture: ComponentFixture<AddEditHomeCarouselItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditHomeCarouselItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHomeCarouselItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
