import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFragmentComponent } from './form-fragment/form-fragment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormListComponent } from './form-list/form-list.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    FormFragmentComponent,
    DropdownComponent,
    FormListComponent,
    GenerateCodeComponent,
    FormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialUIModule],
  exports: [
    FormFragmentComponent,
    MaterialUIModule,
    DropdownComponent,
    FormListComponent,
    GenerateCodeComponent,
    FormComponent,
  ],
})
export class FormModuleModule {}
