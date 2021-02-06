import browser from '../browser';
import { getCustomProp } from '../core/utils/customProp';

const { start } = browser;

// Reset to clean, uninitialized template
const reset = () => {
  document.body.innerHTML = `
    <div l-state="{ foo: 'bar' }">
      <p l-text="foo"></p>
    </div>
  `;
};

// Does overall checks on whether it is a component or not
const validateComponentFunctionality = (error = false) => {
  const componentElement = document.querySelector('body > div') as HTMLElement;
  const componentText = componentElement.querySelector('p') as HTMLElement;
  const component = getCustomProp(componentElement, '__l');

  if (error) {
    expect(component).toBeUndefined();
  } else {
    expect(component).toBeDefined();
    expect(component.state).toEqual({ foo: 'bar' });
    expect(componentText.innerHTML).toEqual('bar');
  }
};

reset();

describe('.browser', () => {
  it('should initialize component on document load', () => {
    document.addEventListener('DOMContentLoaded', () => {
      validateComponentFunctionality();
    });
  });

  it('should initialize for turbolinks:load and turbo:load events', (done) => {
    reset();
    start();
    const turbolinksLoad = new CustomEvent('turbolinks:load');
    document.dispatchEvent(turbolinksLoad);
    setTimeout(() => {
      validateComponentFunctionality();
    }, 0);
    reset();
    start();

    const turboDriveLoad = new CustomEvent('turbo:load');
    document.dispatchEvent(turboDriveLoad);
    setTimeout(() => {
      validateComponentFunctionality();
      done();
    }, 0);
  });
});