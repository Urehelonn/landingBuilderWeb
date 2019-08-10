import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss']
})
export class GalleryEditComponent implements OnInit {

  @Input()
  sectionData: Section;
  @Output()
  onSubmitEvent = new EventEmitter<Section>();

  model: any;
  galleryForm: FormGroup;
  itemArray: FormArray;

  constructor(private fb: FormBuilder) {
    this.galleryForm = this.fb.group({
      title: '',
      subtitle: '',
      background: '',
      menuItems: this.fb.array([])
    });

    this.itemArray = this.galleryForm.get('items') as FormArray;
  }

  ngOnInit() {
    this.model = {...this.sectionData};
    this.galleryForm.patchValue({
      title: this.sectionData.title,
      subtitle: this.sectionData.subtitle,
      background: this.sectionData.background,
    });
    // this.sectionData.galleryItem.forEach((item) => {
    //   this.itemArray.push(this.createItem(item));
    // });
  }

  createItem(item?: Section): FormGroup {
    if (item) {
      return this.fb.group({
        title: item.title ? item.title : '',
        background: item.background ? item.background : '',
        description: item.description ? item.description : '',
      });
    }
    return this.fb.group({
      title: '',
      background: '',
      description: '',
    });

  }

  submit() {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.galleryForm.value);
    this.onSubmitEvent.emit(this.galleryForm.value);
  }

  removeItem(ebent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.itemArray.removeAt(index);
  }

  addItem() {
    event.preventDefault();
    event.stopPropagation();
    this.itemArray.push(this.createItem());
  }
}
