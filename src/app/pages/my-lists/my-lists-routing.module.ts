import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListsPage } from './my-lists.page';

const routes: Routes = [
  {
    path: 'my-lists',
    component: MyListsPage,
  },
  {
    path: '',
    redirectTo: '/my-lists',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
