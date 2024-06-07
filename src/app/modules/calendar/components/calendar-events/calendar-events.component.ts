import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventListType } from '../../types/event-list.type';
import { DateService } from '../../services/date/date.service';
import { DataService } from '../../services/data/data.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { CalendarEvent } from '../../types/calendar-event.type';
import { delay } from 'rxjs';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrl: './calendar-events.component.scss'
})
export class CalendarEventsComponent {
  
  private prevDate: Date | undefined;
  private currDate: Date | undefined;
  private nextDate: Date | undefined;
  public eventList: EventListType = {
    prevDayEvents: [],
    currDayEvents: [],
    nextDayEvents: [],
  };

  constructor(
    private dateService: DateService,
    private dataService: DataService,
    private dialogService: DialogService
  ) {
    this.dateService.selectedDate$
      .pipe(delay(1))
      .subscribe(() => {
        this.prevDate = this.dateService.getPrevDate();
        this.currDate = this.dateService.getSelectedDate();
        this.nextDate = this.dateService.getNextDate();

        this.eventList = this.dataService.getEvents();
      });

      this.dataService.events$.pipe(delay(1)).subscribe(() => {
        this.eventList = this.dataService.getEvents();
      })
  }

  presentEditEventDialog(e: CalendarEvent): void {
    this.dialogService.presentEditEventDialog(e);
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

      const containerId = e.container.id.charAt(e.container.id.length - 1);
      const event = e.item.data;

      this.dataService.transferEvent(containerId, event);
    }
  }

  public eventPrevDate(): Date | undefined {
    return this.prevDate;
  }

  public eventCurrDate(): Date | undefined {
    return this.currDate;
  }
  
  public eventNextDate(): Date | undefined {
    return this.nextDate;
  }
}
