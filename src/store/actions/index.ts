import { Unsubscribable } from 'rxjs';
import { TRootState } from './../types';
import { ActionTree } from 'vuex';

export const actions: ActionTree<TRootState, TRootState> = {
  unsubscribeAll({ state }) {
    state.subscriptions.forEach((subscription: Unsubscribable) => subscription.unsubscribe());
    state.subscriptions.length = 0;
  },
};
