import { JSX, splitProps } from 'solid-js';

export function StarIcon(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
  const [local, others] = splitProps(props, ['width', 'height', 'style']);

  const mergedStyle =
    typeof local.style === 'object'
      ? { width: local.width, height: local.height, ...local.style }
      : { width: local.width, height: local.height };

  return (
    <svg
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={mergedStyle as JSX.CSSProperties}
      {...others}
    >
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}

StarIcon.displayName = '@empoleon/core/StarIcon';
