import { FactoryPayload } from '../../factory';
import { useEmpoleonTheme } from '../../EmpoleonProvider';
import { ClassNames, Styles } from '../styles-api.types';
import { resolveClassNames } from '../use-styles/get-class-name/resolve-class-names/resolve-class-names';
import { resolveStyles } from '../use-styles/get-style/resolve-styles/resolve-styles';

export interface UseResolvedStylesApiInput<Payload extends FactoryPayload> {
  classNames: ClassNames<Payload> | undefined;
  styles: Styles<Payload> | undefined;
  props: Record<string, any>;
  stylesCtx?: Record<string, any>;
}

export function useResolvedStylesApi<Payload extends FactoryPayload>(_props: UseResolvedStylesApiInput<Payload>) {
  const theme = useEmpoleonTheme();

  return {
    resolvedClassNames: resolveClassNames({
      theme,
      classNames: _props.classNames,
      props: _props.props,
      stylesCtx: _props.stylesCtx || undefined,
    }),

    resolvedStyles: resolveStyles({
      theme,
      styles: _props.styles,
      props: _props.props,
      stylesCtx: _props.stylesCtx || undefined,
    }),
  };
}
