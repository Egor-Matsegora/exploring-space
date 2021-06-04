import { Module } from 'vuex';

import { TRootState } from '@/store/types';
import { TObservationState } from './types';
import { actions } from './actions';
import { mutations } from './mutations';

export const observation: Module<TObservationState, TRootState> = {
  state: {
    observationImageData: null,
    observationError: null,
    observationLoading: false,
  },
  mutations,
  actions,
};
