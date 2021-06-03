import { mutations } from './mutations';
import { TRootState } from '@/store/types';
import { Module } from "vuex";
import { TObservationState } from "./types";



export const observation: Module<TObservationState, TRootState> = {
  state: {
    observationImageData: null,
    observationError: null,
    observationLoading: false,
  },
  mutations,
  actions: {},
}