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

    url: string = this.api + 'users/'

    constructor(@Inject('api') private api: string, private http: HttpClient) { }

    login(login: Login): Observable<SingleResponseModel<Token>> {
        let url = this.url + 'login'
        return this.http.post<SingleResponseModel<Token>>(url, login)
    }

}