import { Component } from '@angular/core';

@Component({
  selector: 'app-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrl: './showcase-page.component.scss'
})
export class ShowcasePageComponent {
  public selectedDate: Date | undefined;

  constructor() {
    this.selectedDate = new Date();
  }

  public dateSelectHandler(e: Date): void {
    this.selectedDate = e;
  }
}
