import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllAttractionsComponent } from './all-attractions.component';

const routes: Routes = [
  {
    path: '', component: AllAttractionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllAttractionsRoutingModule { }
