import Logo from '@/components/Logo/Logo.vue';

import { shallowMount, Wrapper } from '@vue/test-utils';

describe('Logo', () => {
  let wrapper: Wrapper<Vue>;

  const createComponent = () => (wrapper = shallowMount(Logo));

  it('[Logo] it should created', () => {
    // Arrange
    createComponent();

    // Act

    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.app-logo').exists()).toBeTruthy();
  });

  afterEach(() => {
    wrapper.destroy();
  });
});
