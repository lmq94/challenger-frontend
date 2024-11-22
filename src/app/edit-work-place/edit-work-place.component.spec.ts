import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkPlaceComponent } from './edit-work-place.component';

describe('EditWorkPlaceComponent', () => {
  let component: EditWorkPlaceComponent;
  let fixture: ComponentFixture<EditWorkPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
