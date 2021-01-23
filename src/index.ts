// Exports wrapped in Lucia namespace
import { DIRECTIVE_PREFIX } from './models/generics';
import component from './component';

import patch from './core/patch';
import compile from './core/compile';
import reactive from './core/reactive';
import { directives } from './core/directive';

export { component, compile, patch, reactive, directives };

export const init = (element: HTMLElement | Document = document): void => {
  const stateDirective = `${DIRECTIVE_PREFIX}state`;
  const elements = [...element.querySelectorAll(`[${stateDirective}]`)];

  elements
    // @ts-ignore
    .filter((el) => el.__l === undefined) // Filter out uninit scopes only
    .map((el) => {
      const expression = el.getAttribute(stateDirective);

      try {
        // Parse state from state expression
        const state = new Function(`return ${expression || {}}`);
        component(state()).mount(el as HTMLElement);
      } catch (err) {
        console.warn(`Lucia Error: "${err}"\n\nExpression: "${expression}"\nElement:`, el);
      }
    });
};
