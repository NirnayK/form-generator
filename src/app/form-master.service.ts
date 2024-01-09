import { Injectable } from '@angular/core';
import { FormFormat } from './form-module/form-format';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormMasterService {
  formList: FormFormat[] = [];
  formData: FormGroup;
  options: FormArray = new FormArray([new FormControl('')]);

  selectFeilds = [
    { label: 'Text', value: 'text' },
    { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' },
    { label: 'Dropdown', value: 'dropdown' },
  ];

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      name: [''],
      selectedFeild: [this.selectFeilds[0].value],
      required: [false],
      options: this.options,
    });
  }

  getAllFormDetails(): FormFormat[] {
    return this.formList;
  }

  submitFormFragment(): void {
    const value = this.formData.value;
    this.formList.push(value);
    this.formReset();
    console.log(this.formList);
  }

  formReset(): void {
    this.formData.reset({
      selectedFeild: this.selectFeilds[0].value,
      required: false,
    });
    this.options.clear();
    this.options.push(new FormControl(''));
  }

  getOptions(): FormArray {
    return this.options;
  }

  addOption(): void {
    this.options.push(new FormControl(''));
  }

  removeOption(index: number): void {
    if (this.options.length > 1) this.options.removeAt(index);
  }
}
