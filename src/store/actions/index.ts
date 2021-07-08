import { RootMutationTypes } from './../mutations/mutation-types';
import { Unsubscribable } from 'rxjs';
import { TRootState } from './../types';
import { ActionTree } from 'vuex';

export const actions: ActionTree<TRootState, TRootState> = {
  unsubscribeAll({ state, commit }) {
    state.subscriptions.forEach((subscription: Unsubscribable) => subscription.unsubscribe());
    commit(RootMutationTypes.CLEAR_SUBSCRIPTIONS);
  },
};
