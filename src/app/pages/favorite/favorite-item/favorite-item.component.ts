import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoriteService } from 'src/app/service/save.service';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {
  @Input() set setData(value: any) {
    this.data.favorite = value;
    this.setFormData();
  }
  optionForm: FormGroup;
  data: {
    favorite: any;
  } = {
      favorite: null
    }
  constructor(
    private formBuilder: FormBuilder,
    private favoriteService: FavoriteService
  ) {
    let Regex = /^[^\u4e00-\u9fa5]+$/;
    this.optionForm = this.formBuilder.group({
      // name: [this.data.favorite.name, Validators.required],
      // tel: [this.data.favorite.name, [Validators.required]]
      name: [, Validators.required],
      tel: [, [Validators.required, Validators.pattern(Regex)]]
    })
  }

  ngOnInit(): void {
  }
  setFormData() {
    this.optionForm.controls['name'].setValue(this.data.favorite.name);
    this.optionForm.controls['tel'].setValue(this.data.favorite.tel);
  }
  toSave(event, el) {
    event.preventDefault();
    setTimeout(() => {
      if (el.checked) {
        this.favoriteService.remove(this.data.favorite.id)
        el.checked = !el.checked;
      } else {
        this.favoriteService.add(this.data.favorite)
        el.checked = !el.checked;
      }
      // console.log(this.favoriteService.getFavorite());
    }, 0)
  }
  toEdit() {
    if (this.optionForm.valid){
      this.data.favorite.name = this.optionForm.controls['name'].value;
      this.data.favorite.tel = this.optionForm.controls['tel'].value;
      this.favoriteService.edit(this.data.favorite)
    }
  }
}
