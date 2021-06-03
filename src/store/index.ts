import Vue from "vue";
import Vuex from "vuex";

import { home } from './modules/home';
import { observation } from './modules/observation';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    observation
  },
});
