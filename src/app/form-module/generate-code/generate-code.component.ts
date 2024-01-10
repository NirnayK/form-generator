import { Component, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrl: './generate-code.component.scss',
})
export class GenerateCodeComponent {
  formService: FormMasterService = inject(FormMasterService);
  fullcode: string = '';

  constructor() {
    let code: string[] = this.formService.generateFormCode();
    this.fullcode = this.formService.arraytToString(code);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.fullcode);
  }
}
