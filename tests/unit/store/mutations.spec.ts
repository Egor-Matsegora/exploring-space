import { TRootState } from '@/store/types';
import { RootMutationTypes } from '@/store/mutations/mutation-types';
import { mutations } from '@/store/mutations';
import { Subscription } from 'rxjs';

describe('Root Store Mutations', () => {
  it('[RootMutationTypes.ADD_SUBSCRIPTION] should add subscriptions to state', () => {
    const MOCK_STATE: TRootState = {
      subscriptions: [],
    };
    const MOCK_SUBSCRIPTION = new Subscription();

    mutations[RootMutationTypes.ADD_SUBSCRIPTION](MOCK_STATE, MOCK_SUBSCRIPTION);

    expect(MOCK_STATE.subscriptions.length).toBe(1);
    expect(MOCK_STATE.subscriptions[0]).toStrictEqual(MOCK_SUBSCRIPTION);
  });

  it('[RootMutationTypes.CLEAR_SUBSCRIPTIONS] should clear all subscriptions', () => {
    const MOCKED_SUBSCRIPTIONS = [];
    for (let index = 0; index < 5; index++) {
      MOCKED_SUBSCRIPTIONS.push(new Subscription());
    }

    const MOCK_STATE: TRootState = {
      subscriptions: MOCKED_SUBSCRIPTIONS,
    };

    mutations[RootMutationTypes.CLEAR_SUBSCRIPTIONS](MOCK_STATE);

    expect(MOCK_STATE.subscriptions.length).toBe(0);
  });
});
