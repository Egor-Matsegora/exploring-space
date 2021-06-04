import { ActionTree } from 'vuex';
import { Observer, Unsubscribable } from 'rxjs';

import { api } from '@/api';
import { TRootState } from '@/store/types';
import { TObservationState, TObservationImageResponse } from './../types';
import { observationMutationTypes } from '../mutations/mutation-types';
import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';

export const actions: ActionTree<TObservationState, TRootState> = {
  fetchObservationImage(
    { commit, rootState },
    imageFormData: IObservationImageFormData
  ): Promise<TObservationImageResponse> {
    commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE);

    return new Promise((resolve) => {
      const observer: Partial<Observer<AjaxResponse<TObservationImageResponse>>> = {
        next(response: AjaxResponse<TObservationImageResponse>) {
          commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS, response.request.url);
          resolve(response.request.url);
        },
        error(error: AjaxError) {
          console.log(error.response.msg);
          commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST, error.response.msg);
          resolve(error.response.msg);
        },
      };

      const subscription: Unsubscribable = api
        .getObservationImageData<TObservationImageResponse>(imageFormData)
        .subscribe(observer as Observer<AjaxResponse<TObservationImageResponse>>);
      rootState.subscriptions.push(subscription);
    });
  },
};
