import { MutationTree } from 'vuex';
import { TObservationState } from './../types';
import { observationMutationTypes } from './mutation-types';

export const mutations: MutationTree<TObservationState> = {
  [observationMutationTypes.FETCH_OBSERVATION_IMAGE](state: TObservationState) {
    state.observationLoading = true;
  },
  [observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS](state: TObservationState, imageData: string) {
    state.observationImageData = imageData;
    state.observationLoading = false;
    state.notExistsMessage = null;
  },
  [observationMutationTypes.FETCH_OBSERVATION_IMAGE_ERROR](state: TObservationState, message: string) {
    state.notExistsMessage = message;
    state.observationLoading = false;
    state.observationImageData = null;
  },
  [observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST](state: TObservationState, message: string) {
    state.notExistsMessage = message;
    state.observationLoading = false;
  },
};
