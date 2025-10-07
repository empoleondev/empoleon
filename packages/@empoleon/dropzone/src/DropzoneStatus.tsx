import { Component, JSX, splitProps } from 'solid-js';
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
      if (typeof local.children === 'function') {
        return <Dynamic component={local.children as Component} {...others} />;
      } else {
        return <span {...others}>{local.children}</span>;
      }
    }

    return null;
  };

  (DropzoneStatusComponent as any).displayName = `@empoleon/dropzone/${upperFirst(status)}`;

  return DropzoneStatusComponent;
}

export const DropzoneAccept = createDropzoneStatus('accept');
export const DropzoneReject = createDropzoneStatus('reject');
export const DropzoneIdle = createDropzoneStatus('idle');

export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;
export type DropzoneIdleProps = DropzoneStatusProps;
