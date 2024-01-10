import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FormFormat } from './form-module/form-format';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormMasterService {
  formList: FormFormat[] = [];
  displayCode: boolean = false;
  formData: FormGroup;
  options: FormArray = new FormArray([new FormControl('')]);
  private formListSubject: Subject<FormFormat[]> = new Subject<FormFormat[]>();
  formList$: Observable<FormFormat[]> = this.formListSubject.asObservable();
  private displaySubject: Subject<boolean> = new Subject<boolean>();
  displayCode$: Observable<boolean> = this.displaySubject.asObservable();

  selectFeilds = [
    { label: 'Text', value: 'text' },
    { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' },
    { label: 'Dropdown', value: 'dropdown' },
  ];

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      name: [''],
      selectedField: [this.selectFeilds[0].value],
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
    this.formListSubject.next([...this.formList]);
    this.formReset();
    console.log(this.formList);
  }

  formReset(): void {
    this.formData.reset({
      selectedField: this.selectFeilds[0].value,
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

  setDisplayCode(): void {
    this.displayCode = true;
    this.displaySubject.next(this.displayCode);
  }

  generateFormCode(): string[] {
    this.setDisplayCode();
    let code: string[] = [];
    code.push(`<form>`);
    for (let form of this.formList) {
      console.log(form);
      let tag = this.returnTag(form);
      code.push(tag);
    }
    code.push(`</form>`);
    return code;
  }

  returnTag(form: FormFormat): string {
    let tag: string = '';
    console.log(form);
    if (form.selectedField === 'dropdown') {
      tag = `<select name="${form.name}" id="${form.name}"`;
      if (form.required) {
        tag += ` required`;
      }
      tag += `>`;
      for (let option of form.options) {
        tag += `<option value="${option}">${option}</option>`;
      }
      tag += `</select>`;
    } else {
      tag = `<input name="${form.name}" id="${form.name}"`;
      if (form.selectedField === 'email') {
        tag += ` type="email"`;
      } else if (form.selectedField === 'password') {
        tag += ` type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"`;
      } else if (form.selectedField === 'text') {
        tag += ` type="text" pattern="^[a-zA-Z]+$"`;
      }

      if (form.required) {
        tag += ` required`;
      }
      tag += `>`;
    }
    return tag;
  }

  resetAll(): void {
    this.formList = [];
    this.formListSubject.next([...this.formList]);
    this.displayCode = false;
    this.displaySubject.next(this.displayCode);
    this.formReset();
  }
}
