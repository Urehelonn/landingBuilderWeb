import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-head-edit',
  templateUrl: './head-edit.component.html',
  styleUrls: ['./head-edit.component.scss']
})
export class HeadEditComponent implements OnInit {

  @Input()
  sectionData;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSubmitEvent: EventEmitter<Section> = new EventEmitter<Section>();

  model: any;
  headForm: FormGroup;
  urlRegex = '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';

  constructor(private fb: FormBuilder) {
    this.headForm = this.fb.group({
      title: '',
      description: '',
      imgUrl: ['', Validators.pattern(this.urlRegex)],
      background: ['', Validators.pattern(this.urlRegex)]
    });
  }

  ngOnInit() {
    this.model = {...this.sectionData};
    this.headForm.patchValue({
      title: this.sectionData.title,
      description: this.sectionData.description,
      imgUrl: this.sectionData.imgUrl,
      background: !!this.sectionData.background ? this.sectionData.background : ''
    });
    console.log('at ngOnInit ', this.sectionData.imgUrl);
  }

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('head value: ', this.headForm.value);
    this.onSubmitEvent.emit(this.headForm.value);
  }

}
