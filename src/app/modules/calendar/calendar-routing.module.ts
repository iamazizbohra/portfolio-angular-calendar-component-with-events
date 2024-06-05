import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcasePageComponent } from '../page/showcase-page/showcase-page.component';

const routes: Routes = [
  { path: '', component: ShowcasePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
