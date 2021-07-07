import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { Subscription, Unsubscribable } from 'rxjs';
import { TRootState } from '@/store/types';
import { actions } from '@/store/actions';

describe('Root Store actions', () => {
  it('[Root Store actions unsubscribeAll] should unsubscribe for all subscriptions', () => {
    createLocalVue().use(Vuex);

    const INITIAL_ROOT_STATE: TRootState = {
      subscriptions: [new Subscription() as Unsubscribable],
    };
    const store = new Vuex.Store({
      actions,
      state: INITIAL_ROOT_STATE,
    });

    const subscriptionsForSpy = [];

    for (let i = 0; i < INITIAL_ROOT_STATE.subscriptions.length; i++) {
      const subscriptionForSpy = INITIAL_ROOT_STATE.subscriptions[i];
      subscriptionsForSpy.push(subscriptionForSpy);

      jest.spyOn(subscriptionsForSpy[i], 'unsubscribe');
    }

    store.dispatch('unsubscribeAll');

    expect(store.state.subscriptions.length).toBe(0);

    subscriptionsForSpy.forEach((sub, index, array) => {
      expect(array[index].unsubscribe).toHaveBeenCalled();
    });
  });
});
