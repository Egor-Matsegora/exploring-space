import { AjaxError } from 'rxjs/ajax';
import { IRoverPhoto } from '@/views/Rovers/interfaces/rover-photo';
import { Observer, Unsubscribable } from 'rxjs';
import { ActionTree } from 'vuex';
import dayjs from 'dayjs';

import { api } from '@/api';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';
import { IRoverFormData } from '@/views/Rovers/interfaces/rover-form-data';
import { roversMutationTypesEnum } from '../mutations/mutation-types';
import { TRootState } from '@/store/types';
import { TRoversState } from '../types';
import { IRoverPhotosResponse } from '@/views/Rovers/interfaces/rover-photos-response';
import { RootMutationTypes } from '@/store/mutations/mutation-types';

export const actions: ActionTree<TRoversState, TRootState> = {
  fetchRoverManifest({ commit, state }): Promise<IRoverManifest | unknown> {
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
      commit(RootMutationTypes.ADD_SUBSCRIPTION, subscription);
    });
  },

  fetchRoverManifestWithStorage({ dispatch, commit, state }): Promise<IRoverManifest | unknown> {
    const prevDate = dayjs().subtract(1, 'day').millisecond(0).second(0).second(0).minute(0).hour(0).valueOf();

    const activeRoverManifestFlag =
      localStorage.getItem(state.activeRover) &&
      ((JSON.parse(localStorage.getItem(state.activeRover) as string) as IRoverManifest).photo_manifest.status !==
        'active' ||
        dayjs(
          (JSON.parse(localStorage.getItem(state.activeRover) as string) as IRoverManifest).photo_manifest.max_date
        ).valueOf() === prevDate);

    if (activeRoverManifestFlag) {
      const storageManifest = JSON.parse(localStorage.getItem(state.activeRover) as string) as IRoverManifest;
      commit(roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS, storageManifest);
      return new Promise((resolve) => resolve(storageManifest));
    }

    return dispatch('fetchRoverManifest');
  },

  fetchRoverPhotos({ commit }, data: IRoverFormData): Promise<IRoverPhoto[]> {
    commit(roversMutationTypesEnum.FILL_ROVER_IMAGES);

    return new Promise((resolve, reject) => {
      const observer: Partial<Observer<IRoverPhotosResponse>> = {
        next(photos) {
          commit(roversMutationTypesEnum.FILL_ROVER_IMAGES_SUCCESS, photos.photos);
          resolve(photos.photos);
        },
        error(error: AjaxError) {
          commit(roversMutationTypesEnum.FILL_ROVER_IMAGES_ERROR, error);
          reject(error);
        },
      };

      const subscription: Unsubscribable = api
        .getRoverPhotos<IRoverPhotosResponse>(data)
        .subscribe(observer as Observer<IRoverPhotosResponse>);
      commit(RootMutationTypes.ADD_SUBSCRIPTION, subscription);
    });
  },

  setActiveRover({ commit }, rover: string) {
    commit(roversMutationTypesEnum.SET_ACTIVE_ROVER, rover);
  },
};
