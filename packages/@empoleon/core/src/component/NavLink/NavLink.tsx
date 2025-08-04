import { JSX, splitProps } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getSpacing,
  EmpoleonColor,
  EmpoleonSpacing,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { AccordionChevron } from '../Accordion';
import { Collapse } from '../Collapse';
import { UnstyledButton } from '../UnstyledButton';
import classes from './NavLink.module.css';

export type NavLinkStylesNames =
  | 'root'
  | 'section'
  | 'body'
  | 'label'
  | 'description'
  | 'chevron'
  | 'collapse'
  | 'children';
export type NavLinkVariant = 'filled' | 'light' | 'subtle';
export type NavLinkCssVariables = {
  root: '--nl-color' | '--nl-bg' | '--nl-hover';
  children: '--nl-offset';
};

export interface NavLinkProps extends BoxProps, StylesApiProps<NavLinkFactory> {
  /** Main link label */
  label?: JSX.Element;

  /** Link description, displayed below the label */
  description?: JSX.Element;

  /** Section displayed on the left side of the label */
  leftSection?: JSX.Element;

  /** Section displayed on the right side of the label */
  rightSection?: JSX.Element;

  /** Determines whether the link should have active styles, `false` by default */
  active?: boolean;

  /** Key of `theme.colors` of any valid CSS color to control active styles, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** If set, label and description will not wrap to the next line, `false` by default */
  noWrap?: boolean;

  /** Child `NavLink` components */
  children?: JSX.Element;

  /** Controlled nested items collapse state */
  opened?: boolean;

  /** Uncontrolled nested items collapse initial state */
  defaultOpened?: boolean;

  /** Called when open state changes */
  onChange?: (opened: boolean) => void;

  /** If set, right section will not be rotated when collapse is opened, `false` by default */
  disableRightSectionRotation?: boolean;

  /** Key of `theme.spacing` or any valid CSS value to set collapsed links `padding-left`, `'lg'` by default */
  childrenOffset?: EmpoleonSpacing;

  /** If set, disabled styles will be added to the root element, `false` by default */
  disabled?: boolean;

  /** Called when the link is clicked */
  onClick?: (event: MouseEvent) => void;

  /** Link `onkeydown` event */
  onKeyDown?: (event: KeyboardEvent) => void;

  /** Determines whether button text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type NavLinkFactory = PolymorphicFactory<{
  props: NavLinkProps;
  defaultRef: HTMLAnchorElement;
  defaultComponent: 'a';
  stylesNames: NavLinkStylesNames;
  vars: NavLinkCssVariables;
  variant: NavLinkVariant;
}>;

const defaultProps: Partial<NavLinkProps> = {};

const varsResolver = createVarsResolver<NavLinkFactory>(
  (theme, { variant, color, childrenOffset, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || 'light',
      autoContrast,
    });

    return {
      root: {
        '--nl-bg': color || variant ? colors.background : undefined,
        '--nl-hover': color || variant ? colors.hover : undefined,
        '--nl-color': color || variant ? colors.color : undefined,
      },

      children: {
        '--nl-offset': getSpacing(childrenOffset),
      },
    };
  }
);

export const NavLink = polymorphicFactory<NavLinkFactory>(_props => {
  const props = useProps('NavLink', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'opened',
    'defaultOpened',
    'onChange',
    'children',
    'onClick',
    'active',
    'disabled',
    'leftSection',
    'rightSection',
    'label',
    'description',
    'disableRightSectionRotation',
    'noWrap',
    'childrenOffset',
    'onKeyDown',
    'autoContrast',
    'mod',
    'ref',
  ]);

  const getStyles = useStyles<NavLinkFactory>({
    name: 'NavLink',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const [_opened, setOpened] = useUncontrolled({
    value: () => local.opened,
    defaultValue: local.defaultOpened!,
    finalValue: false,
    onChange: local.onChange,
  });

  const withChildren = !!local.children;

  const handleClick = (event: MouseEvent) => {
    local.onClick?.(event);

    if (withChildren) {
      event.preventDefault();
      setOpened(!_opened());
    }
  };

  return (
    <>
      <UnstyledButton
        {...getStyles('root')}
        component="a"
        ref={local.ref}
        onClick={handleClick}
        onKeyDown={(event) => {
          local.onKeyDown?.(event);

          if (event.code === 'Space' && withChildren) {
            event.preventDefault();
            setOpened(!_opened());
          }
        }}
        unstyled={local.unstyled}
        mod={[{ disabled: local.disabled, active: local.active, expanded: _opened() }, local.mod]}
        {...others}
      >
        {local.leftSection && (
          <Box component="span" {...getStyles('section')} mod={{ position: 'left' }}>
            {local.leftSection}
          </Box>
        )}
        <Box {...getStyles('body')} mod={{ 'no-wrap': local.noWrap }}>
          <Box component="span" {...getStyles('label')}>
            {local.label}
          </Box>
          <Box component="span" mod={{ active: local.active }} {...getStyles('description')}>
            {local.description}
          </Box>
        </Box>
        {(withChildren || local.rightSection) && (
          <Box
            {...getStyles('section')}
            component="span"
            mod={{ rotate: _opened() && !local.disableRightSectionRotation, position: 'right' }}
          >
            {withChildren
              ? local.rightSection || <AccordionChevron {...getStyles('chevron')} />
              : local.rightSection}
          </Box>
        )}
      </UnstyledButton>
      {withChildren && (
        <Collapse in={_opened()} {...getStyles('collapse')}>
          <div {...getStyles('children')}>{local.children}</div>
        </Collapse>
      )}
    </>
  );
});

NavLink.classes = classes;
NavLink.displayName = '@empoleon/core/NavLink';
