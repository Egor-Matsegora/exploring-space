import { api } from '@/api';
import { RootMutationTypes } from '@/store/mutations/mutation-types';
import { actions } from '@/store/modules/observation/actions';
import { observationMutationTypes } from '@/store/modules/observation/mutations/mutation-types';
import { IObservationImageFormData } from '@/views/Observation/interfaces/ObservationImageFormDataInterface';
import { mockApiHelper } from '../../helpers/api.helper';

describe('Observation Store Module Actions', () => {
  const action = actions.fetchObservationImage as (a: any, data: IObservationImageFormData) => Promise<string>;
  const MOCKED_FORM_DATA: IObservationImageFormData = {
    latitude: 0,
    longtitude: 0,
    dim: 0,
    date: '2020-20-12',
  };

  let commit: typeof jest.fn | null;

  beforeEach(() => (commit = jest.fn()));

  it('[fetchObservationImage] should commit fetch observation image success mutations an add subscription to root state', async () => {
    const MOCKED_URL = 'mocked/url';
    mockApiHelper('getObservationImageData', { request: { url: MOCKED_URL } });
    const FAKE_SUBSCRIPTION = api.getObservationImageData(MOCKED_FORM_DATA).subscribe({} as any);

    await action({ commit }, MOCKED_FORM_DATA);

    expect(commit).toHaveBeenNthCalledWith(1, observationMutationTypes.FETCH_OBSERVATION_IMAGE);
    expect(commit).toHaveBeenNthCalledWith(2, observationMutationTypes.FETCH_OBSERVATION_IMAGE_SUCCESS, MOCKED_URL);
    expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, FAKE_SUBSCRIPTION);
  });

  it('[fetchObservationImage] should commit fetch observation image error mutations an add subscription to root state', async () => {
    const MOCKED_ERROR = 'test error message';
    mockApiHelper('getObservationImageData', { response: { msg: MOCKED_ERROR } }, true);
    const FAKE_SUBSCRIPTION = api.getObservationImageData(MOCKED_FORM_DATA).subscribe({} as any);

    await action({ commit }, MOCKED_FORM_DATA);

    expect(commit).toHaveBeenNthCalledWith(1, observationMutationTypes.FETCH_OBSERVATION_IMAGE);
    expect(commit).toHaveBeenNthCalledWith(2, observationMutationTypes.FETCH_OBSERVATION_IMAGE_NOT_EXIST, MOCKED_ERROR);
    expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, FAKE_SUBSCRIPTION);
  });

  afterEach(() => (commit = null));
});
