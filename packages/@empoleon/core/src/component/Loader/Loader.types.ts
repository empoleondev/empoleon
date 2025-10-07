import { JSX } from 'solid-js';

export interface SvgLoaderProps extends JSX.HTMLAttributes<any> {}

export interface EmpoleonLoaderComponent {
  (props: JSX.HTMLAttributes<any> & { ref?: any }): JSX.Element;
  displayName?: string;
}

export type EmpoleonLoadersRecord = Partial<
  Record<'bars' | 'dots' | 'oval' | (string & {}), EmpoleonLoaderComponent>
>;
export type EmpoleonLoader = keyof EmpoleonLoadersRecord;
