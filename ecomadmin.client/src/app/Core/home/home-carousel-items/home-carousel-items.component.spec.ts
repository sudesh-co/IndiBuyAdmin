import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselItemsComponent } from './home-carousel-items.component';

describe('HomeCarouselItemsComponent', () => {
  let component: HomeCarouselItemsComponent;
  let fixture: ComponentFixture<HomeCarouselItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCarouselItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarouselItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
