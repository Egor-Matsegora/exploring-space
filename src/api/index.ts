import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';
import { Subscribable, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from "rxjs/operators";
import { MAIN_SLIDER_API, API_KEY, OBSERVATION_IMAGE_API } from '@/constants';

export const api = {
  getDataForMainSlider<T>(): Subscribable<T> {
    return ajax.getJSON<T>(MAIN_SLIDER_API).pipe(map(res => res), tap(console.info));
  },

  getObservationImageData<T>(data: IObservationImageFormData): Subscribable<T> {
    const API_URL = `${OBSERVATION_IMAGE_API}?lon=${data.longtitude}&lat=${data.latitude}&date=${data.date}&api_key=${API_KEY}`;
    return ajax.getJSON<T>(API_URL).pipe(map(res => res));
  }
}