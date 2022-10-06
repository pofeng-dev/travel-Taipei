import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';


@NgModule({
  declarations: [FavoriteComponent, FavoriteItemComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FavoriteModule { }
