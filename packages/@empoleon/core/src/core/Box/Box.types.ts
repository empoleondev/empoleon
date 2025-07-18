import { JSX } from 'solid-js';
import type { EmpoleonTheme } from '../EmpoleonProvider';

export interface CSSProperties extends JSX.CSSProperties {
  [key: string]: any;
}

type EmpoleonStyle = CSSProperties | ((theme: EmpoleonTheme) => CSSProperties);
export type EmpoleonStyleProp = EmpoleonStyle | EmpoleonStyle[] | EmpoleonStyleProp[] | undefined;

export type CssVariable = `--${string}`;

export type CssVariables<Variable extends string = CssVariable> = Partial<Record<Variable, string>>;

export type CssVars<Variable extends string = CssVariable> =
  | CssVariables<Variable>
  | ((theme: EmpoleonTheme) => CssVariables<Variable>)
  | CssVars<Variable>[];

export type CssVarsProp<Variable extends string = CssVariable> =
  | CssVars<Variable>
  | CssVars<Variable>[];
