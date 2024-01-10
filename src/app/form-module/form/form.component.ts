import { Component, OnInit, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  formService: FormMasterService = inject(FormMasterService);
  displayCode: boolean = false;

  ngOnInit(): void {
    this.formService.displayCode$.subscribe((updatedDisplayCode) => {
      this.displayCode = updatedDisplayCode;
    });
  }
}
