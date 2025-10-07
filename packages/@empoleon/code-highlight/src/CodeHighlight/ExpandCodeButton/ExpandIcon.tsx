import { JSX, splitProps } from 'solid-js';

interface ExpandIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  expanded: boolean;
}

export function ExpandIcon(props: ExpandIconProps) {
  const [local, others] = splitProps(props, ['expanded', 'style']);
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
      {local.expanded ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 13v-8l-3 3m6 0l-3 -3" />
          <path d="M9 17l1 0" />
          <path d="M14 17l1 0" />
          <path d="M19 17l1 0" />
          <path d="M4 17l1 0" />
        </>
      ) : (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 11v8l3 -3m-6 0l3 3" />
          <path d="M9 7l1 0" />
          <path d="M14 7l1 0" />
          <path d="M19 7l1 0" />
          <path d="M4 7l1 0" />
        </>
      )}
    </svg>
  );
}

ExpandIcon.displayName = '@empoleon/code-highlight/ExpandIcon';
