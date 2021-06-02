import Vue from "vue";
import Vuex from "vuex";

import { homeStore } from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    homeStore
  },
});
