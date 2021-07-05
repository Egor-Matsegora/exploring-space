import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';

import { routes } from '@/router';
import Home from '@/views/Home/Home.vue';

describe('HomeView', () => {
  let wrapper: Wrapper<Vue>;
  let mockRouter: Router | null;
  let mockStore: Store<any> | null;

  const createComponent = () => {
    const localVue = createLocalVue();

    localVue.use(Router);
    mockRouter = new Router({ routes: cloneDeep(routes) });

    localVue.use(Vuex);
    mockStore = new Vuex.Store({
      modules: {
        home: {
          actions: {
            fetchMainSliderDataWithStorage: jest.fn(),
            fetchMainSliderData: jest.fn(),
          },
          state: {
            mainSliderData: [],
            mainSliderLoading: false,
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      localVue,
      router: mockRouter,
      store: mockStore,
    });
  };

  beforeEach(() => createComponent());

  it('[Home] should create', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  afterEach(() => {
    wrapper.destroy();
    mockRouter = null;
    mockStore = null;
  });
});
