import { ActionTree } from "vuex";
import { Observer } from "rxjs";

import { api } from '@/api';
import { TRootState } from '@/store/types';
import {
  TObservationState,
  TObservationImageResponse,
  TObservationNotExistsResponse
} from './../types';
import { observationMutationTypes } from '../mutations/mutation-types';
import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';

export const actions: ActionTree<TObservationState, TRootState> = {
  fetchObservationImage(
    {commit},
    imageFormData: IObservationImageFormData
  ): Promise<TObservationImageResponse> {
    commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<TObservationImageResponse>> = {
        next(response: TObservationImageResponse) {
          if ((response as TObservationNotExistsResponse).msg) {
            commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST);
            resolve(response);
            return;
          }
          commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS);
          resolve(response);
        },
        error(error: unknown) {
          commit(observationMutationTypes.FETCH_OBSERVATION_IMAGE_ERROR);
          reject(error);
        }
      }

      api.getObservationImageData<TObservationImageResponse>(imageFormData).subscribe(observer as Observer<TObservationImageResponse>);
    })
  }
}