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
  sectionData: any;
  @Input()
  categoryData: any[];
  @Output()
  onSubmitEvent = new EventEmitter<Section>();

  model: any;
  menuForm: FormGroup;
  itemArray: FormArray;

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      title: '',
      description: '',
      menuItems: this.fb.array([])
    });
    this.itemArray = this.menuForm.get('menuItems') as FormArray;
  }

  ngOnInit() {
    if (this.sectionData !== null) {
      this.model = {...this.sectionData};
      this.menuForm.patchValue({
        title: this.sectionData.title,
        description: this.sectionData.description,
      });
      if (this.sectionData.menuItems !== null) {
        this.sectionData.menuItems.forEach((item) => {
          this.itemArray.push(this.createItem(item));
        });
      }
    }
  }

  createItem(item?): FormGroup {
    if (item) {
      return this.fb.group({
        name: item.name ? item.name : '',
        description: item.description ? item.description : '',
        price: item.price ? item.price : '',
        category: item.category ? item.category : Categories.dinner,
      });
    }
    return this.fb.group({
      name: '',
      description: '',
      price: '',
      category: Categories.dinner,
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
