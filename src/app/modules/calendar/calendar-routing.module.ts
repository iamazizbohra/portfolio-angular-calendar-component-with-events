import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasePageComponent } from './page/showcase-page/showcase-page.component';
import { CalendarLayoutComponent } from './layouts/calendar-layout/calendar-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: CalendarLayoutComponent,
    children: [
      {
        path: '',
        component: ShowcasePageComponent, // This child component will render in users router-outlet
      },
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
