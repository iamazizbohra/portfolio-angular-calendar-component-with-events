import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCellsComponent } from './calendar-cells.component';

describe('CalendarCellsComponent', () => {
  let component: CalendarCellsComponent;
  let fixture: ComponentFixture<CalendarCellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarCellsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
