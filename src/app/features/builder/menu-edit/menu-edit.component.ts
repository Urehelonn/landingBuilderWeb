import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Categories} from '../../../model/Categories';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  @Input()
  sectionData: Section;
  @Output()
  onSubmitEvent = new EventEmitter<Section>();

  model: any;
  menuForm: FormGroup;
  itemArray: FormArray;
  categoryArray: FormArray;

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      title: '',
      description: '',
      categories: this.fb.array([]),
      items: this.fb.array([])
    });
    this.categoryArray = this.menuForm.get('categories') as FormArray;
    this.itemArray = this.menuForm.get('items') as FormArray;
  }

  ngOnInit() {
    this.model = {...this.sectionData};
    this.menuForm.patchValue({
      title: this.sectionData.title,
      description: this.sectionData.description,
    });
    this.sectionData.items.forEach((item) => {
      this.itemArray.push(this.createItem(item));
    });
    this.sectionData.categories.forEach((item) => {
      this.categoryArray.push(this.fb.control(item));
    });
  }

  createItem(item?: Section): FormGroup {
    if (item) {
      return this.fb.group({
        title: item.title ? item.title : '',
        description: item.description ? item.description : '',
        price: item.price ? item.price : '',
        category: item.category ? item.category : Categories.main_course,
      });
    }
    return this.fb.group({
      title: '',
      description: '',
      price: '',
      category: Categories.main_course,
    });
  }

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.menuForm.value);
    this.onSubmitEvent.emit(this.menuForm.value);
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
