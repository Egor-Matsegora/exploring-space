import { Subscribable, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from "rxjs/operators";
import { MAIN_SLIDER_API } from '@/constants';

export const api = {
  getDataForMainSlider<T>(): Subscribable<T> {
    return ajax.getJSON<T>(MAIN_SLIDER_API).pipe(map(res => res), tap(console.info));
  }
}