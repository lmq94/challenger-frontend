import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWorkPlaceComponent } from './insert-work-place.component';

describe('InsertWorkPlaceComponent', () => {
  let component: InsertWorkPlaceComponent;
  let fixture: ComponentFixture<InsertWorkPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertWorkPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertWorkPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
