import { Component } from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {map, Observable, of, switchAll, switchMap, tap} from "rxjs";
import {DeviceObject, DevicesObject} from "../../shared/device.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})

export class DeviceComponent {
  constructor(
    private deviceService: DeviceService
  ) { }

  device$!: Observable<DevicesObject>

  ngOnInit() {
    this.getDevices()
  }

  getDevices(): Observable<DevicesObject> {
    this.device$ = this.deviceService.get().pipe(
      tap(r => console.log(r)),
    );
    return this.device$;
  }

  logout(d: DeviceObject) {
    this.deviceService.delete(d.id).pipe(
      switchMap(r => {
        if (r.code == 200) {
          return this.getDevices();
        }
        return of({} as DevicesObject);
      }),
      tap(devices => console.log(devices))
    ).subscribe(devices => this.device$ = of(devices));
  }


}
