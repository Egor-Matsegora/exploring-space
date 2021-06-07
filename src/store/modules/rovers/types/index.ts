import { IRoverPhoto } from '@/views/Rovers/interfaces/rover-photo';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';

export type TRoversState = {
  manifestLoading: boolean;
  imagesLoading: boolean;
  activeRover: string;
  error: unknown | null;
  roverManifest: IRoverManifest | null;
  roverPhotos: IRoverPhoto[];
  page: number;
};
