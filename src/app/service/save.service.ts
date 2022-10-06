import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class FavoriteService {
    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }
    getFavorite() {
        return JSON.parse(localStorage.getItem('favoriteData'));
    }
    remove(id) {
        let obj = JSON.parse(localStorage.getItem('favoriteData')).filter(d => d.id !== id);
        localStorage.setItem('favoriteData', JSON.stringify(obj));
    }
    add(data: any) {
        if (localStorage.getItem("favoriteData")) {
            let obj = JSON.parse(localStorage.getItem('favoriteData'));
            obj.push(data);
            localStorage.setItem('favoriteData', JSON.stringify(obj));
        } else {
            let obj = [data];
            localStorage.setItem('favoriteData', JSON.stringify(obj));
        }
    }
    edit(data){
        this.remove(data.id);
        this.add(data);
    }
}