import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponseObject} from "../shared/auth.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<AuthResponseObject>  {
    const f = new FormData()
    f.append("username", username)
    f.append("password", password)
    return this.http.post<AuthResponseObject>(`${environment.apiUrl}/login`, f)
  }
}
