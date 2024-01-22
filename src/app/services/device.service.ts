import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DeviceObject, DevicesObject} from "../shared/device.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_devices`;

  get(): Observable<DevicesObject> {
    return this.http.get<DevicesObject>(`${this.api}/v1`);
  }

  delete(deviceID: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/v1/${deviceID}`)
  }

}
