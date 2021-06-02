import { IMainSliderData } from '@/views/Home/interfaces/IMainSliderData';

export type THomeState = {
  mainSliderData: IMainSliderData[];
  mainSliderLoading: boolean;
  error: unknown;
}

export type TMainSliderResponse = IMainSliderData[] | unknown;