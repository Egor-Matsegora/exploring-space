import { ActionTree } from 'vuex';
import { Observer } from 'rxjs';
import dayjs from 'dayjs';

import { api } from '@/api';
import { IMainSliderData } from '@/views/Home/interfaces/IMainSliderData';
import { TRootState } from '@/store/types';
import { homeStoreMutationTypes } from '../mutations/mutation-types';
import { TMainSliderResponse } from '../types/index';
import { THomeState } from '../types';

export const actions: ActionTree<THomeState, TRootState> = {
  fetchMainSliderData({ commit, rootState }, dateNow: string): Promise<TMainSliderResponse> {
    commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);

    const defaultDate = dayjs().format('YYYY-MM-DD');

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
        },
      };

      // утверждение типа добавлено для адекватного срабатывания нужной перегрузки
      const subscription = api
        .getDataForMainSlider<TMainSliderResponse>()
        .subscribe(observer as Observer<TMainSliderResponse>);
      rootState.subscriptions.push(subscription);
    });
  },

  fetchMainSliderDataWithStorage({ commit, dispatch }): Promise<TMainSliderResponse> {
    const dateNow = dayjs().format('YYYY-MM-DD');
    const sliderData = localStorage.getItem(dateNow);

    if (!localStorage.getItem(dateNow)) {
      localStorage.clear();
    }

    if (sliderData) {
      return new Promise((resolve) => {
        const data: IMainSliderData[] = JSON.parse(sliderData);
        commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, data);
        resolve(data);
      });
    }

    return dispatch('fetchMainSliderData', dateNow);
  },
};
