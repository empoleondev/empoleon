import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  Highlight,
  EmpoleonColor,
  UnstyledButton,
  useProps,
} from '@empoleon/core';
import { useSpotlightContext } from './Spotlight.context';
import { spotlightActions } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightActionStylesNames =
  | 'action'
  | 'actionLabel'
  | 'actionDescription'
  | 'actionSection'
  | 'actionBody';

export interface SpotlightActionProps
  extends BoxProps,
    CompoundStylesApiProps<SpotlightActionFactory>,
    ElementProps<'button'> {
  /** Action label, pass string to use in default filter */
  label?: string;

  /** Action description, pass string to use in default filter */
  description?: string;

  /** Section displayed on the left side of the label, for example, icon */
  leftSection?: JSX.Element;

  /** Section displayed on the right side of the label, for example, hotkey */
  rightSection?: JSX.Element;

  /** Children override default action elements, if passed, label, description and sections are hidden */
  children?: JSX.Element;

  /** Determines whether left and right sections should have dimmed styles, `true` by default */
  dimmedSections?: boolean;

  /** Determines whether search query should be highlighted in action label, `false` by default */
  highlightQuery?: boolean;

  /** Key of `theme.colors` of any valid CSS color that will be used to highlight search query, `'yellow'` by default */
  highlightColor?: EmpoleonColor;

  /** Determines whether the spotlight should be closed when action is triggered, overrides `closeOnActionTrigger` prop set on `Spotlight` */
  closeSpotlightOnTrigger?: boolean;

  /** Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] */
  keywords?: string | string[];
}

export type SpotlightActionFactory = Factory<{
  props: SpotlightActionProps;
  ref: HTMLButtonElement;
  stylesNames: SpotlightActionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightActionProps> = {
  dimmedSections: true,
  highlightQuery: false,
};

export const SpotlightAction = factory<SpotlightActionFactory>(_props => {
  const props = useProps('SpotlightAction', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'classNames',
    'styles',
    'id',
    'description',
    'label',
    'leftSection',
    'rightSection',
    'children',
    'dimmedSections',
    'highlightQuery',
    'highlightColor',
    'closeSpotlightOnTrigger',
    'onClick',
    'onMouseDown',
    'keywords',
    'vars',
    'ref'
  ]);

  const ctx = useSpotlightContext();

  const stylesApi = { classNames: local.classNames, styles: local.styles };

  const labelNode =
    local.highlightQuery && typeof local.label === 'string' ? (
      <Highlight
        component="span"
        highlight={ctx.query}
        color={local.highlightColor}
        {...ctx.getStyles('actionLabel', stylesApi)}
      >
        {local.label}
      </Highlight>
    ) : (
      <span {...ctx.getStyles('actionLabel', stylesApi)}>{local.label}</span>
    );

  return (
    <UnstyledButton
      ref={local.ref}
      data-action
      {...ctx.getStyles('action', { className: local.className, style: local.style, ...stylesApi })}
      {...others}
      onMouseDown={(event) => {
        event.preventDefault();
        typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
      }}
      onClick={(event) => {
        typeof local.onClick === "function" && local.onClick?.(event);
        if (local.closeSpotlightOnTrigger ?? ctx.closeOnActionTrigger) {
          spotlightActions.close(ctx.store);
        }
      }}
      tabIndex={-1}
    >
      {local.children || (
        <>
          {local.leftSection && (
            <Box
              component="span"
              mod={{ position: 'left', dimmed: local.dimmedSections }}
              {...ctx.getStyles('actionSection', stylesApi)}
            >
              {local.leftSection}
            </Box>
          )}

          <span {...ctx.getStyles('actionBody', stylesApi)}>
            {labelNode}
            <span {...ctx.getStyles('actionDescription', stylesApi)}>{local.description}</span>
          </span>

          {local.rightSection && (
            <Box
              component="span"
              mod={{ position: 'right', dimmed: local.dimmedSections }}
              {...ctx.getStyles('actionSection', stylesApi)}
            >
              {local.rightSection}
            </Box>
          )}
        </>
      )}
    </UnstyledButton>
  );
});

SpotlightAction.classes = classes;
SpotlightAction.displayName = '@empoleon/spotlight/SpotlightAction';
