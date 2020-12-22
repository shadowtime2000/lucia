// Exports wrapped in Lucia namespace
import { DIRECTIVE_PREFIX } from './models/generics';
import { createApp } from './App';

import h from './vdom/h';
import patch from './vdom/patch';
import compile from './vdom/compile';
import reactive from './vdom/reactive';
import { directives, renderDirective } from './vdom/directive';

export { DIRECTIVE_PREFIX, createApp, h, compile, patch, reactive, directives, renderDirective };

export const init = (element: HTMLElement | Document = document): void => {
  const directive = `${DIRECTIVE_PREFIX}state`;
  const elements = [...element.querySelectorAll(`[${directive}]`)];

  elements
    // @ts-ignore
    .filter((el) => el.__l === undefined)
    .map((el) => {
      const expression = el.getAttribute(directive);
      // @ts-ignore
      if (expression === null) return;

      try {
        const app = createApp(new Function(`return ${expression}`)());
        app.mount(el as HTMLElement);

        // @ts-ignore
        el.__l = app;
      } catch (err) {
        console.warn(`Lucia Error: "${err}"\n\nExpression: "${expression}"\nElement:`, el);
      }
    });
};

// Adapted from alpine.js
export const listen = (
  callback: Function,
  element: HTMLElement | Document = document,
  config?: Record<string, boolean>
): void => {
  const observer = new MutationObserver((mutations) => {
    mutations.map((mut) => {
      if (mut.addedNodes.length > 0) {
        mut.addedNodes.forEach((node) => {
          // Discard non-element nodes (like line-breaks)
          if (node.nodeType !== 1) return;

          // Discard any changes happening within an existing component.
          if (node.parentElement && node.parentElement.closest(`[${DIRECTIVE_PREFIX}state]`))
            return;

          callback(node.parentElement as HTMLElement);
        });
      }
    });
    observer.observe(
      element,
      config || {
        childList: true,
        attributes: true,
        subtree: true,
      }
    );
  });
};
