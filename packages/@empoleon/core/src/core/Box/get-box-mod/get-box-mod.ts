function transformModKey(key: string) {
  return key.startsWith('data-') ? key : `data-${key}`;
}

export function getMod(props: Record<string, any>) {
  return Object.keys(props).reduce<Record<string, any>>((acc, key) => {
    const value = props[key];

    const resolvedValue = typeof value === 'function' ? value() : value;
    if (resolvedValue === undefined || resolvedValue === '' || resolvedValue === false || resolvedValue === null) {
      return acc;
    }

    acc[transformModKey(key)] = resolvedValue;
    return acc;
  }, {});
}

export function getBoxMod(mod?: any): Record<string, any> | null {
  if (!mod) {
    return null;
  }

  if (typeof mod === 'string') {
    return { [transformModKey(mod)]: true };
  }

  if (Array.isArray(mod)) {
    return [...mod].reduce<Record<`data-${string}`, any>>(
      (acc, value) => ({ ...acc, ...getBoxMod(value) }),
      {}
    );
  }

  return getMod(mod);
}
