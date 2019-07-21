import { Component } from '@angular/core';
import * as data from './json/shipmentTypes.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'post-office-app';
  constructor() {
    console.log("data", data)
  }

}
