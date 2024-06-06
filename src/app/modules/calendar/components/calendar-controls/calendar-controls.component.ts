import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { InitService } from '../../services/init/init.service';
import { DateService } from '../../services/date/date.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-calendar-controls',
  templateUrl: './calendar-controls.component.html',
  styleUrl: './calendar-controls.component.scss'
})
export class CalendarControlsComponent {

  public selectedYear: number;
  public selectedMonth: number;
  public yearList: number[] = [];
  public monthList: string[] = []

  constructor(
    private initService: InitService,
    private dateService: DateService,
    private dialogService: DialogService
  ) {
    this.selectedYear = this.dateService.getSelectedYear();
    this.selectedMonth = this.dateService.getSelectedMonth();
    this.yearList = this.initService.getYearList(4, 11);
    this.monthList = this.initService.getMonthList();

    this.dateService.selectedYear$.subscribe((year: number) => {
      this.selectedYear = year;
    });

    this.dateService.selectedMonth$.subscribe((month: number) => {
      this.selectedMonth = month;
    });
  }

  presentAddEventDialog(): void {
    this.dialogService.presentAddEventDialog();
  }

  public onYearChange(e: MatSelectChange): void {
    this.dateService.setSelectedYear(e.value);
  }

  public onMonthChange(e: MatSelectChange): void {
    this.dateService.setSelectedMonth(e.value);
  }

  public prevMonthHandler(): void {
    this.dateService.setMonthToPrevMonth();
  }

  public nextMonthHandler(): void {
    this.dateService.setMonthToNextMonth();
  }

}
