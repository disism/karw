import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthResponseObject} from "../shared/auth.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  create(username: string, password: string): Observable<AuthResponseObject> {
    const f = new FormData
    f.append("username", username)
    f.append("password", password)
    return this.http.post<AuthResponseObject>(`${environment.apiUrl}/users/create`, f)

  }
}
