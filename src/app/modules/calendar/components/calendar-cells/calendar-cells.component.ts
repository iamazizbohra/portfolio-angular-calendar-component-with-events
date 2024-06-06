import { Component } from '@angular/core';
import { CalendarCell } from '../../types/calendar-cell.type';
import { InitService } from '../../services/init/init.service';
import { DateService } from '../../services/date/date.service';

@Component({
  selector: 'app-calendar-cells',
  templateUrl: './calendar-cells.component.html',
  styleUrl: './calendar-cells.component.scss'
})
export class CalendarCellsComponent {

  public currentDate: Date;
  public selectedDate: Date;
  public selectedMonth: number;
  public weekList: string[] = [];
  public cellList: CalendarCell[][] = [];

  constructor(
    private initService: InitService,
    private dateService: DateService,
  ) {
    this.currentDate = this.dateService.getCurrDate();
    this.selectedDate = this.dateService.getSelectedDate();
    this.selectedMonth = this.dateService.getSelectedMonth()
    this.weekList = this.initService.getWeekList();

    this.dateService.selectedDate$.subscribe((date: Date) => {
      this.selectedDate = date;

      this.setCellList();
    });

    this.dateService.selectedYear$.subscribe((year: number) => {
      this.setCellList();
    });

    this.dateService.selectedMonth$.subscribe((month: number) => {
      this.selectedMonth = month;

      this.setCellList();
    });
  }

  public dateSelectHandler(e: CalendarCell): void {
    if (e.month == this.dateService.getSelectedMonth()) {
      this.dateService.setSelectedDate(new Date(e.year, e.month, e.day));
    }
  }

  private setCellList(): void {
    this.cellList = this.initService.getCellList();
  }

}
