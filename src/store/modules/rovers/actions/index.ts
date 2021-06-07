import { IRoverPhoto } from '@/views/Rovers/interfaces/rover-photo';
import { Observer, Unsubscribable } from 'rxjs';
import { ActionTree } from 'vuex';

import { api } from '@/api';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';
import { IRoverFormData } from '@/views/Rovers/interfaces/rover-form-data';
import { roversMutationTypesEnum } from '../mutaions/mutation-types';
import { TRootState } from '@/store/types';
import { TRoversState } from '../types';

export const actions: ActionTree<TRoversState, TRootState> = {
  fetchRoverManifest({ commit, state, rootState }): Promise<IRoverManifest | unknown> {
    commit(roversMutationTypesEnum.FILL_ROVER_MANIFEST);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<IRoverManifest>> = {
        next(manifest: IRoverManifest) {
          commit(roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS, manifest);
          localStorage.setItem(state.activeRover, JSON.stringify(manifest));
          resolve(manifest);
        },
        error(error: unknown) {
          commit(roversMutationTypesEnum.FILL_ROVER_MANIFEST_ERROR, error);
          reject(error);
        },
      };
      const subscription: Unsubscribable = api
        .getActiveRoverManifest<IRoverManifest>(state.activeRover)
        .subscribe(observer as Observer<IRoverManifest>);
      rootState.subscriptions.push(subscription);
    });
  },
  fetchRoverManifestWithStorage({ dispatch, commit, state }): Promise<IRoverManifest | unknown> {
    const activeRoverManifestFlag =
      !localStorage.getItem(state.activeRover) &&
      (JSON.parse(localStorage.getItem(state.activeRover) as string) as IRoverManifest).photo_manifest.status ===
        'active';

    if (activeRoverManifestFlag) {
      const storageManifest = JSON.parse(localStorage.getItem(state.activeRover) as string) as IRoverManifest;
      commit(roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS, storageManifest);
      return new Promise((resolve) => resolve(storageManifest));
    }

    return dispatch('fetchRoverManifest');
  },
  fetchRoverPhotos({ commit, rootState }, data: IRoverFormData): Promise<IRoverPhoto[]> {
    commit(roversMutationTypesEnum.FILL_ROVER_IMAGES);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<IRoverPhoto[]>> = {
        next(photos) {
          commit(roversMutationTypesEnum.FILL_ROVER_IMAGES_SUCCESS, photos);
          resolve(photos);
        },
        error(error) {
          commit(roversMutationTypesEnum.FILL_ROVER_IMAGES_ERROR, error);
          reject(error);
        },
      };

      const subscription: Unsubscribable = api
        .getRoverPhotos<IRoverPhoto[]>(data)
        .subscribe(observer as Observer<IRoverPhoto[]>);
      rootState.subscriptions.push(subscription);
    });
  },
};
