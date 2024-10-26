import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailListPage } from './detail-list.page';

const routes: Routes = [
  {
    path: '',
    component: DetailListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailListPageRoutingModule {}