import { Component, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';
import { FormFormat } from '../form-format';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
})
export class FormListComponent {
  formList: FormFormat[];
  formService: FormMasterService = inject(FormMasterService);
  displayedColumns: string[] = ['id', 'name', 'type', 'required'];

  constructor() {
    this.formList = this.formService.getAllFormDetails();
  }
}
