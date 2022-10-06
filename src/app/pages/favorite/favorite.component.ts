import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/service/save.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  constructor(private favoriteService: FavoriteService) { }
  data: {
    favorite: any[]
  } = {
      favorite: []
    }
  ngOnInit(): void {
    this.data.favorite = this.getData();
  }
  getData(){
    return this.favoriteService.getFavorite();
  }

}
