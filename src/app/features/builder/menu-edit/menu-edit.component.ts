import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  @Input()
  sectionData: any;
  @Input()
  categoryData = ['dinner', 'lunch', 'breakfast'];
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
      let counter = 0;
      if (!!this.sectionData.menuItems) {
        this.sectionData.menuItems.forEach((item) => {
          this.itemArray.push(this.createItem(item));
          counter++;
        });
      }
    }
  }

  createItem(item?): FormGroup {
    return this.fb.group({
      name: item && item.name ? item.name : '',
      description: item && item.description ? item.description : '',
      price: item && item.price ? item.price : '',
      category: item && item.category ? item.category : 'dinner',
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
