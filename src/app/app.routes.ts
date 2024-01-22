import { Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {AppComponent} from "./app.component";
import {authGuard} from "./auth.guard";
import {AuthComponent} from "./auth/auth.component";
import {IamComponent} from "./iam/iam.component";
import {HomeComponent} from "./home/home.component";
import { DeviceComponent } from './iam/device/device.component';
import {SavesComponent} from "./home/saves/saves.component";

export const routes: Routes = [
  {
    path: 'about',
    title: 'About',
    component: AboutComponent
  },
  {
    path: 'auth',
    title: 'Auth',
    component: AuthComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'saved/:id',
    title:'Dir',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'saves',
    title:'Saves',
    component: SavesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'iam',
    title: 'IAm',
    component: IamComponent,
    canActivate: [authGuard],
  },
  {
    path: 'iam/device',
    title: "Device",
    component: DeviceComponent,
    canActivate: [authGuard],
  },
];
