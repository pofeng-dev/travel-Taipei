import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllAttractionsRoutingModule } from './all-attractions-routing.module';
import { AllAttractionsComponent } from './all-attractions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllAttractionsComponent
  ],
  imports: [
    CommonModule,
    AllAttractionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AllAttractionsModule { }
