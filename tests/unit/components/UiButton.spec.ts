import UiButton from '@/components/UiButton/UiButton.vue';

import { shallowMount, Wrapper } from '@vue/test-utils';

describe('UiButton', () => {
  let wrapper: Wrapper<Vue>;

  const mockSlotText = 'test slot text';
  const createComponent = () => (wrapper = shallowMount(UiButton, { slots: { default: mockSlotText } }));

  beforeEach(() => createComponent());

  it('[UiButton] it should created', () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('[UiButton] it should have button type by default', () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('[UiButton] it should display slot text', () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.text()).toContain(mockSlotText);
  });

  it.each`
    propName      | propValue   | expectedValue
    ${'type'}     | ${'submit'} | ${'submit'}
    ${'disabled'} | ${true}     | ${'disabled'}
  `(
    '[UiButton] it should change $propName attribute base on input props',
    async ({ propName, propValue, expectedValue }) => {
      // Arrange
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
