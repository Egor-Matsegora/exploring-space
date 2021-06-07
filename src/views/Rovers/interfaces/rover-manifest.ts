import { TRoverStatus } from './rover-status';
import { IRoverPhotoManifest } from './rover-photo-manifest';

export interface IRoverManifest {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: TRoverStatus;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: IRoverPhotoManifest[];
  };
}
