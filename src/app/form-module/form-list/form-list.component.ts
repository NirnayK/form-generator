import { Component, OnInit, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';
import { FormFormat } from '../form-format';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FormListComponent implements OnInit {
  formList: FormFormat[];
  formService: FormMasterService = inject(FormMasterService);
  columnsToDisplay: string[] = ['name', 'selectedField', 'required'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'options', 'delete'];
  expandedElement!: FormFormat | null;

  constructor() {
    this.formList = this.formService.getAllFormDetails();
  }

  ngOnInit(): void {
    this.formService.formList$.subscribe((updatedFormList) => {
      this.formList = updatedFormList;
    });
  }

  capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  deleteRow(element: FormFormat): void {
    this.formService.deleteFormFrag(element);
  }
}
