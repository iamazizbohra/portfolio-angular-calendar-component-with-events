import { Injectable } from '@angular/core';
import { CalendarModule } from '../../calendar.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: CalendarModule
})
export class DateService {

  private selectedDateSubject = new BehaviorSubject<Date>(new Date());
  public selectedDate$ = this.selectedDateSubject.asObservable();

  private selectedYearSubject = new BehaviorSubject<number>(new Date().getFullYear());
  public selectedYear$ = this.selectedYearSubject.asObservable();

  private selectedMonthSubject = new BehaviorSubject<number>(new Date().getMonth());
  public selectedMonth$ = this.selectedMonthSubject.asObservable();

  private prevDate: Date = new Date();
  private currDate: Date = new Date();
  private nextDate: Date = new Date();

  constructor() {
    this.setPrevNextDate();
  }

  public setSelectedDate(date: Date): void {
    this.selectedDateSubject.next(date);

    this.setPrevNextDate();
  }

  private setPrevNextDate(): void {
    const prevDate = new Date(this.selectedDateSubject.value.getTime());
    this.prevDate = new Date(prevDate.setDate(prevDate.getDate() - 1));

    const nextDate = new Date(this.selectedDateSubject.value.getTime());
    this.nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
  }

  public getPrevDate(): Date {
    return this.prevDate;
  }

  public getNextDate(): Date {
    return this.nextDate;
  }

  public setSelectedYear(value: number): void {
    this.selectedYearSubject.next(value);
  }

  public getSelectedYear(): number {
    return this.selectedYearSubject.value;
  }

  public setSelectedMonth(value: number): void {
    this.selectedMonthSubject.next(value);
  }

  public getSelectedMonth(): number {
    return this.selectedMonthSubject.value;
  }

  public setMonthToPrevMonth(): void {
    if (this.selectedMonthSubject.value == 0) {
      this.selectedMonthSubject.next(11);
      this.selectedYearSubject.next(this.selectedYearSubject.value - 1);
    } else {
      this.selectedMonthSubject.next(this.selectedMonthSubject.value - 1);
    }
  }

  public setMonthToNextMonth(): void {
    if (this.selectedMonthSubject.value == 11) {
      this.selectedMonthSubject.next(0);
      this.selectedYearSubject.next(this.selectedYearSubject.value + 1);
    } else {
      this.selectedMonthSubject.next(this.selectedMonthSubject.value + 1);
    }
  }

  public getSelectedDate(): Date {
    return new Date(this.selectedDateSubject.value.getTime());
  }

  public getCurrDate(): Date {
    return this.currDate;
  }

}
