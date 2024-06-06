import { Component, EventEmitter, Output } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddEventComponent } from '../dialogs/add-event/add-event.component';
import { EditEventComponent } from '../dialogs/edit-event/edit-event.component';
import { CalendarCell } from '../types/calendar-cell.type';
import { CalendarEvent } from '../types/calendar-event.type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  @Output() onDateSelect = new EventEmitter<CalendarCell>();

  public currentDate: Date;
  public selectedDate: Date;
  public selectedYear: number;
  public selectedMonth: number;

  public firstDayOfMonth: Date | undefined;
  public weedDayOfFirstDay: number | undefined;

  public yearList: number[] = [];
  public monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public weekList: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public dayList: CalendarCell[][] = [];
  public timeList: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  public eventPrevDate: Date | undefined;
  public eventNextDate: Date | undefined;
  public events: CalendarEvent[] = [];
  public prevDayEvents: CalendarEvent[] = [];
  public currDayEvents: CalendarEvent[] = [];
  public nextDayEvents: CalendarEvent[] = [];

  constructor(public dialog: MatDialog) {
    const now = new Date();
    this.currentDate = now;
    this.selectedDate = now;
    this.selectedYear = now.getFullYear();
    this.selectedMonth = now.getMonth();

    this.initYearList();
    this.initDayList();
    this.initEvents();
  }

  public initEvents(): void {
    const eventCurrDate = new Date(this.selectedDate?.getTime());
    this.eventPrevDate = new Date(this.selectedDate?.getTime());
    this.eventPrevDate = new Date(this.eventPrevDate!.setDate(this.eventPrevDate!.getDate() - 1));
    this.eventNextDate = new Date(this.selectedDate?.getTime());
    this.eventNextDate = new Date(this.eventNextDate!.setDate(this.eventNextDate!.getDate() + 1));

    this.prevDayEvents = this.events.filter((event) => event.year == this.eventPrevDate!.getFullYear() && event.month == this.eventPrevDate!.getMonth() && event.day == this.eventPrevDate!.getDate());
    this.currDayEvents = this.events.filter((event) => event.year == eventCurrDate!.getFullYear() && event.month == eventCurrDate!.getMonth() && event.day == eventCurrDate!.getDate());
    this.nextDayEvents = this.events.filter((event) => event.year == this.eventNextDate!.getFullYear() && event.month == this.eventNextDate!.getMonth() && event.day == this.eventNextDate!.getDate());
  }
  public initYearList(): void {
    let startYear = this.selectedYear - 5;

    for (let i = 0; i < 11; i++) {
      this.yearList.push(startYear);

      startYear++;
    }
  }

  public initDayList(): void {
    this.dayList = [];

    this.firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth, 1);
    this.weedDayOfFirstDay = this.firstDayOfMonth.getDay();

    for (let row = 0; row < 6; row++) {
      this.dayList.push([]);

      for (let day = 7 * row; day <= 7 * row + 6; day++) {
        if (day === 0 && this.weedDayOfFirstDay === 0) {
          this.firstDayOfMonth.setDate(this.firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
          this.firstDayOfMonth.setDate(this.firstDayOfMonth.getDate() + (day - this.weedDayOfFirstDay));
        } else {
          this.firstDayOfMonth.setDate(this.firstDayOfMonth.getDate() + 1);
        }

        this.dayList[row].push(
          {
            date: new Date(this.firstDayOfMonth),
            year: this.firstDayOfMonth.getFullYear(),
            month: this.firstDayOfMonth.getMonth(),
            day: this.firstDayOfMonth.getDate(),
          }
        );
      }
    }
  }

  public prevMonthHandler(): void {
    if (this.selectedMonth == 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }

    this.initDayList();
  }

  public nextMonthHandler(): void {
    if (this.selectedMonth == 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }

    this.initDayList();
  }

  public dateSelectHandler(e: CalendarCell): void {
    if (e.month == this.selectedMonth) {
      this.selectedDate = new Date(e.year, e.month, e.day);
      this.initEvents();
      this.onDateSelect.emit(e);
    }
  }

  openAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      disableClose: true,
      data: {
        timeList: this.timeList
      },
    });

    dialogRef.afterClosed().subscribe((result: { role: string, data: { title: string, date: Date, time: string } }) => {
      if (result.role && result.role == 'add') {
        const event = this.events.filter((event) => event.year == result.data.date.getFullYear() && event.month == result.data.date.getMonth() && event.day == result.data.date.getDate() && event.time == result.data.time);
        if (event.length == 0) {
          this.events.push({
            title: result.data.title,
            date: result.data.date,
            year: result.data.date.getFullYear(),
            month: result.data.date.getMonth(),
            day: result.data.date.getDate(),
            time: result.data.time,
          });
        } else {
          alert("Event already exists");
        }

        this.initEvents();
      }
    });
  }

  openEditEventDialog(e: CalendarEvent): void {
    const dialogRef = this.dialog.open(EditEventComponent, {
      disableClose: true,
      data: {
        timeList: this.timeList,
        event: e
      },
    });

    dialogRef.afterClosed().subscribe((result: { role: string, old: CalendarEvent, new: CalendarEvent }) => {
      if (result.role && result.role == 'update') {
        const event = this.events.filter((event) => event.year == result.old.year && event.month == result.old.month && event.day == result.old.day && event.time == result.old.time);
        const index = this.events.indexOf(event[0]);
        this.events[index] = result.new;

        this.initEvents();
      } else if (result.role && result.role == 'delete') {
        const event = this.events.filter((event) => event.year == result.old.year && event.month == result.old.month && event.day == result.old.day && event.time == result.old.time);
        const index = this.events.indexOf(event[0]);
        this.events.splice(index, 1);

        this.initEvents();
      }
    });
  }

  public onYearChange(e: MatSelectChange): void {
    this.selectedYear = e.value;

    this.initDayList();
  }

  public onMonthChange(e: MatSelectChange): void {
    this.selectedMonth = e.value

    this.initDayList();
  }

  onDropHandler(e: CdkDragDrop<CalendarEvent[]>) {
    if (e.previousContainer === e.container) {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
    } else {
      transferArrayItem(
        e.previousContainer.data,
        e.container.data,
        e.previousIndex,
        e.currentIndex,
      );

      this.transferEvent(e);
    }
  }

  private transferEvent(e: CdkDragDrop<CalendarEvent[]>): void {
    const containerId = e.container.id.charAt(e.container.id.length - 1);
    const currEvent = e.item.data;

    const event = this.events.filter((event) => event.year == currEvent.year && event.month == currEvent.month && event.day == currEvent.day && event.time == currEvent.time);
    const index = this.events.indexOf(event[0]);
    this.events.splice(index, 1);

    if (containerId == '1') {
      this.events.push({
        title: currEvent.title,
        date: this.eventPrevDate!,
        year: this.eventPrevDate!.getFullYear(),
        month: this.eventPrevDate!.getMonth(),
        day: this.eventPrevDate!.getDate(),
        time: currEvent.time,
      });
    } else if (containerId == '2') {
      this.events.push({
        title: currEvent.title,
        date: this.selectedDate!,
        year: this.selectedDate!.getFullYear(),
        month: this.selectedDate!.getMonth(),
        day: this.selectedDate!.getDate(),
        time: currEvent.time,
      });
    } else if (containerId == '3') {
      this.events.push({
        title: currEvent.title,
        date: this.eventNextDate!,
        year: this.eventNextDate!.getFullYear(),
        month: this.eventNextDate!.getMonth(),
        day: this.eventNextDate!.getDate(),
        time: currEvent.time,
      });
    }

    this.initEvents();
  }
}
