import {SavedObject} from "./saved.model";

export interface SubdirObject {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
}


export interface DirObject {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
  subdirs: SubdirObject[];
  saves: SavedObject[];
}
