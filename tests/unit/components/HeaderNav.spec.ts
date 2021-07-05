import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';

import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';
import { rovers } from '@/store/modules/rovers';
import { routes } from '@/router';

describe('HeaderNav', () => {
  let wrapper: Wrapper<HeaderNav>;
  let store: Store<{ [key: string]: any }> | null;
  let router: Router | null;

  const createComponent = () => {
    const localVue = createLocalVue();

    localVue.use(Router);
    router = new Router({ routes });

    localVue.use(Vuex);
    store = new Vuex.Store({ modules: { rovers: cloneDeep(rovers) } });

    wrapper = shallowMount(HeaderNav, {
      localVue,
      router,
      store,
    });
  };

  beforeEach(() => createComponent());

  it('[HeaderNav] should be created', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('nav').exists()).toBeTruthy();
  });

  it('[HeaderNav] should display links', () => {
    const linksArray = wrapper.findAll('li');
    expect(linksArray.length).toBe(3);
  });

  it('[HeaderNav] should have params of active rover in rovers link', () => {
    const roversLink = (): Wrapper<any> =>
      wrapper.findAll('[to]').wrappers.find((wrapper) => wrapper.text() === 'Mars Rovers') as any;
    const { activeRover } = store?.state.rovers;
    expect(roversLink().props().to.params.rover).toBe(activeRover);
  });

  it('[HeaderNav] should change isMenuOpen flag on menu button click', async () => {
    const menuBtn = () => wrapper.find('.app-nav__menu-btn');
    await menuBtn().trigger('click');
    expect(wrapper.vm.$data.isMenuOpen).toBeTruthy();
    expect(menuBtn().classes()).toContain('app-nav__menu-btn--open');
    expect(wrapper.find('ul').classes()).toContain('app-nav__list--open');
  });

  afterEach(() => {
    wrapper.destroy();
    store = null;
    router = null;
  });
});
