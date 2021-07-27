import Vuelidate from 'vuelidate';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Observation from '@/views/Observation/Observation.vue';
import Loader from '@/components/Loader/Loader.vue';
import { TObservationState } from '@/store/modules/observation/types';
import { VueConstructor } from 'vue/types/umd';

describe('Observation view', () => {
  let wrapper: Wrapper<Vue>;
  let localVue: VueConstructor<Observation> | null;
  let mockStore: Store<any> | null;
  const mockImageData = 'test/url';
  const mockNotExistsMessage = 'test message';

  const setLoading = (loadingFlag: boolean): void => {
    (mockStore as Store<any>).state.observation.observationLoading = loadingFlag;
  };
  const setImageData = (): void => {
    (mockStore as Store<any>).state.observation.observationImageData = mockImageData;
  };
  const setNotExistsMessage = (): void => {
    (mockStore as Store<any>).state.observation.notExistsMessage = mockNotExistsMessage;
  };

  const fetchObservationImage = jest.fn();
  const createComponent = () => {
    const mockInitState: Partial<TObservationState> = {
      observationImageData: null,
      observationError: null,
      observationLoading: false,
      notExistsMessage: null,
    };
    localVue = createLocalVue();
    localVue.use(Vuelidate);

    localVue.use(Vuex);
    mockStore = new Vuex.Store({
      modules: {
        observation: {
          state: mockInitState,
          actions: { fetchObservationImage },
        },
      },
    });

    wrapper = shallowMount(Observation, {
      localVue,
      store: mockStore,
    });
  };

  beforeEach(() => createComponent());

  it('[Observation] should create', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('[Observation] should dispatch fetchObservationImage action on form submit', async () => {
    wrapper.setData({
      longtitude: 0,
      latitude: 0,
      dim: 0.2,
      date: '2000-01-01',
    });
    await wrapper.vm.$nextTick();

    wrapper.find('form').trigger('submit');

    expect(fetchObservationImage).toHaveBeenCalled();
  });

  it('[Observation] should display loader when loading flag is true', async () => {
    setLoading(true);
    await wrapper.vm.$nextTick();
    const loader = wrapper.findComponent(Loader);
    expect(loader.exists()).toBeTruthy();
    expect(loader.is(Loader)).toBeTruthy();
  });

  it('[Observation] should display image when obervation fetch is success', async () => {
    setLoading(false);
    setImageData();
    await wrapper.vm.$nextTick();

    const image = wrapper.find('img');

    expect(image.exists()).toBeTruthy();
    expect(image.attributes().src).toBe(mockImageData);
  });

  it('[Observation] should validate form', () => {
    const vuelidate = wrapper.vm.$v;
    vuelidate.$touch();
    expect(vuelidate.$error).toBeTruthy();

    wrapper.setData({
      longtitude: 10,
      latitude: 10,
      dim: 0.2,
      date: '2000-01-01',
    });
    vuelidate.$touch();
    expect(vuelidate.$error).toBeFalsy();
  });

  it('[Observation] should display not exists message', async () => {
    setNotExistsMessage();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain(mockNotExistsMessage);
  });

  afterEach(() => {
    wrapper.destroy();
    localVue = null;
    mockStore = null;
  });
});
