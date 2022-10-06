import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class AttractionService {
    
}