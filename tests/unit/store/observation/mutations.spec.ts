import { TObservationState } from '@/store/modules/observation/types';
import { mutations } from '@/store/modules/observation/mutations';
import { observationMutationTypes } from '@/store/modules/observation/mutations/mutation-types';

describe('Observation store module mutations', () => {
  const initialState: TObservationState = {
    observationLoading: false,
    observationImageData: null,
    observationError: null,
    notExistsMessage: null,
  };

  const MOCK_OBSERVATION_IMAGE_DATA = 'test/url/for/mocked/imaage';
  const MOCK_ERROR_MESSAGE = 'its a mock error message';

  const setStateConfig = (stateConfig: Partial<TObservationState>): TObservationState => ({
    ...initialState,
    ...stateConfig,
  });

  it('[observationMutationTypes.FETCH_OBSERVATION_IMAGE] should change state loading and reset image data and not exists message', () => {
    const MOCK_STATE_WITHDATA_AND_ERROR: TObservationState = setStateConfig({
      observationImageData: MOCK_OBSERVATION_IMAGE_DATA,
      notExistsMessage: MOCK_ERROR_MESSAGE,
    });

    mutations[observationMutationTypes.FETCH_OBSERVATION_IMAGE](MOCK_STATE_WITHDATA_AND_ERROR);

    expect(MOCK_STATE_WITHDATA_AND_ERROR.observationLoading).toBeTruthy();
    expect(MOCK_STATE_WITHDATA_AND_ERROR.notExistsMessage).toBeNull();
    expect(MOCK_STATE_WITHDATA_AND_ERROR.observationImageData).toBeNull();
  });

  it('[observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS] should add observation image data to state  and reset loading and not exists message', () => {
    const MOCK_STATE_WITH_ERROR_AND_LOADING: TObservationState = setStateConfig({
      notExistsMessage: MOCK_ERROR_MESSAGE,
      observationLoading: true,
    });

    mutations[observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS](
      MOCK_STATE_WITH_ERROR_AND_LOADING,
      MOCK_OBSERVATION_IMAGE_DATA
    );

    expect(MOCK_STATE_WITH_ERROR_AND_LOADING.observationLoading).toBeFalsy();
    expect(MOCK_STATE_WITH_ERROR_AND_LOADING.observationImageData).toBe(MOCK_OBSERVATION_IMAGE_DATA);
    expect(MOCK_STATE_WITH_ERROR_AND_LOADING.notExistsMessage).toBeNull();
  });

  it('[observationMutationTypes.FETCH_OBSERVATION_IMAGE_ERROR] should add observation not exists to state and reset loading and image data', () => {
    const MOCK_STATE_WITH_IMAGE_AND_LOADING: TObservationState = setStateConfig({
      observationImageData: MOCK_OBSERVATION_IMAGE_DATA,
      observationLoading: true,
    });

    mutations[observationMutationTypes.FETCH_OBSERVATION_IMAGE_ERROR](
      MOCK_STATE_WITH_IMAGE_AND_LOADING,
      MOCK_ERROR_MESSAGE
    );

    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.observationLoading).toBeFalsy();
    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.observationImageData).toBeNull();
    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.notExistsMessage).toBe(MOCK_ERROR_MESSAGE);
  });

  it('[observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXISTS] should add observation not exists to state and reset loading and image data', () => {
    const MOCK_STATE_WITH_IMAGE_AND_LOADING: TObservationState = setStateConfig({
      observationImageData: MOCK_OBSERVATION_IMAGE_DATA,
      observationLoading: true,
    });

    mutations[observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST](
      MOCK_STATE_WITH_IMAGE_AND_LOADING,
      MOCK_ERROR_MESSAGE
    );

    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.observationLoading).toBeFalsy();
    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.observationImageData).toBeNull();
    expect(MOCK_STATE_WITH_IMAGE_AND_LOADING.notExistsMessage).toBe(MOCK_ERROR_MESSAGE);
  });
});
