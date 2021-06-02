import { MutationTree } from "vuex";

import { homeStoreMutationTypes } from './mutationTypes';
import { THomeState } from '../types/index';

export const mutations: MutationTree<THomeState> = {
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
}