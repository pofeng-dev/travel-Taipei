import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/service/save.service';
@Component({
  selector: 'app-all-attractions',
  templateUrl: './all-attractions.component.html',
  styleUrls: ['./all-attractions.component.scss']
})
export class AllAttractionsComponent implements OnInit {
  optionForm: FormGroup;
  state: {
    page: number,
    categoryIds: number | null;
  } = {
      page: 1,
      categoryIds: null
    }

  data: {
    attractions: any[],
    total: number,
    totalPage: number[]
    categoryIds: number[]
  } = {
      attractions: [],
      total: 0,
      totalPage: [],
      categoryIds: Array.from({ length: 19 }, (_, i) => i + 1).filter(d => d > 10)  //不知從何取得所有id，測試有效範圍是11~19
    }
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private favoriteService: FavoriteService) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.state.page = params['page'];
      }
      if (params['categoryIds'] && params['categoryIds'] !== 'all') {
        this.state.categoryIds = params['categoryIds'];
      } else {
        this.state.categoryIds = null;
      }
      this.createTable();
      this.createOptionForm();
    });

  }
  toSave(event, el, data: any) {
    event.preventDefault();
    setTimeout(() => {
      if (el.checked) {
        this.favoriteService.remove(data.id)
        el.checked = !el.checked;
      } else {
        this.favoriteService.add(data)
        el.checked = !el.checked;
      }
      // console.log(this.favoriteService.getFavorite());
    }, 0)
  }
  createOptionForm() {
    this.optionForm = this.formBuilder.group({
      page: [this.state.page],
      categoryIds: [this.state.categoryIds]
    })

    this.optionForm.controls['page'].valueChanges.subscribe(() => {
      this.navigate()
    })
    this.optionForm.controls['categoryIds'].valueChanges.subscribe(() => {
      this.navigate()
    })
  }
  navigate() {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: this.optionForm.controls['page'].value,
          categoryIds: this.optionForm.controls['categoryIds'].value
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
  ngOnInit(): void {

  }
  createTable() {
    if (this.state.categoryIds) {

      let dataHandler = async (categoryIds) => {
        let pageSize = await this.getPageSize(categoryIds);
        if (pageSize >= this.state.page)
          this.getData(this.state.page.toString(), this.state.categoryIds.toString());
        else {
          this.state.page = 1;
          this.optionForm.controls['page'].setValue(this.state.page);
          this.getData(this.state.page.toString(), this.state.categoryIds.toString());
        }
      }
      dataHandler(this.state.categoryIds);
    } else {
      this.getData(this.state.page.toString());
    }
  }
  getPageSize(categoryIds: string) {
    return new Promise((resolve, reject) => {
      let params: {
        categoryIds: string
      } = {
        categoryIds: categoryIds.toString(),
      }
      this.http.get('open-api/zh-tw/Attractions/All', { observe: 'response', params: params }).subscribe((res: any) => {
        let response: HttpResponse<any> = res;
        let status: number = res.status;
        let statusText: string = res.statusText;
        let headers: HttpHeaders = res.headers;
        let data = res.body;
        resolve(Math.ceil(data.total / 30))
      }, err => {
        reject();
      })
    })
  }
  getData(page: string, categoryIds?: string) {
    let params: {
      page: string,
      categoryIds?: string
    } = {
      page: page,
      categoryIds: categoryIds
    }
    // if (this.state.categoryIds)
    //   params.categoryIds = this.state.categoryIds.toString()
    this.http.get('open-api/zh-tw/Attractions/All', { observe: 'response', params: params }).subscribe((res: any) => {
      let response: HttpResponse<any> = res;
      let status: number = res.status;
      let statusText: string = res.statusText;
      let headers: HttpHeaders = res.headers;
      let data = res.body;
      this.data.total = data.total;

      let max = Math.ceil(this.data.total / 30);
      this.data.totalPage = [];
      for (let i = 0; i < max; i++) {
        this.data.totalPage.push(i + 1);
      }
      let favoriteData = this.favoriteService.getFavorite()
      this.data.attractions = data.data.map((d, index) => {
        if(favoriteData){
          favoriteData.forEach(r => {
            if (d.id === r.id)
              d.favorite = true;
          })
        }
        if (!d.favorite)
          d.favorite = false;
        return d;
      })
      this.data.attractions = data.data;

    }, err => {
      console.log(err);
      // this.state.onLoading = false;
    })
  }

}
