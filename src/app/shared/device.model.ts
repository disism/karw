export interface DevicesObject{
  code: number,
  devices: DeviceObject[]
}

export interface DeviceObject{
  id: string;
  create_time: string;
  update_time: string;
  ip: string;
  device: string;
}

