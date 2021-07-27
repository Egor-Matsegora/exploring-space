import Router from 'vue-router';
import RoversNav from '@/views/Rovers/components/RoversNav/RoversNav.vue';
import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils';
import { RoversEnum } from '@/views/Rovers/enums/rovers-enum';

describe('RoversNav component', () => {
  let wrapper: Wrapper<Vue>;
  const createComponent = () => {
    const localVue = createLocalVue();
    localVue.use(Router);
    const router = new Router({ routes: [] });
    wrapper = shallowMount(RoversNav, { localVue, router });
  };

  beforeEach(() => {
    createComponent();
  });

  it('[RoversNav] should create', () => expect(wrapper.exists()).toBeTruthy());

  it('[RoversNav] should display rovers', () => {
    Object.values(RoversEnum).forEach((val) => expect(wrapper.text()).toContain(val));
  });

  afterEach(() => wrapper.destroy());
});
