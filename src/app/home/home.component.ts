import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SavedService} from "../services/saved.service";
import {DirService} from "../services/dir.service";
import {EMPTY, map, Observable} from "rxjs";
import {DirObject} from "../shared/dir.model";
import {SizePipe} from "../pipes/size.pipe";
import {DirSelectorComponent} from "./shared/dir_selector.component";
import {DownloadButtonComponent} from "./shared/download_button.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FileObject} from "../shared/saved.model";
import {IpfsService} from "../services/ipfs.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    SizePipe,
    DirSelectorComponent,
    DownloadButtonComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private dir: DirService,
    private saved: SavedService,
    private ipfs: IpfsService,
  ) {}

  uploaded$!: Observable<FileObject[]>
  captions: { [key: string]: string } = {};
  dir$!: Observable<DirObject>
  name!: string
  rename!: string
  editingId!: string

  ngOnInit() {
    this.lsDirs()
  }

  clearName(): void {
    this.name = '';
  }

  clearRename(): void {
    this.rename = '';
  }

  clearUpload() {
    this.uploaded$ = EMPTY
  }


  getRouteId = (): Observable<string | undefined> => {
    return this.route.params.pipe(
      map(params => params['id'] || undefined)
    );
  }

  onFileSelected(event: any) {
    this.uploaded$ = this.ipfs.add(event.target.files)
  }

  addSaves(uploads: FileObject[]) {
    const result: FileObject[] = uploads.map(upload => ({
      ...upload,
      caption: this.captions[upload.hash] || ''
    }));

    this.getRouteId().subscribe(id => {
      this.saved.create(result, id).subscribe({
        next: () => {
          this.clearUpload()
          this.lsDirs()
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  lsDirs = () => {
    this.getRouteId().subscribe(id => {
      this.dir$ = this.dir.ls(id)
    });
  }

  mkDir = () => {
    this.getRouteId().subscribe(id => {
      this.dir.mk(this.name, id).subscribe({
        next: () => {
          this.clearName()
          this.lsDirs()
        },
        error: (error) => {
          console.log(error)
        }
      });
    })
  }

  renameDir = () => {
    this.getRouteId().subscribe(id => {
      if (id) {
        this.dir.rename(id, this.rename).subscribe({
          next: () => {
            this.clearRename()
            this.lsDirs()
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }

  mvDir = (id: string, targetId: string) => {
    this.dir.mv(id, targetId).subscribe({
      next: (r) => {
        this.lsDirs()
        console.log(r)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  rmDir = (id: string) => {
    this.dir.rm(id).subscribe({
      next: () => {
        alert("Removed!")
        this.lsDirs()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  removeSavedInDir(saved_id: string) {
    this.getRouteId().subscribe(id => {
      this.saved.unlink(saved_id, id).subscribe({
        next: (r) => {
          this.lsDirs()
          this.clearUpload()
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  editCaption = (id: string, value: string) => {
    this.saved.edit(id, value).subscribe(r => {
      this.editingId = ""
      this.lsDirs()
    })
  }
}
