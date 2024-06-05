import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  public addEventForm: FormGroup;

  public timeList: string[];

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {timeList: string[]},
  ) {
    this.timeList = data.timeList;

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
        data: {
          ...this.data,
          ...this.addEventForm.value
        }
      });
    }
  }
}
