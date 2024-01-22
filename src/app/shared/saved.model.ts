export interface FileObject {
  name: string;
  hash: string;
  size: string;
  caption: string;
}


export interface SavedObject {
  id: string
  create_time: string
  update_time: string
  name: string
  caption: string
  file: FileObject
}
