import UiButton from '@/components/UiButton/UiButton.vue';
import Loader from '@/components/Loader/Loader.vue';
import { CamerasEnum } from '@/views/Rovers/enums/cameras-enum';
import Vuelidate from 'vuelidate';
import { ROVERS_MANIFEST_FIXTURE } from './../fixtures/rovers-manifest.fixtures';
import Vuex, { Store } from 'vuex';
import RoversForm from '@/views/Rovers/components/RoversForm/RoversForm.vue';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import { VueConstructor } from 'vue/types/umd';

describe('RoversForm view', () => {
  let wrapper: Wrapper<Vue>;
  let mockStore: Store<any>;
  let localVue: VueConstructor<any>;

  const fetchRoverPhotos = jest.fn();
  const fetchRoverManifestWithStorage = jest.fn();
  const setManifestLoading = (loadingFlag: boolean) => {
    mockStore.state.rovers.manifestLoading = loadingFlag;
  };
  const setImagesLoading = (loadingFlag: boolean) => {
    mockStore.state.rovers.imagesLoading = loadingFlag;
  };

  const createComponent = () => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Vuelidate);
    mockStore = new Vuex.Store({
      modules: {
        rovers: {
          state: {
            manifestLoading: false,
            imagesLoading: false,
            roverManifest: ROVERS_MANIFEST_FIXTURE,
            activeRover: 'curiosity',
          },
          actions: {
            fetchRoverPhotos,
            fetchRoverManifestWithStorage,
          },
        },
      },
    });
    wrapper = shallowMount(RoversForm, {
      localVue,
      store: mockStore,
    });
  };

  beforeEach(() => createComponent());

  it('[RoversForm] should create', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('[RoversForm] should dispatch fetchRoverManifestWithStorage on mount', () => {
    expect(fetchRoverManifestWithStorage).toHaveBeenCalled();
  });

  it('[RoversForm] should dispatch fetchRoverPhotos action on form submit', async () => {
    wrapper.setData({
      date: '2000-01-01',
      camera: CamerasEnum.CHEMISTRY_AND_CAMERA_COMPLEX,
    });
    wrapper.find('form').trigger('submit');
    await wrapper.vm.$nextTick();
    expect(fetchRoverPhotos).toHaveBeenCalled();
  });

  it('[RoversForm] should display loader when manifest loading is true', async () => {
    const findLoader = () => wrapper.findComponent(Loader);
    expect(findLoader().exists()).toBeFalsy();
    setManifestLoading(true);
    await wrapper.vm.$nextTick();
    expect(findLoader().exists()).toBeTruthy();
    expect(findLoader().is(Loader)).toBeTruthy();
  });

  it('[RoversForm] should disabled submit button when photos loading is true', async () => {
    const findButtonDisabledAttr = () => wrapper.findComponent(UiButton).attributes().disabled;

    expect(findButtonDisabledAttr()).toBeFalsy();

    setImagesLoading(true);
    await wrapper.vm.$nextTick();

    expect(findButtonDisabledAttr()).toBeTruthy();
  });

  it('[RoversForm] should display rovers form if manifest loading is false and manifest data not empty', async () => {
    const roversForm = () => wrapper.find('form');
    expect(roversForm().exists()).toBeTruthy();

    setManifestLoading(true);

    await wrapper.vm.$nextTick();

    expect(roversForm().exists()).toBeFalsy();
  });

  it.todo('[RoversForm] should reset form on before route update');
  it.todo('[RoversForm] should dispatch fetchRoverManifestWithStorage action on before route update');

  afterEach(() => wrapper.destroy());
});
