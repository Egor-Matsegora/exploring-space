import UiButton from '@/components/UiButton/UiButton.vue';

import { shallowMount, Wrapper } from '@vue/test-utils';

describe('UiButton', () => {
  let wrapper: Wrapper<UiButton>;

  const mockSlotText = 'test slot text';
  const createComponent = () => (wrapper = shallowMount(UiButton, { slots: { default: mockSlotText } }));

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

  it('[UiButton] it should display slot text', () => {
    // Arrange
    createComponent();

    // Act

    // Assert
    expect(wrapper.text()).toContain(mockSlotText);
  });

  it.each`
    propName      | propValue   | expectedValue
    ${'type'}     | ${'submit'} | ${'submit'}
    ${'disabled'} | ${true}     | ${'disabled'}
  `(
    '[UiButton] it should change type and disabled attributes base on input props',
    async ({ propName, propValue, expectedValue }) => {
      // Arrange
      createComponent();

      // Act
      await wrapper.setProps({
        [propName]: propValue,
      });

      // Assert
      expect(wrapper.attributes(propName)).toBe(expectedValue);
    }
  );

  afterEach(() => {
    wrapper.destroy();
  });
});
