import { shallowMount, Wrapper } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import Logo from '@/components/Logo/Logo.vue';
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';

describe('AppHeader', () => {
  let wrapper: Wrapper<Vue>;

  const createComponent = () => (wrapper = shallowMount(AppHeader));

  beforeEach(() => createComponent());

  it('[AppHeader] it should created', () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('header').exists()).toBeTruthy();
  });

  it.each`
    componentTagName | componentInstance
    ${'logo'}        | ${Logo}
    ${'header-nav'}  | ${HeaderNav}
  `('[AppHeader] it should render components', ({ componentTagName, componentInstance }) => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.findComponent(componentInstance).is(componentInstance)).toBeTruthy();
  });

  afterEach(() => wrapper.destroy());
});
