import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'attraction', loadChildren: () => import('./pages/all-attractions/all-attractions.module').then(m => m.AllAttractionsModule) },
  { path: 'favorite', loadChildren: () => import('./pages/favorite/favorite.module').then(m => m.FavoriteModule) },
  { path: '', redirectTo: 'attraction', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
