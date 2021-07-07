import { Unsubscribable } from 'rxjs';
import Vue from 'vue';
import Vuex from 'vuex';

import { home } from './modules/home';
import { observation } from './modules/observation';
import { rovers } from './modules/rovers';
import { actions } from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    subscriptions: [] as Unsubscribable[],
  },
  actions,
  mutations: {},
  modules: {
    home,
    observation,
    rovers,
  },
});
