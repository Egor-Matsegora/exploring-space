import { THomeState, TMainSliderResponse } from './types';
import { Module } from "vuex";
import { Observer } from 'rxjs';

import { api } from '@/api/index';
import { homeStoreMutationTypes } from './mutationTypes';
import { IMainSliderData } from '@/views/Home/interfaces/IMainSliderData';

export const homeStore: Module<THomeState, {[key: string]: any}> = {
  state: () => ({
    mainSliderData: [],
    mainSliderLoading: false,
    error: null
  }),
  mutations: {
    [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER]({mainSliderLoading}) {
      mainSliderLoading = true;
    },
    [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS]({mainSliderLoading, mainSliderData}, data) {
      mainSliderLoading = false;
      mainSliderData = data;
    },
    [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR]({mainSliderLoading, error}, err) {
      mainSliderLoading = false;
      error = err;
    }
  },
  actions: {
    fetchMainSliderData({ commit }, dateNow: string): Promise<TMainSliderResponse> {

      commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);

      const defaultDate = new Date().toDateString();

      return new Promise((resolve, reject) => {


        const observer: Partial<Observer<TMainSliderResponse>> = {
          next(res: TMainSliderResponse) {
            const resultRes: IMainSliderData[] = ((res as IMainSliderData[]).length ? res : [res]) as IMainSliderData[];
            commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, resultRes);
            localStorage.setItem(dateNow || defaultDate, JSON.stringify(resultRes));
            resolve(resultRes);
          },
          error(err) {
            commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR, err);
            reject(err);
          }
        }

        api.getDataForMainSlider<TMainSliderResponse>().subscribe(observer as Observer<TMainSliderResponse>);
      })
    },
    fetchMainSliderDataWithStorage({commit, dispatch}): Promise<TMainSliderResponse> {
      const dateNow = new Date();
      const sliderData = localStorage.getItem(dateNow.toDateString());
      const prevDate = new Date(new Date().setDate(dateNow.getDate() -1)).toDateString();

      if (localStorage.getItem(prevDate)) {
        localStorage.removeItem(prevDate);
      }

      if (sliderData) {
        return new Promise(resolve => {
          const data: IMainSliderData[] = JSON.parse(sliderData);
          commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, data);
          resolve(data);
        })
      }

      return dispatch('fetchMainSliderData', dateNow.toDateString());
    }
  },
};