import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InitService } from '../../services/init/init.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

  public addEventForm: FormGroup;

  public timeList: string[];

  constructor(
    private initService: InitService,
    public dialogRef: MatDialogRef<AddEventComponent>,
  ) {
    this.timeList = this.initService.getTimeList();

    this.addEventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      date: new FormControl('', [
        Validators.required,
      ]),
      time: new FormControl('', [
        Validators.required,
      ])
    });
  }

  public onSubmit(): void {
    if (this.addEventForm.valid) {
      this.dialogRef.close({
        role: 'add',
        data: this.addEventForm.value
      });
    }
  }
}
