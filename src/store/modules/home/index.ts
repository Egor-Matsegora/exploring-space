import { TRootState } from '../../types/index';
import { Module } from "vuex";

import { THomeState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';

export const home: Module<THomeState, TRootState> = {
  state: () => ({
    mainSliderData: [],
    mainSliderLoading: false,
    error: null
  }),
  mutations,
  actions,
};