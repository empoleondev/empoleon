export function getPropsValue<Props>(props: Props | (() => Props)): Props {
  if (typeof props === 'function' && props.length === 0) {
    try {
      return (props as () => Props)();
    } catch {
      return props as Props;
    }
  }
  return props as Props;
}
