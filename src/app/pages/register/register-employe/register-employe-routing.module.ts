import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterEmployePage } from './register-employe.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterEmployePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterEmployePageRoutingModule {}
