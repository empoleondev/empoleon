import { CssVariable } from '../../Box';
import { EmpoleonTheme } from '../../EmpoleonProvider';
import { FactoryPayload } from '../../factory';

export type TransformVars<V> = {
  [Key in keyof V]: V[Key] extends CssVariable ? Record<V[Key], string | undefined> : never;
};

export type PartialTransformVars<V> = {
  [Key in keyof V]: V[Key] extends CssVariable
    ? Partial<Record<V[Key], string | undefined>>
    : never;
};

export type VarsResolver<Payload extends FactoryPayload> = (
  theme: EmpoleonTheme,
  props: Payload['props'],
  ctx: Payload['ctx']
) => TransformVars<Payload['vars']>;

export type PartialVarsResolver<Payload extends FactoryPayload> = (
  theme: EmpoleonTheme,
  props: Payload['props'],
  ctx: Payload['ctx']
) => PartialTransformVars<Payload['vars']>;

export function createVarsResolver<Payload extends FactoryPayload>(
  resolver: VarsResolver<Payload>
) {
  return resolver;
}
