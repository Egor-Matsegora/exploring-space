import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';
import { Subscribable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { MAIN_SLIDER_API, API_KEY, OBSERVATION_IMAGE_API, ROVERS_MANIFEST_API } from '@/constants';

export const api = {
  getDataForMainSlider<T>(): Subscribable<T> {
    return ajax.getJSON<T>(MAIN_SLIDER_API).pipe(map((res) => res));
  },

  getObservationImageData<T>(data: IObservationImageFormData): Subscribable<AjaxResponse<T>> {
    const API_URL = `${OBSERVATION_IMAGE_API}?lon=${data.longtitude}&lat=${data.latitude}&date=${data.date}&api_key=${API_KEY}`;
    return ajax.get<T>(API_URL);
  },
  getActiveRoverManifest<T>(rover: string): Subscribable<T> {
    return ajax.getJSON<T>(`${ROVERS_MANIFEST_API}${rover}&api_key=${API_KEY}`).pipe(map((res) => res));
  },
};
