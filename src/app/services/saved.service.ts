import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {FileObject, SavedObject} from "../shared/saved.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_saved/v1`

  create(saves: FileObject[], id?: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const creates: FileObject[] = []
    saves.forEach(f => {
      creates.push(f)
    });
    const raw = JSON.stringify(creates)
    return this.http.post(`${this.api}${id ? `?dir_id=${id}` : ''}`, raw, { headers: headers })
  }

  ls(): Observable<SavedObject[]> {
    return this.http.get<SavedObject[]>(this.api)
  }

  rm(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}`)
  }

  link(saved_id: string, dir_id?: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("dir_id", dir_id!)
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}/link`, f)
  }

  unlink(saved_id: string, dir_id?: string): Observable<SimpleResponse> {
    const f = new FormData()
    if (dir_id!) {
      f.append("dir_id", dir_id)
    }
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}/unlink`, f)
  }

  edit(saved_id: string, caption: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("caption", caption)
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}`, f)
  }

}
