import UiButton from '@/components/UiButton/UiButton.vue';

import { shallowMount, Wrapper } from '@vue/test-utils';

describe('UiButton', () => {
  let wrapper: Wrapper<UiButton>;

  const createComponent = () => (wrapper = shallowMount(UiButton));

  it('[UiButton] it should created', () => {
    // Arrange
    createComponent();

    // Act

    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('[UiButton] it should have button type by default', () => {
    // Arrange
    createComponent();

    // Act

    // Assert
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('[UiButton] it should change type and disabled attributes base on input props', () => {
    // Arrange
    createComponent();

    // Act
    (
      wrapper.setProps({
        type: 'submit',
        disabled: true,
      }) as Promise<void>
    ).then(() => {
      // Assert
      expect(wrapper.attributes('disabled')).toBeTruthy();
      expect(wrapper.attributes('type')).toBe('submit');
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });
});
