import { Component, inject } from '@angular/core';
import { FormMasterService } from '../../form-master.service';
import { FormFormat } from '../form-format';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrl: './generate-code.component.scss',
})
export class GenerateCodeComponent {
  formList: FormFormat[];
  formService: FormMasterService = inject(FormMasterService);

  constructor() {
    this.formList = this.formService.getAllFormDetails();
  }

  generateCode(formList: FormFormat[]): string[] {
    let code: string[] = [];
    for (let form of formList) {
      let tag = this.returnTag(form);
      code.push(tag);
    }
    return code;
  }

  returnTag(form: FormFormat): string {
    let tag: string = '';
    if (form.type === 'dropdown') {
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
      if (form.type === 'email') {
        tag += ` type="email"`;
      } else if (form.type === 'password') {
        tag += ` type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"`;
      } else if (form.type === 'text') {
        tag += ` type="text 'pattern', '^[a-zA-Z]+$'"`;
      }

      if (form.required) {
        tag += ` required`;
      }
      tag += `>`;
    }
    return tag;
  }

  copyCode(): void {
    let code: string[] = this.generateCode(this.formList);
    let codeString: string = '';
    for (let line of code) {
      codeString += line;
    }
    navigator.clipboard.writeText(codeString);
  }
}
