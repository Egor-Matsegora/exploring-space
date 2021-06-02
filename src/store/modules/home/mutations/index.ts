import { MutationTree } from "vuex";

import { homeStoreMutationTypes } from './mutationTypes';
import { THomeState } from '../types/index';

export const mutations: MutationTree<THomeState> = {
  [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER](state) {
    state.mainSliderLoading = true;
  },
  [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS](state, data) {
    state.mainSliderLoading = false;
    state.mainSliderData = data;
  },
  [homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR](state, err) {
    state.mainSliderLoading = false;
    state.error = err;
  }
}