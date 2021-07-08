import { Unsubscribable } from 'rxjs';
import { RootMutationTypes } from './mutation-types';
import { TRootState } from '@/store/types';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<TRootState> = {
  [RootMutationTypes.ADD_SUBSCRIPTION](state: TRootState, subscription: Unsubscribable) {
    state.subscriptions.push(subscription);
  },
  [RootMutationTypes.CLEAR_SUBSCRIPTIONS](state: TRootState) {
    state.subscriptions.length = 0;
  },
};
