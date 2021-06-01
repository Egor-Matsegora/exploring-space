import { IMainSliderData } from '@/views/Home/interfaces/IMainSliderData';
import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    mainSliderData: [],
  },
  mutations: {},
  actions: {
    setMainSliderData({ commit }, data: IMainSliderData[] | IMainSliderData) {

    }
  },
});