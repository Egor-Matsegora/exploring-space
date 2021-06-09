import { MutationTree } from 'vuex';

import { TRoversState } from '../types';
import { IRoverPhoto } from '@/views/Rovers/interfaces/rover-photo';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';
import { roversMutationTypesEnum } from './mutation-types';

export const mutations: MutationTree<TRoversState> = {
  [roversMutationTypesEnum.SET_ACTIVE_ROVER](state, roverName: string) {
    state.activeRover = roverName;
  },
  [roversMutationTypesEnum.FILL_ROVER_MANIFEST](state) {
    state.manifestLoading = true;
  },
  [roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS](state, manifest: IRoverManifest) {
    state.manifestLoading = false;
    state.roverManifest = manifest;
    state.error = null;
  },
  [roversMutationTypesEnum.FILL_ROVER_MANIFEST_ERROR](state, error: unknown) {
    state.manifestLoading = false;
    state.roverManifest = null;
    state.error = error;
  },
  [roversMutationTypesEnum.FILL_ROVER_IMAGES](state) {
    state.imagesLoading = true;
  },
  [roversMutationTypesEnum.FILL_ROVER_IMAGES_SUCCESS](state, images: IRoverPhoto[]) {
    state.imagesLoading = false;
    state.roverPhotos = images;
    state.error = null;
  },
  [roversMutationTypesEnum.FILL_ROVER_IMAGES_ERROR](state, error: unknown) {
    state.imagesLoading = false;
    state.roverPhotos = [];
    state.error = error;
  },
  [roversMutationTypesEnum.SET_PAGE](state, page: number) {
    state.page = page;
  },
};
