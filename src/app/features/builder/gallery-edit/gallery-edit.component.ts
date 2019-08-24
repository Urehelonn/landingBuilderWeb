import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';

@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: GalleryEditComponent}]
})
export class GalleryEditComponent implements OnInit {

  @Input()
  sectionData;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSubmitEvent: EventEmitter<Section> = new EventEmitter<Section>();

  model: any;

  galleryForm: FormGroup;

  itemArray: FormArray;

  urlRegex = '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';

  constructor(private fb: FormBuilder) {
    this.galleryForm = this.fb.group({
      title: '',
      description: '',
      background: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
      galleryItems: this.fb.array([])
    });

    this.itemArray = this.galleryForm.get('galleryItems') as FormArray;
  }

  ngOnInit() {
    this.model = {...this.sectionData};
    this.galleryForm.patchValue({
      title: this.sectionData.title,
      description: this.sectionData.description,
      background: this.sectionData.background,
    });
    if (!!this.sectionData.galleryItems) {
      this.sectionData.galleryItems.forEach((item) => {
        this.itemArray.push(this.createItem(item));
      });
    }
  }

  createItem(item?: Section): FormGroup {
    return this.fb.group({
      title: item && item.title ? item.title : '',
      imgUrl: item && item.imgUrl ? item.imgUrl : '',
      description: item && item.description ? item.description : '',
    });
  }

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.onSubmitEvent.emit(this.galleryForm.value);
  }

  removeItem(event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.itemArray.removeAt(index);
  }

  addItem(event) {
    event.preventDefault();
    event.stopPropagation();
    this.itemArray.push(this.createItem());
  }


}
