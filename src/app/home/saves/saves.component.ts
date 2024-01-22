import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {SavedObject} from "../../shared/saved.model";
import {SavedService} from "../../services/saved.service";
import {AsyncPipe} from "@angular/common";
import {DownloadButtonComponent} from "../shared/download_button.component";
import {DirSelectorComponent} from "../shared/dir_selector.component";
import {SizePipe} from "../../pipes/size.pipe";

@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [
    AsyncPipe,
    DownloadButtonComponent,
    DirSelectorComponent,
    SizePipe
  ],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.scss'
})
export class SavesComponent {

  saves$!: Observable<SavedObject[]>

  constructor(
    private savedServices: SavedService,
  ) {}

  ngOnInit() {
    this.ls()
  }

  ls() {
    this.saves$ = this.savedServices.ls()
  }

  delete(id: string) {
    this.savedServices.rm(id).subscribe({
      next: (r) => {
        console.log(r)
        this.ls()
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  addToDir(saved_id: string, dir_id: string) {
    this.savedServices.link(saved_id, dir_id).subscribe(r => {
      console.log(r)
    })
  }
}
