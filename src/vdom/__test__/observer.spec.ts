import observer from '../observer';
import patch from '../patch';

describe('.observer', () => {
  it('should create an observed proxy', () => {
    const view = observer({ test: 1 }, patch);

    expect({ ...view }).toEqual({
      ...new Proxy(
        { test: 1 },
        {
          get(target: Record<string, unknown>, key: string): unknown {
            return target[key];
          },
          set(target: Record<string, unknown>, key: string, value: unknown): boolean {
            target[key] = value;
            return true;
          },
          deleteProperty(target: Record<string, unknown>, key: string): boolean {
            delete target[key];
            return true;
          },
        }
      ),
    });
  });
});
