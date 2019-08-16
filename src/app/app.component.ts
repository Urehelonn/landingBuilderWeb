import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}

interface LabelledValue {
  title: string;
  subtitle?: string;
  description?: string;
  //[arg: string]:any;
}

function printLabel(labelledObj: { label: string }) {
  // console.log(labelledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
