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

  urlRegex = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');

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
      title: [item && item.title ? item.title : '', Validators.required],
      imgUrl: [item && item.imgUrl ? item.imgUrl : '', [Validators.required, Validators.pattern(this.urlRegex)]],
      description: [item && item.description ? item.description : '', Validators.required],
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
