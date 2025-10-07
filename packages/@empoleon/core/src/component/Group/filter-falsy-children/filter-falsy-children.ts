import { JSX, children as solidChildren } from 'solid-js';

export function filterFalsyChildren(children: JSX.Element) {
  const resolvedChildren = solidChildren(() => children).toArray();
  return resolvedChildren.filter(Boolean);
}
