import { ActionTree } from 'vuex';
import { Observer, Unsubscribable } from 'rxjs';

import { api } from '@/api';
import { TRootState } from '@/store/types';
import { TObservationState, TObservationImageResponse, TObservationNotExistsResponse } from './../types';
import { observationMutationTypes } from '../mutations/mutation-types';
import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';
import { AjaxResponse } from 'rxjs/ajax';

export const actions: ActionTree<TObservationState, TRootState> = {
  fetchObservationImage(
    { commit, rootState },
    imageFormData: IObservationImageFormData
  ): Promise<TObservationImageResponse> {
    commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<AjaxResponse<TObservationImageResponse>>> = {
        next(response: AjaxResponse<TObservationImageResponse>) {
          if (response.status === 200) {
            commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS, response.request.url);
            resolve(response.request.url);
            return;
          }
          commit(
            observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST,
            (response.response as TObservationNotExistsResponse).msg
          );
          resolve((response.response as TObservationNotExistsResponse).msg);
        },
        error(error: unknown) {
          console.error(error);
          commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_ERROR);
          reject(error);
        },
      };

      const subscription: Unsubscribable = api
        .getObservationImageData<TObservationImageResponse>(imageFormData)
        .subscribe(observer as Observer<AjaxResponse<TObservationImageResponse>>);
      rootState.subscriptions.push(subscription);
    });
  },
};
