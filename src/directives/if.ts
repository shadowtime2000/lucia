import compute from '../helpers/compute';

export const ifDirective = (
  el: HTMLElement | any,
  value: string | any,
  view: ProxyConstructor | any
) => {
  el.hidden = compute(value, view) ? false : true;
};
