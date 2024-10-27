import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialPage } from './special-page.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialPageRoutingModule {}
