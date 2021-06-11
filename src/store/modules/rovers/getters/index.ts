import { TRootState } from '@/store/types';
import { GetterTree } from 'vuex';
import { TRoversState } from '../types';

export const getters: GetterTree<TRoversState, TRootState> = {
  imageUrls(state: TRoversState): string[] {
    return state.roverPhotos.map((photo) => photo.img_src);
  },
};
