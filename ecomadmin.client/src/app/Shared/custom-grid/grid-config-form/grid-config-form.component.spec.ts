import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridConfigFormComponent } from './grid-config-form.component';

describe('GridConfigFormComponent', () => {
  let component: GridConfigFormComponent;
  let fixture: ComponentFixture<GridConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
