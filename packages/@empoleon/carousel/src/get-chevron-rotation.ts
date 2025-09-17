interface Options {
  dir: 'rtl' | 'ltr';
  orientation: 'horizontal' | 'vertical' | undefined;
  direction: 'next' | 'previous';
}

export function getChevronRotation(props: Options) {
  if (props.direction === 'previous') {
    return props.orientation === 'horizontal' ? 90 * (props.dir === 'ltr' ? 1 : -1) : -180;
  }

  return props.orientation === 'horizontal' ? 90 * (props.dir === 'ltr' ? -1 : 1) : 0;
}
