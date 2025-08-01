import { JSX } from "solid-js";

interface CopyIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  copied: boolean;
}

export function CopyIcon({ copied, ...others }: CopyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...others}
    >
      {copied ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </>
      ) : (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </>
      )}
    </svg>
  );
}

CopyIcon.displayName = '@empoleon/code-highlight/CopyIcon';
