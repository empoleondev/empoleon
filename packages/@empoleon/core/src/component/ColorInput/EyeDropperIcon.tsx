import { JSX } from "solid-js";

export function EyeDropperIcon({ style, ...others }: JSX.SvgSVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 'var(--ci-eye-dropper-icon-size)',
        height: 'var(--ci-eye-dropper-icon-size)',
        ...(typeof style === 'object' && style !== null ? style : {}),
      }}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...others}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 4" />
      <path d="M12 21l0 -3" />
      <path d="M3 12l4 0" />
      <path d="M21 12l-3 0" />
      <path d="M12 12l0 .01" />
    </svg>
  );
}
