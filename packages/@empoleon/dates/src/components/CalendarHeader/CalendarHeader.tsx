import { JSX, splitProps } from 'solid-js';
import {
  AccordionChevron,
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  getSize,
  EmpoleonSize,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useStyles,
} from '@empoleon/core';
import classes from './CalendarHeader.module.css';

export type CalendarHeaderStylesNames =
  | 'calendarHeader'
  | 'calendarHeaderControl'
  | 'calendarHeaderLevel'
  | 'calendarHeaderControlIcon';
export type CalendarHeaderCssVariables = {
  calendarHeader: '--dch-control-size' | '--dch-fz';
};

export interface CalendarHeaderSettings {
  __preventFocus?: boolean;

  /** Determines whether propagation for `Escape` key should be stopped */
  __stopPropagation?: boolean;

  /** Change next icon */
  nextIcon?: JSX.Element;

  /** Change previous icon */
  previousIcon?: JSX.Element;

  /** Next button `aria-label` */
  nextLabel?: string;

  /** Previous button `aria-label` */
  previousLabel?: string;

  /** Called when the next button is clicked */
  onNext?: () => void;

  /** Called when the previous button is clicked */
  onPrevious?: () => void;

  /** Called when the level button is clicked */
  onLevelClick?: () => void;

  /** Disables next control */
  nextDisabled?: boolean;

  /** Disables previous control */
  previousDisabled?: boolean;

  /** Determines whether next level button should be enabled, `true` by default */
  hasNextLevel?: boolean;

  /** Determines whether next control should be rendered, `true` by default */
  withNext?: boolean;

  /** Determines whether previous control should be rendered, `true` by default */
  withPrevious?: boolean;

  /** Component size */
  size?: EmpoleonSize;
}

export interface CalendarHeaderProps
  extends BoxProps,
    CalendarHeaderSettings,
    StylesApiProps<CalendarHeaderFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;

  /** Label displayed between next and previous buttons */
  label: JSX.Element;

  /** Level control `aria-label` */
  levelControlAriaLabel?: string;
}

export type CalendarHeaderFactory = Factory<{
  props: CalendarHeaderProps;
  ref: HTMLDivElement;
  stylesNames: CalendarHeaderStylesNames;
  vars: CalendarHeaderCssVariables;
}>;

const defaultProps: Partial<CalendarHeaderProps> = {
  nextDisabled: false,
  previousDisabled: false,
  hasNextLevel: true,
  withNext: true,
  withPrevious: true,
};

const varsResolver = createVarsResolver<CalendarHeaderFactory>((_, { size }) => ({
  calendarHeader: {
    '--dch-control-size': getSize(size, 'dch-control-size'),
    '--dch-fz': getFontSize(size),
  },
}));

export const CalendarHeader = factory<CalendarHeaderFactory>(_props => {
  const props = useProps('CalendarHeader', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'nextIcon',
    'previousIcon',
    'nextLabel',
    'previousLabel',
    'onNext',
    'onPrevious',
    'onLevelClick',
    'label',
    'nextDisabled',
    'previousDisabled',
    'hasNextLevel',
    'levelControlAriaLabel',
    'withNext',
    'withPrevious',
    '__staticSelector',
    '__preventFocus',
    '__stopPropagation',
    'ref'
  ]);

  const getStyles = useStyles<CalendarHeaderFactory>({
    name: local.__staticSelector || 'CalendarHeader',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    rootSelector: 'calendarHeader',
  });

  const preventFocus = local.__preventFocus
    ? (event: MouseEvent) => event.preventDefault()
    : undefined;

  return (
    <Box {...getStyles('calendarHeader')} ref={local.ref} {...others}>
      {local.withPrevious && (
        <UnstyledButton
          {...getStyles('calendarHeaderControl')}
          data-direction="previous"
          aria-label={local.previousLabel}
          onClick={local.onPrevious}
          unstyled={local.unstyled}
          onMouseDown={preventFocus}
          disabled={local.previousDisabled}
          data-disabled={local.previousDisabled || undefined}
          tabIndex={local.__preventFocus || local.previousDisabled ? -1 : 0}
          data-empoleon-stop-propagation={local.__stopPropagation || undefined}
        >
          {local.previousIcon || (
            <AccordionChevron
              {...getStyles('calendarHeaderControlIcon')}
              data-direction="previous"
              size="45%"
            />
          )}
        </UnstyledButton>
      )}

      <UnstyledButton
        component={local.hasNextLevel ? 'button' : 'div'}
        {...getStyles('calendarHeaderLevel')}
        onClick={local.hasNextLevel ? local.onLevelClick : undefined}
        unstyled={local.unstyled}
        onMouseDown={local.hasNextLevel ? preventFocus : undefined}
        disabled={!local.hasNextLevel}
        data-static={!local.hasNextLevel || undefined}
        aria-label={local.levelControlAriaLabel}
        tabIndex={local.__preventFocus || !local.hasNextLevel ? -1 : 0}
        data-empoleon-stop-propagation={local.__stopPropagation || undefined}
      >
        {local.label}
      </UnstyledButton>

      {local.withNext && (
        <UnstyledButton
          {...getStyles('calendarHeaderControl')}
          data-direction="next"
          aria-label={local.nextLabel}
          onClick={local.onNext}
          unstyled={local.unstyled}
          onMouseDown={preventFocus}
          disabled={local.nextDisabled}
          data-disabled={local.nextDisabled || undefined}
          tabIndex={local.__preventFocus || local.nextDisabled ? -1 : 0}
          data-empoleon-stop-propagation={local.__stopPropagation || undefined}
        >
          {local.nextIcon || (
            <AccordionChevron
              {...getStyles('calendarHeaderControlIcon')}
              data-direction="next"
              size="45%"
            />
          )}
        </UnstyledButton>
      )}
    </Box>
  );
});

CalendarHeader.classes = classes;
CalendarHeader.displayName = '@empoleon/dates/CalendarHeader';
