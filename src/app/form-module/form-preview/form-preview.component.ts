import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormMasterService } from '../../form-master.service';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss',
})
export class FormPreviewComponent {
  sanitizedHTML: SafeHtml;
  formService: FormMasterService = inject(FormMasterService);

  constructor(private sanitizer: DomSanitizer) {
    let code: string[] = this.formService.generateFormCode();
    let fullcode: string = this.formService.arraytToString(code);
    this.sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(fullcode);
  }
}
