import { Component, EventEmitter, Output } from '@angular/core';
import { DateService } from '../../services/date/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  @Output() onDateSelect = new EventEmitter<Date>();

  constructor(
    private dateService: DateService,
  ) {
    this.dateService.selectedDate$.subscribe((date: Date) => {
      this.onDateSelect.emit(date);
    });
  }

}
