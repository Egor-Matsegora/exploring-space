import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { routes } from '@/router';
import Home from '@/views/Home/Home.vue';
import Loader from '@/components/Loader/Loader.vue';
import { MOCK_MAIN_SLIDER_DATA } from '../fixtures/main-slider-data.fixtures';

describe('HomeView', () => {
  let wrapper: Wrapper<Vue>;
  let mockRouter: Router | null;
  let mockStore: Store<any> | null;

  const setSliderLoading = (loadingFlag: boolean) =>
    ((mockStore as Store<any>).state.home.mainSliderLoading = loadingFlag);
  const setSwiperData = () => ((mockStore as Store<any>).state.home.mainSliderData = MOCK_MAIN_SLIDER_DATA);

  const fetchMainSliderDataWithStorage = jest.fn();
  const fetchMainSliderData = jest.fn();

  const createComponent = () => {
    const localVue = createLocalVue();

    localVue.use(Router);
    mockRouter = new Router({ routes: cloneDeep(routes) });

    localVue.use(Vuex);
    mockStore = new Vuex.Store({
      modules: {
        home: {
          actions: {
            fetchMainSliderDataWithStorage,
            fetchMainSliderData,
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

  it('[Home] should dispatch fetchMainSliderDataWithStorage action in created hoock', () => {
    expect(fetchMainSliderDataWithStorage).toHaveBeenCalled();
  });

  it('[Home] should dispatch fetchMainSliderData on see another images button', () => {
    const button = wrapper
      .findAll('button')
      .wrappers.find((btn) => btn.text().toLowerCase().includes('see another images')) as Wrapper<Vue>;

    button.trigger('click');

    expect(fetchMainSliderData).toHaveBeenCalled();
  });

  it('[Home] should render loading on main slider data loading', async () => {
    setSliderLoading(true);
    await wrapper.vm.$nextTick();

    const loader = wrapper.findComponent(Loader);

    expect(loader.exists()).toBeTruthy();
    expect(loader.is(Loader)).toBeTruthy();
  });

  it('[Home] should render slider when slider data not empty and slider loading are false', async () => {
    setSwiperData();

    await wrapper.vm.$nextTick();

    const swiper = wrapper.findComponent(Swiper);
    const slides = wrapper.findAllComponents(SwiperSlide).wrappers;

    expect(swiper.exists()).toBeTruthy();
    expect(slides.length).toBe(MOCK_MAIN_SLIDER_DATA.length);
    expect(slides[0].text()).toContain(MOCK_MAIN_SLIDER_DATA[0].title);
  });

  it('[home] should start and stop slider autoplay in interval when loading is changed', async () => {
    const startSliderInterval = jest.fn();
    const clearSliderInterval = jest.fn();

    wrapper.setMethods({ startSliderInterval, clearSliderInterval });

    setSliderLoading(true);
    await wrapper.vm.$nextTick();
    expect(clearSliderInterval).toHaveBeenCalled();

    setSliderLoading(false);
    await wrapper.vm.$nextTick();

    expect(startSliderInterval).toHaveBeenCalled();
  });

  afterEach(() => {
    wrapper.destroy();
    mockRouter = null;
    mockStore = null;
  });
});
