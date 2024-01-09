import { Component, Input, OnInit, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  formService: FormMasterService = inject(FormMasterService);
  options!: FormArray;

  ngOnInit(): void {
    this.options = this.parentForm.get('options') as FormArray;
    this.options.setValidators([Validators.required]);
  }

  constructor() {}

  addItem(): void {
    this.formService.addOption();
  }

  removeItem(index: number): void {
    this.formService.removeOption(index);
  }

  getErrorMessage(i: number) {
    if (this.options.at(i).hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }
}
