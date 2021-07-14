import { RootMutationTypes } from '@/store/mutations/mutation-types';
import { IRoverManifest } from '@/views/Rovers/interfaces/rover-manifest';
import dayjs from 'dayjs';

import { api } from '@/api';
import { actions } from '@/store/modules/rovers/actions';
import { TRoversState } from '@/store/modules/rovers/types';
import { roversMutationTypesEnum } from '@/store/modules/rovers/mutations/mutation-types';
import { ROVERS_MANIFEST_FIXTURE } from './../../fixtures/rovers-manifest.fixtures';
import { ROVER_IMAGES_FIXTURE } from './../../fixtures/rover-images.fixtures';
import { mockApiHelper } from '../../helpers/api.helper';
import { spyLocalStorageHelper } from '../../helpers/spy-local-storage.helper';

describe('Rovers Store Module actions', () => {
  let commit: typeof jest.fn | null;
  let dispatch: typeof jest.fn | null;

  const state: Partial<TRoversState> = {
    activeRover: 'spirit',
  };
  const MOCKED_ERROR = new Error('i am a test error');

  beforeEach(() => {
    commit = jest.fn();
    dispatch = jest.fn();
  });

  describe('[fetchRoverManifestWithStorage]', () => {
    const action = actions.fetchRoverManifestWithStorage as (a: any) => any;

    it('should take data from storage if there exists manifest ad rover status is not active', async () => {
      spyLocalStorageHelper('getItem', ROVERS_MANIFEST_FIXTURE);

      const data = await action({ commit, dispatch, state });

      expect(data).toStrictEqual(ROVERS_MANIFEST_FIXTURE);
      expect(commit).toHaveBeenCalledWith(roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS, ROVERS_MANIFEST_FIXTURE);
    });

    it('should dispatch fetch rover mainfest action if there exists manifest and rovers last updated date is not yesterday', async () => {
      const MOCK_ROVERS_MANIFEST_FIXTURE: IRoverManifest = {
        ...ROVERS_MANIFEST_FIXTURE,
      } as IRoverManifest;
      MOCK_ROVERS_MANIFEST_FIXTURE.photo_manifest.max_date = dayjs()
        .subtract(5, 'day')
        .millisecond(0)
        .second(0)
        .second(0)
        .minute(0)
        .hour(0)
        .format('YYYY_MM_DD');
      MOCK_ROVERS_MANIFEST_FIXTURE.photo_manifest.status = 'active';

      spyLocalStorageHelper('getItem', MOCK_ROVERS_MANIFEST_FIXTURE);

      await action({ commit, dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('fetchRoverManifest');
    });

    it('should dispatch fetch rover mainfest action if no manifest in storage', async () => {
      spyLocalStorageHelper('getItem');

      await action({ commit, dispatch, state });

      expect(dispatch).toHaveBeenCalledWith('fetchRoverManifest');
    });
  });

  describe('[fetchRoverManifest]', () => {
    const action = actions.fetchRoverManifest as (a: any) => any;
    const gatFakeSubscription = () => api.getActiveRoverManifest(state.activeRover as string).subscribe({} as any);

    it('should commit succes mutations', async () => {
      mockApiHelper('getActiveRoverManifest', ROVERS_MANIFEST_FIXTURE);
      const fakeSubscription = gatFakeSubscription();

      const data = await action({ commit, state });

      expect(data).toStrictEqual(ROVERS_MANIFEST_FIXTURE);
      expect(commit).toHaveBeenNthCalledWith(1, roversMutationTypesEnum.FILL_ROVER_MANIFEST);
      expect(commit).toHaveBeenNthCalledWith(
        2,
        roversMutationTypesEnum.FILL_ROVER_MANIFEST_SUCCESS,
        ROVERS_MANIFEST_FIXTURE
      );
      expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, fakeSubscription);
    });

    it('should commit succes mutations', async () => {
      mockApiHelper('getActiveRoverManifest', MOCKED_ERROR, true);
      const fakeSubscription = gatFakeSubscription();

      action({ commit, state });

      expect(commit).toHaveBeenNthCalledWith(1, roversMutationTypesEnum.FILL_ROVER_MANIFEST);
      expect(commit).toHaveBeenNthCalledWith(2, roversMutationTypesEnum.FILL_ROVER_MANIFEST_ERROR, MOCKED_ERROR);
      expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, fakeSubscription);
    });
  });

  describe('[fetchRoverPhotos]', () => {
    it.todo('should commit succes mutations');
    it.todo('should commit error mutations');
  });

  afterEach(() => {
    commit = null;
    dispatch = null;
  });
});
