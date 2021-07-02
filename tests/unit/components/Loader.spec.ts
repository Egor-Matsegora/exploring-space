import Loader from '@/components/Loader/Loader.vue';

import { shallowMount, Wrapper } from '@vue/test-utils';

describe('Logo', () => {
  let wrapper: Wrapper<Loader>;

  const createComponent = () => (wrapper = shallowMount(Loader));

  it('[Loader] it should created', () => {
    // Arrange
    createComponent();

    // Act

    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.loader').exists()).toBeTruthy();
  });

  afterEach(() => {
    wrapper.destroy();
  });
});
