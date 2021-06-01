import { IMainSliderData } from '@/views/Home/interfaces/IMainSliderData';
import { Observable } from 'rxjs/internal/Observable';
import { ajax } from 'rxjs/ajax';
import { tap } from "rxjs/operators";

const API_KEY = 'DEMO_KEY';
const MAIN_SLIDER_API = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`;

export class Api {
  // public getDataForMainSlider(): Observable<IMainSliderData[] | IMainSliderData> {
    // return ajax.getJSON(MAIN_SLIDER_API).pipe(tap(console.log))
  // }
}