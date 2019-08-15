import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatFormFieldControl} from "@angular/material";

@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: GalleryEditComponent}]
})
export class GalleryEditComponent implements OnInit {

  @Input()
  sectionData: Section;

  @Output()
  onSubmitEvent: EventEmitter<Section> = new EventEmitter<Section>();

  model: any;

  galleryForm: FormGroup;

  itemArray: FormArray;

  urlRegex = "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";

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
    console.log(this.sectionData);
    this.sectionData.galleryItems.forEach((item) => {
      this.itemArray.push(this.createItem(item));
    });
  }

  createItem(item?: Section): FormGroup {
    if (item != null) {
      return this.fb.group({
        title: item.title ? item.title : '',
        imgUrl: item.imgUrl ? item.imgUrl : '',
        description: item.description ? item.description : '',
      });
    }
    return this.fb.group({
      title: '',
      imgUrl: '',
      description: '',
    });
  }

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.galleryForm.value);
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
