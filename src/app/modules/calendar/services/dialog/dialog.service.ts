import { Injectable } from '@angular/core';
import { CalendarModule } from '../../calendar.module';
import { DataService } from '../data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../../dialogs/add-event/add-event.component';
import { CalendarEvent } from '../../types/calendar-event.type';
import { EditEventComponent } from '../../dialogs/edit-event/edit-event.component';

@Injectable({
  providedIn: CalendarModule
})
export class DialogService {

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  presentAddEventDialog(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      disableClose: true,
      data: {

      },
    });

    dialogRef.afterClosed().subscribe((result: { role: string, data: { title: string, date: Date, time: string } }) => {
      if (result.role && result.role == 'add') {
        if (!this.dataService.addEvent(result.data.title, result.data.date, result.data.time)) {
          alert("Event already exists");
        }
      }
    });
  }

  presentEditEventDialog(e: CalendarEvent): void {
    const dialogRef = this.dialog.open(EditEventComponent, {
      disableClose: true,
      data: {
        event: e
      },
    });

    dialogRef.afterClosed().subscribe((result: { role: string, old: CalendarEvent, new: CalendarEvent }) => {
      if (result.role && result.role == 'update') {
        this.dataService.updateEvent(result.old, result.new);
      } else if (result.role && result.role == 'delete') {
        this.dataService.deleteEvent(result.old);
      }
    });
  }


}
