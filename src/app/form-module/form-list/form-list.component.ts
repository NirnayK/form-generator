import { Component, OnInit, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';
import { FormFormat } from '../form-format';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
})
export class FormListComponent implements OnInit {
  formList: FormFormat[];
  formService: FormMasterService = inject(FormMasterService);
  displayedColumns: string[] = ['id', 'name', 'type', 'required'];

  constructor() {
    this.formList = this.formService.getAllFormDetails();
  }

  ngOnInit(): void {
    this.formService.formList$.subscribe((updatedFormList) => {
      this.formList = updatedFormList;
    });
  }
}
