import renderDirective from '../directives/renderDirective';
import { VNode, VNodeTypes } from './h';

// Using patch requires a wrapper parent VNode

const patch = (
  rootVNode: VNode | null,
  view: Record<string, unknown> = {},
  keys?: string[]
): void => {
  if (!rootVNode) return;
  if (!keys) keys = Object.keys(view);

  for (let node of rootVNode.children) {
    if (typeof node === 'string') continue;

    // Check if it is not a static VNode by type
    if (node.type > VNodeTypes.STATIC) {
      const { attributes, directives, sel } = node.props;
      const affectedDirectives = [];

      for (const name in directives as Record<string, unknown>) {
        const value = directives[name];
        // Iterate through affected keys and check if directive value has key
        const hasKey = keys.some((key) => value.toString().includes(key));
        // Iterate through view keys
        const hasKeyInFunction = Object.keys(view).some((key: string) => {
          // Check if function and function content, iterate through affected
          // keys and check if function content contains affected key
          return (
            typeof view[key] === 'function' &&
            (keys as string[]).some((k) =>
              (view[key] as Record<string, unknown>).toString().includes(`this.${k}`)
            )
          );
        });
        // If affected, then push to render queue
        if (hasKey || hasKeyInFunction) {
          affectedDirectives.push(name);
        }
      }

      // Switch one time patch nodes to static (l-use and l-init unaffected)
      if (node.type === VNodeTypes.NEEDS_PATCH) {
        node.type = VNodeTypes.STATIC;
      }

      for (const name of affectedDirectives) {
        const value = directives[name];
        const el = attributes.id ? document.getElementById(attributes.id) : sel;

        // Render directive
        renderDirective({
          el,
          name,
          value,
          view,
        });
      }
    }

    if (node.children.length > 0) patch(node, view, keys);
  }
};

export default patch;
