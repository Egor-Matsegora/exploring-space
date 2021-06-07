import { TRoverStatus } from './rover-status';
export interface IRover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: TRoverStatus;
}
