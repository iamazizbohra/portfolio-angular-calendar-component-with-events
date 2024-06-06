import { Injectable } from '@angular/core';
import { CalendarModule } from '../../calendar.module';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../../types/calendar-event.type';
import { DateService } from '../date/date.service';

@Injectable({
  providedIn: CalendarModule
})
export class DataService {

  private eventsSubject = new BehaviorSubject<CalendarEvent[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private dateService: DateService) {

  }

  public getEvents(): { prevDayEvents: CalendarEvent[]; currDayEvents: CalendarEvent[]; nextDayEvents: CalendarEvent[] } {
    const prevDate = this.dateService.getPrevDate();
    const currDate = this.dateService.getSelectedDate();
    const nextDate = this.dateService.getNextDate();

    return {
      prevDayEvents: this.eventsSubject.value.filter((event) => event.year == prevDate.getFullYear() && event.month == prevDate.getMonth() && event.day == prevDate.getDate()),
      currDayEvents: this.eventsSubject.value.filter((event) => event.year == currDate.getFullYear() && event.month == currDate.getMonth() && event.day == currDate.getDate()),
      nextDayEvents: this.eventsSubject.value.filter((event) => event.year == nextDate.getFullYear() && event.month == nextDate.getMonth() && event.day == nextDate.getDate()),
    };
  }

  public addEvent(title: string, date: Date, time: string): boolean {
    const events = this.eventsSubject.value;

    const event = events.filter((event) => event.year == date.getFullYear() && event.month == date.getMonth() && event.day == date.getDate() && event.time == time);
    if (event.length == 0) {
      events.push({
        title: title,
        date: date,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        time: time,
      });

      this.eventsSubject.next(events);

      return true;
    }

    return false;
  }

  public updateEvent(oldEvent: CalendarEvent, newEvent: CalendarEvent): void {
    const events = this.eventsSubject.value;
    const event = events.filter((event) => event.year == oldEvent.year && event.month == oldEvent.month && event.day == oldEvent.day && event.time == oldEvent.time);
    const index = events.indexOf(event[0]);
    events[index] = newEvent;

    this.eventsSubject.next(events);
  }

  public deleteEvent(e: CalendarEvent): void {
    const events = this.eventsSubject.value;
    const event = events.filter((event) => event.year == e.year && event.month == e.month && event.day == e.day && event.time == e.time);
    const index = events.indexOf(event[0]);
    events.splice(index, 1);

    this.eventsSubject.next(events);
  }

  public transferEvent(containerId: string, e: CalendarEvent): void {
    const events = this.eventsSubject.value;
    const event = events.filter((event) => event.year == e.year && event.month == e.month && event.day == e.day && event.time == e.time);
    const index = events.indexOf(event[0]);
    events.splice(index, 1);

    if (containerId == '1') {
      events.push({
        title: e.title,
        date: this.dateService.getPrevDate(),
        year: this.dateService.getPrevDate().getFullYear(),
        month: this.dateService.getPrevDate().getMonth(),
        day: this.dateService.getPrevDate().getDate(),
        time: e.time,
      });
    } else if (containerId == '2') {
      events.push({
        title: e.title,
        date: this.dateService.getSelectedDate(),
        year: this.dateService.getSelectedDate().getFullYear(),
        month: this.dateService.getSelectedDate().getMonth(),
        day: this.dateService.getSelectedDate().getDate(),
        time: e.time,
      });
    } else if (containerId == '3') {
      events.push({
        title: e.title,
        date: this.dateService.getNextDate(),
        year: this.dateService.getNextDate().getFullYear(),
        month: this.dateService.getNextDate().getMonth(),
        day: this.dateService.getNextDate().getDate(),
        time: e.time,
      });
    }

    this.eventsSubject.next(events);
  }

}
