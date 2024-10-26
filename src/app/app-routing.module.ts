import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-lists',
    pathMatch: 'full',
  },
  {
    path: 'my-lists',
    loadChildren: () => import('./pages/my-lists/my-lists.module').then(m => m.MyListsPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
