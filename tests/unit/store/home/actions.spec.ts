import dayjs from 'dayjs';
import { api } from '@/api';
import { actions } from '@/store/modules/home/actions';
import { homeStoreMutationTypes } from '@/store/modules/home/mutations/mutation-types';
import { RootMutationTypes } from '@/store/mutations/mutation-types';
import { TRootState } from '@/store/types/index';
import { MOCK_MAIN_SLIDER_DATA } from '../../fixtures/main-slider-data.fixtures';
import { mockApiHelper } from '../../helpers/api.helper';
import { spyLocalStorageHelper } from '../../helpers/spy-local-storage.helper';

describe('Home Store module actions', () => {
  describe('[Home Store fetchMainSliderDataWithStorage]', () => {
    let action: (a: any) => any;
    let commit: typeof jest.fn;
    let dispatch: typeof jest.fn;

    beforeEach(() => {
      action = actions.fetchMainSliderDataWithStorage as any;
      commit = jest.fn();
      dispatch = jest.fn();
    });

    it('should commit homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS mutation if localstorage has mai slider data for current date', async () => {
      spyLocalStorageHelper('getItem', MOCK_MAIN_SLIDER_DATA);

      const data = await action({ commit, dispatch });

      expect(data).toStrictEqual(MOCK_MAIN_SLIDER_DATA);
      expect(commit).toHaveBeenCalledWith(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, data);
    });

    it(`[Home Store fetchMainSliderDataWithStorage]
      should dispatch fetchMainSliderData action and clear storage if localstorage has no main slider data for current date`, async () => {
      spyLocalStorageHelper('getItem');
      spyLocalStorageHelper('clear');
      jest.spyOn(dayjs(), 'format').mockReturnValue('');

      await action({ commit, dispatch });

      expect(localStorage.clear).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith('fetchMainSliderData', dayjs().format('YYYY-MM-DD'));
    });
  });

  describe('[Home Store fetchMainSliderData]', () => {
    let rootState: TRootState;
    let action: (a: any) => any;
    let commit: typeof jest.fn;

    const getFakeSubscription = () => api.getDataForMainSlider().subscribe({} as any);

    beforeEach(() => {
      commit = jest.fn();
      rootState = { subscriptions: [] };
      action = actions.fetchMainSliderData as any;
    });

    it('should commit mutations for main slider data succes', async () => {
      mockApiHelper('getDataForMainSlider', MOCK_MAIN_SLIDER_DATA);
      spyLocalStorageHelper('setItem');
      const MOCK_SUBSCRIPTION = getFakeSubscription();

      const data = await action({ commit, rootState });

      expect(localStorage.setItem).toHaveBeenCalledWith(
        dayjs().format('YYYY-MM-DD'),
        JSON.stringify(MOCK_MAIN_SLIDER_DATA)
      );
      expect(data).toStrictEqual(MOCK_MAIN_SLIDER_DATA);
      expect(commit).toHaveBeenNthCalledWith(1, homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);
      expect(commit).toHaveBeenNthCalledWith(
        2,
        homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS,
        MOCK_MAIN_SLIDER_DATA
      );
      expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, MOCK_SUBSCRIPTION);
    });

    it('should commit mutations for main slider data error', async () => {
      const MOCKED_ERROR = new Error('it is a mocked error');
      mockApiHelper('getDataForMainSlider', MOCKED_ERROR, true);
      spyLocalStorageHelper('setItem');
      const MOCK_SUBSCRIPTION = getFakeSubscription();

      try {
        await action({ commit, rootState });

        expect(localStorage.setItem).not.toHaveBeenCalled();
      } catch (error) {
        expect(commit).toHaveBeenNthCalledWith(1, homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);
        expect(commit).toHaveBeenNthCalledWith(2, homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR, MOCKED_ERROR);
        expect(commit).toHaveBeenNthCalledWith(3, RootMutationTypes.ADD_SUBSCRIPTION, MOCK_SUBSCRIPTION);
      }
    });
  });
});
