import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPreviewComponent } from './form-module/form-preview/form-preview.component';
import { FormComponent } from './form-module/form/form.component';

const routes: Routes = [
  { path: 'form', component: FormPreviewComponent },
  { path: '**', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
