import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddEventComponent } from './dialogs/add-event/add-event.component';
import { EditEventComponent } from './dialogs/edit-event/edit-event.component';
import { ShowcasePageComponent } from './page/showcase-page/showcase-page.component';
import { InitService } from './services/init/init.service';
import { DataService } from './services/data/data.service';
import { DialogService } from './services/dialog/dialog.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DateService } from './services/date/date.service';
import { CalendarCellsComponent } from './components/calendar-cells/calendar-cells.component';
import { CalendarControlsComponent } from './components/calendar-controls/calendar-controls.component';
import { CalendarEventsComponent } from './components/calendar-events/calendar-events.component';

@NgModule({
  declarations: [
    CalendarComponent,
    AddEventComponent,
    EditEventComponent,
    ShowcasePageComponent,
    CalendarCellsComponent,
    CalendarControlsComponent,
    CalendarEventsComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  providers: [
    InitService,
    DataService,
    DateService,
    DialogService,
    provideNativeDateAdapter()
  ],
  exports: [
    
  ],
})
export class CalendarModule { }
