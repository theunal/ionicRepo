import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { Login } from '../models/login/login';
import { Token } from '../models/token';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    isAuth: boolean = false

    url: string = this.api + 'users/'

    constructor(@Inject('api') private api: string, private http: HttpClient, private router: Router) { }

    isAuthenticated() {
        if (localStorage.getItem('token')) {
            this.isAuth = true
        } else {
            this.isAuth = false
        }
        return this.isAuth
    }

    login(login: Login): Observable<SingleResponseModel<Token>> {
        let url = this.url + 'login'
        return this.http.post<SingleResponseModel<Token>>(url, login)
    }

    logout() {
        localStorage.removeItem('token')
        this.isAuth = false
        this.router.navigate([''])
    }

}