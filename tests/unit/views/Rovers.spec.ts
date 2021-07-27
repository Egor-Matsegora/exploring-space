import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import Router, { Route } from 'vue-router';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';
import { Wrapper, createLocalVue, shallowMount } from '@vue/test-utils';
import Rovers from '@/views/Rovers/Rovers.vue';
import { routes } from '@/router';

describe('Rovers view', () => {
  let wrapper: Wrapper<Vue>;
  let mockStore: Store<any> | null;
  let mockRouter: Router | null;
  let localVue: VueConstructor<any> | null;

  const setActiveRover = jest.fn();

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Router);
    mockRouter = new Router({ routes: cloneDeep(routes) });
    localVue.use(Vuex);
    mockStore = new Vuex.Store({
      modules: {
        rovers: {
          actions: { setActiveRover },
        },
      },
    });

    wrapper = shallowMount(Rovers, {
      localVue,
      store: mockStore,
      router: mockRouter,
    });
  });

  it('[Rovers] should create', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  // как по мне дичайшая костыляка
  it('[Rovers] should dispatch set active rover actionon routes change', () => {
    const mockRover = 'test-rover';
    const beforeRouteUpdate = (wrapper.vm.$options.beforeRouteUpdate as any)[0] as (a: any, b: any, c: any) => void;

    beforeRouteUpdate.call({ setActiveRover }, { params: { rover: mockRover } } as any, {} as any, jest.fn());

    expect(setActiveRover).toHaveBeenCalledWith(mockRover);
  });

  afterEach(() => {
    wrapper.destroy();
    localVue = null;
    mockRouter = null;
    mockStore = null;
  });
});
