import { RootMutationTypes } from './../../../mutations/mutation-types';
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
  fetchMainSliderData({ commit }, dateNow: string = dayjs().format('YYYY-MM-DD')): Promise<TMainSliderResponse> {
    commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<TMainSliderResponse>> = {
        next(res: TMainSliderResponse) {
          commit(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, res);
          localStorage.setItem(dateNow, JSON.stringify(res));
          resolve(res);
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
      commit(RootMutationTypes.ADD_SUBSCRIPTION, subscription);
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
