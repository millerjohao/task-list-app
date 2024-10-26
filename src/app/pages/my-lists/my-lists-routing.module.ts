import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListsPage } from './my-lists.page';

const routes: Routes = [
  {
    path: '',
    component: MyListsPage,
  },
  {
    path: 'detail-list/:id',
    loadChildren: () => import('../detail-list/detail-list.module').then(m => m.DetailListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyListsPageRoutingModule {}
