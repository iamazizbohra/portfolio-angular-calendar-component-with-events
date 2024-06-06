import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { CalendarEvent } from '../../types/calendar-event.type';
import { InitService } from '../../services/init/init.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent {

  public addEventForm: FormGroup;

  public timeList: string[];

  constructor(
    private initService: InitService,
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { timeList: string[], event: CalendarEvent },
  ) {
    this.timeList = this.initService.getTimeList();

    this.addEventForm = new FormGroup({
      title: new FormControl(data.event.title),
      date: new FormControl(data.event.date),
      time: new FormControl(data.event.time)
    });
  }

  public onSubmitHandler(): void {
    if (this.addEventForm.valid) {
      this.dialogRef.close({
        'role': 'update',
        old: this.data.event,
        new: {
          title: this.addEventForm.value.title,
          date: this.addEventForm.value.date,
          year: this.addEventForm.value.date.getFullYear(),
          month: this.addEventForm.value.date.getMonth(),
          day: this.addEventForm.value.date.getDate(),
          time: this.addEventForm.value.time,
        }
      });
    }
  }

  public onDeleteHandler(): void {
    if (confirm("Press confirm to delete this event")) {
      this.dialogRef.close({
        'role': 'delete',
        old: this.data.event,
        new: {}
      });
    }
  }

}
