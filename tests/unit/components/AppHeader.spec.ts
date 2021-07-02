import { shallowMount, Wrapper } from '@vue/test-utils';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import Logo from '@/components/Logo/Logo.vue';
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';

describe('AppHeader', () => {
  let wrapper: Wrapper<AppHeader>;

  const createComponent = () => (wrapper = shallowMount(AppHeader));

  it('[AppHeader] it should created', () => {
    // Arrange
    createComponent();

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
    createComponent();

    // Act

    // Assert
    expect(wrapper.find(`${componentTagName}-stub`).is(componentInstance)).toBeTruthy();
  });
});
