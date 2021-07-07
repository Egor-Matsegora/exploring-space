import { of, throwError } from 'rxjs';
import dayjs from 'dayjs';
import { api } from '@/api';
import { actions } from '@/store/modules/home/actions';
import { homeStoreMutationTypes } from '@/store/modules/home/mutations/mutation-types';
import { TRootState } from '@/store/types/index';
import { MOCK_MAIN_SLIDER_DATA } from '../../fixtures/main-slider-data.fixtures';

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
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(MOCK_MAIN_SLIDER_DATA));

      const data = await action({ commit, dispatch });

      expect(data).toStrictEqual(MOCK_MAIN_SLIDER_DATA);
      expect(commit).toHaveBeenCalledWith(homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_SUCCESS, data);
    });

    it(`[Home Store fetchMainSliderDataWithStorage]
      should dispatch fetchMainSliderData action and clear storage if localstorage has no main slider data for current date`, async () => {
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
      jest.spyOn(window.localStorage.__proto__, 'clear');
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

    beforeEach(() => {
      commit = jest.fn();
      rootState = { subscriptions: [] };
      action = actions.fetchMainSliderData as any;
    });

    it('should commit mutations for main slider data succes', async () => {
      jest.spyOn(api, 'getDataForMainSlider').mockReturnValue(of(MOCK_MAIN_SLIDER_DATA));
      jest.spyOn(window.localStorage.__proto__, 'setItem');

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
    });

    it('should commit mutations for main slider data error', async () => {
      const MOCKED_ERROR = new Error('it is a mocked error');
      jest.spyOn(api, 'getDataForMainSlider').mockReturnValue(throwError(() => MOCKED_ERROR));
      jest.spyOn(window.localStorage.__proto__, 'setItem');

      try {
        await action({ commit, rootState });

        expect(localStorage.setItem).not.toHaveBeenCalled();
      } catch (error) {
        expect(commit).toHaveBeenNthCalledWith(1, homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER);
        expect(commit).toHaveBeenNthCalledWith(2, homeStoreMutationTypes.GET_DATA_FOR_MAIN_SLIDER_ERROR, MOCKED_ERROR);
      }
    });
  });
});
