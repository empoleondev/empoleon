import { JSX, Component, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useProps } from '@empoleon/core'; // Assuming these exist for SolidJS
import { upperFirst } from '@empoleon/hooks';
import { DropzoneContextValue, useDropzoneContext } from './Dropzone.context';

export interface DropzoneStatusProps {
  children: JSX.Element;
}

type DropzoneStatusComponent = Component<DropzoneStatusProps>;

function createDropzoneStatus(status: keyof DropzoneContextValue) {
  const DropzoneStatusComponent: DropzoneStatusComponent = (props) => {
    const mergedProps = useProps(`Dropzone${upperFirst(status)}`, {}, props);
    const [local, others] = splitProps(mergedProps, ['children']);

    const ctx = useDropzoneContext();

    if (ctx[status]) {
      // Check if children is a JSX element (component/function) or primitive
      if (typeof local.children === 'function') {
        // If it's a component, use Dynamic to render it with merged props
        return (
          <Dynamic
            component={local.children as Component}
            {...others}
          />
        );
      } else {
        // If it's primitive content, wrap in span with props
        return <span {...others}>{local.children}</span>;
      }
    }

    return null;
  };

  // Set display name for debugging
  (DropzoneStatusComponent as any).displayName = `@empoleon/dropzone/${upperFirst(status)}`;

  return DropzoneStatusComponent;
}

export const DropzoneAccept = createDropzoneStatus('accept');
export const DropzoneReject = createDropzoneStatus('reject');
export const DropzoneIdle = createDropzoneStatus('idle');

export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;
export type DropzoneIdleProps = DropzoneStatusProps;
