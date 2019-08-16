import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-process-bar',
  templateUrl: './process-bar.component.html',
  styleUrls: ['./process-bar.component.scss']
})
export class ProcessBarComponent implements OnInit {

  info = '';
  progress: number;
  processing: boolean;

  constructor() {
  }

  ngOnInit() {
    this.progress = 0;
    this.processing = false;
  }

}
