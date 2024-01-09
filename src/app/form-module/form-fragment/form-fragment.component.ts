import { Component, inject } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormMasterService } from '../../form-master.service';

@Component({
  selector: 'app-form-fragment',
  templateUrl: './form-fragment.component.html',
  styleUrl: './form-fragment.component.scss',
})
export class FormFragmentComponent {
  formService: FormMasterService = inject(FormMasterService);
  formFrag: FormGroup = this.formService.formData;
  options: FormArray = this.formService.getOptions();

  selectFeilds = [
    { label: 'Text', value: 'text' },
    { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' },
    { label: 'Dropdown', value: 'dropdown' },
  ];

  submit() {
    this.formService.submitFormFragment();
  }

  getErrorMessage() {
    if (this.formFrag.get('name')?.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  addItem(): void {
    this.formService.addOption();
  }

  removeItem(index: number): void {
    this.formService.removeOption(index);
  }

  getErrorMessageAtI(i: number) {
    if (this.formFrag.get('options')?.get(i.toString())?.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }
}
