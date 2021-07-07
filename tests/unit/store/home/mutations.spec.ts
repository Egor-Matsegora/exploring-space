import { mutations } from '@/store/modules/home/mutations';
import { homeStoreMutationTypes } from '@/store/modules/home/mutations/mutation-types';
import { THomeState } from '@/store/modules/home/types';
import { MOCK_MAIN_SLIDER_DATA } from '../../fixtures/main-slider-data.fixtures';

describe('Home store module mutations', () => {
  let initialState: THomeState;

  const MOCK_ERROR = new Error('this is a mock error');

  beforeEach(
    () =>
      (initialState = {
        mainSliderLoading: false,
        mainSliderData: [],
        error: null,
      })
  );

  it('[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER] should mutate loading flag in state', () => {
    mutations[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER](initialState);

    expect(initialState.mainSliderLoading).toBeTruthy();
  });

  it('[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS] should add slider data to state', () => {
    const MOCK_DATA = MOCK_MAIN_SLIDER_DATA;
    const MOCK_STATE_WITH_ERROR = {
      ...initialState,
      error: MOCK_ERROR,
    };

    mutations[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS](initialState, MOCK_DATA);

    expect(initialState.mainSliderLoading).toBeFalsy();
    expect(initialState.mainSliderData).toBe(MOCK_DATA);
    expect(initialState.error).toBeNull();
  });

  it('[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR]', () => {
    mutations[homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR](initialState, MOCK_ERROR);

    expect(initialState.mainSliderLoading).toBeFalsy();
    expect(initialState.error).toBe(MOCK_ERROR);
  });
});
