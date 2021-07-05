import { shallowMount, Wrapper } from '@vue/test-utils';
import InputField from '@/components/InputField/InputField.vue';

fdescribe('InputField', () => {
  let wrapper: Wrapper<InputField>;

  const createComponent = () => (wrapper = shallowMount(InputField));

  const findInput = () => wrapper.find('input');

  beforeEach(() => {
    createComponent();
  });

  it('[InputField] it should created', () => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.input-field').exists()).toBeTruthy();
  });

  it('[InputField] it should add default props', () => {
    // Arrange
    // Act
    // Assert
    expect((findInput().element as HTMLInputElement).value).toBe('');
    expect(findInput().attributes('type')).toBe('text');
    expect(wrapper.find('label').text()).toContain('label');
  });

  it('[InputField] it should add unique id to input', () => {
    // Arrange
    // Act
    // Assert
    expect(findInput().attributes('id')).toBe(wrapper.vm.$data.id);
  });

  const LABEL_MOCK_PROPS = 'label mock props';
  it('[InputField] it should display label from props', async () => {
    // Arrange
    // Act
    await wrapper.setProps({
      label: LABEL_MOCK_PROPS,
    });
    // Assert
    expect(wrapper.find('label').text()).toContain(LABEL_MOCK_PROPS);
  });

  it.each`
    blockName  | selector
    ${'info'}  | ${'span'}
    ${'error'} | ${'.input-field__error'}
  `('[InputField] it should not display $blockName block by default', ({ selector }) => {
    // Arrange
    // Act
    // Assert
    expect(wrapper.find(selector).exists()).toBeFalsy();
  });

  it.each`
    propName   | propValue           | expectedValue
    ${'info'}  | ${'mock info text'} | ${'mock info text'}
    ${'error'} | ${true}             | ${'field is invalid'}
  `('[InputField] it should display $propName block from props', async ({ propName, propValue, expectedValue }) => {
    // Arrange
    // Act
    await wrapper.setProps({
      [propName]: propValue,
    });
    // Assert

    expect(wrapper.text()).toContain(expectedValue);
  });

  it.each`
    propName  | propValue
    ${'type'} | ${'number'}
    ${'min'}  | ${'1'}
    ${'max'}  | ${'10'}
  `('[InputField] it should add $propName to input from props', async ({ propName, propValue }) => {
    // Arrange
    // Act
    await wrapper.setProps({
      [propName]: propValue,
    });
    // Assert

    expect(wrapper.find('input').attributes(propName)).toBe(propValue);
  });

  it('[InputField] it should change input value base on v model data', async () => {
    // Arrange
    const MOCK_MODEL_VALUE = 'test.value';
    // Act
    await wrapper.setProps({ value: MOCK_MODEL_VALUE });
    await wrapper.find('input').setValue(MOCK_MODEL_VALUE);
    // Assert
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(MOCK_MODEL_VALUE);
    expect(wrapper.emitted().input).toStrictEqual([[MOCK_MODEL_VALUE]]);
  });

  afterEach(() => {
    wrapper.destroy();
  });
});
