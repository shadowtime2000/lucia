import { compile, flat } from '../compile';
import { VNode } from '../../models/vnode';
import compute from '../utils/compute';

describe('.compile', () => {
  it('should compile a VNode tree', () => {
    const vdom = compile(document.createElement('div'));

    expect(vdom).toEqual({
      tag: 'div',
      children: [],
      props: {
        attributes: {},
        directives: {},
        type: 0,
        ref: undefined,
      },
    });
  });
  it('should detect key in directives', () => {
    const fakeElem = document.createElement('div');
    fakeElem.setAttribute('l-text', 'this.foo');
    const vdom = compile(fakeElem, { foo: 'bar' });

    expect(JSON.stringify(vdom)).toEqual(
      JSON.stringify({
        tag: 'div',
        children: [],
        props: {
          attributes: {},
          directives: {
            text: { value: 'this.foo', run: compute('this.foo', { $el: fakeElem }) },
          },
          ref: fakeElem,
          type: 2,
        },
      })
    );
  });
  it('should throw an error', () => {
    // @ts-ignore
    expect(() => compile()).toThrowError(new Error('Please provide a Element'));
  });
  it('should compile with children', () => {
    const fakeElem = document.createElement('div');
    const child = document.createElement('p');
    fakeElem.appendChild(child);
    const vdom = compile(fakeElem);

    expect(vdom).toEqual({
      tag: 'div',
      children: [
        {
          tag: 'p',
          children: [],
          props: {
            attributes: {},
            directives: {},
            type: 0,
            ref: undefined,
          },
        },
      ],
      props: {
        attributes: {},
        directives: {},
        type: 0,
        ref: undefined,
      },
    });
  });
  it('should compile components', () => {
    const fakeElem = document.createElement('div');
    const child = document.createElement('customcomponent');
    child.setAttribute('l-text', '1');
    fakeElem.appendChild(child);
    const vdom = compile(fakeElem, {}, { CUSTOMCOMPONENT: () => `<p></p>` });

    const expectedRef = document.createElement('p');
    expectedRef.setAttribute('l-text', '1');

    expect(JSON.stringify(vdom)).toEqual(
      JSON.stringify({
        tag: 'div',
        children: [
          {
            tag: 'p',
            children: [],
            props: {
              attributes: {},
              directives: {
                text: { value: '1', run: compute('1', { $el: fakeElem }) },
              },
              ref: expectedRef,
              type: 1,
            },
          },
        ],
        props: {
          attributes: {},
          directives: {},
          type: 0,
          ref: undefined,
        },
      })
    );
  });
  it('should strip vdom', () => {
    const fakeElem = document.createElement('div');
    const child = document.createElement('div');
    const textNode = document.createTextNode('hello world');
    fakeElem.appendChild(child);
    child.appendChild(textNode);

    const vdom = compile(fakeElem, {}, {}) as VNode;
    const flatVDom = compile(fakeElem, {}, {}, true);

    expect(flat(vdom));
    expect(flatVDom).toEqual({
      tag: 'div',
      children: [],
      props: {
        attributes: {},
        directives: {},
        type: 0,
        ref: undefined,
      },
    });
  });
});
