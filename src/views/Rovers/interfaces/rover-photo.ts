import { IRoverCamera } from './rover-camera';
import { IRover } from './rover';

export interface IRoverPhoto {
  id: number;
  sol: number;
  camera: IRoverCamera;
  img_src: string;
  earth_date: string;
  rover: IRover;
}
