import { Module } from 'vuex';

import { RoversEnum } from '@/views/Rovers/enums/rovers-enum';
import { TRootState } from '@/store/types';
import { TRoversState } from './types';
import { actions } from './actions';
import { mutations } from './mutations';

export const rovers: Module<TRoversState, TRootState> = {
  state: {
    manifestLoading: false,
    imagesLoading: false,
    roverPhotos: [],
    roverManifest: null,
    error: null,
    activeRover: RoversEnum.CURLIOSITY,
    page: 1,
  },
  actions,
  mutations,
};
