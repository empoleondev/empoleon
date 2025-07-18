import { createEffect, createMemo, createSignal, Index, JSX, splitProps } from 'solid-js';
import { clamp, useId, useMergedRef, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonSize,
  StylesApiProps,
  useDirection,
  useProps,
  useStyles,
} from '../../core';
import { RatingProvider } from './Rating.context';
import { RatingItem } from './RatingItem/RatingItem';
import classes from './Rating.module.css';

function roundValueTo(value: number, to: number) {
  const rounded = Math.round(value / to) * to;
  const precision = `${to}`.split('.')[1]?.length || 0;
  return Number(rounded.toFixed(precision));
}

export type RatingStylesNames =
  | 'root'
  | 'starSymbol'
  | 'input'
  | 'label'
  | 'symbolBody'
  | 'symbolGroup';

export type RatingCssVariables = {
  root: '--rating-size' | '--rating-color';
};

export interface RatingProps
  extends BoxProps,
    StylesApiProps<RatingFactory>,
    ElementProps<'div', 'onChange'> {
  /** Default value for uncontrolled component */
  defaultValue?: number;

  /** Value for controlled component */
  value?: number;

  /** Called when value changes */
  onChange?: (value: number) => void;

  /** Icon displayed when the symbol is empty */
  emptySymbol?: JSX.Element | ((value: number) => JSX.Element);

  /** Icon displayed when the symbol is full */
  fullSymbol?: JSX.Element | ((value: number) => JSX.Element);

  /** Number of fractions each item can be divided into, `1` by default */
  fractions?: number;

  /** Controls component size, `'sm'` by default */
  size?: EmpoleonSize | number | (string & {});

  /** Number of controls, `5` by default */
  count?: number;

  /** Called when one of the controls is hovered */
  onHover?: (value: number) => void;

  /** A function to assign `aria-label` of the the control at index given in the argument. If not specified, control index is used as `aria-label`. */
  getSymbolLabel?: (index: number) => string;

  /** `name` attribute passed down to all inputs. By default, `name` is generated randomly. */
  name?: string;

  /** If set, the user cannot interact with the component, `false` by default */
  readOnly?: boolean;

  /** If set, only the selected symbol changes to full symbol when selected, `false` by default */
  highlightSelectedOnly?: boolean;

  /** Key of `theme.colors` or any CSS color value, `'yellow'` by default */
  color?: EmpoleonColor;
}

export type RatingFactory = Factory<{
  props: RatingProps;
  ref: HTMLDivElement;
  stylesNames: RatingStylesNames;
  vars: RatingCssVariables;
}>;

const defaultProps: Partial<RatingProps> = {
  size: 'sm',
  getSymbolLabel: (value) => `${value}`,
  count: 5,
  fractions: 1,
  color: 'yellow',
};

const varsResolver = createVarsResolver<RatingFactory>((theme, { size, color }) => ({
  root: {
    '--rating-size': getSize(size, 'rating-size'),
    '--rating-color': getThemeColor(color, theme),
  },
}));

export const Rating = factory<RatingFactory>(_props => {
  const props = useProps('Rating', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'name',
    'id',
    'value',
    'defaultValue',
    'onChange',
    'fractions',
    'count',
    'onMouseEnter',
    'readOnly',
    'onMouseMove',
    'onHover',
    'onMouseLeave',
    'onTouchStart',
    'onTouchEnd',
    'size',
    'variant',
    'getSymbolLabel',
    'color',
    'emptySymbol',
    'fullSymbol',
    'highlightSelectedOnly',
    'ref'
  ]);

  const getStyles = useStyles<RatingFactory>({
    name: 'Rating',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const { dir } = useDirection();

  const _name = useId(local.name);
  const _id = useId(local.id);
  const [rootRef, setRootRef] = createSignal<HTMLDivElement>();

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue ?? 0,
    finalValue: 0,
    onChange: local.onChange,
  });

  const [hovered, setHovered] = createSignal(-1);
  const [isOutside, setOutside] = createSignal(true);

  const _fractions = Math.floor(local.fractions!);
  const _count = Math.floor(local.count!);

  const decimalUnit = 1 / _fractions;
  const stableValueRounded = createMemo(() =>
    roundValueTo(_value(), decimalUnit)
  );
  const finalValue = createMemo(() =>
    hovered() !== -1 ? hovered() : stableValueRounded()
  );

  const getRatingFromCoordinates = (x: number) => {
    const { left, right, width } = rootRef()!.getBoundingClientRect();

    const symbolWidth = width / _count;

    const hoverPosition = dir === 'rtl' ? right - x : x - left;
    const hoverValue = hoverPosition / symbolWidth;

    return clamp(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
  };

  const handleMouseEnter = (event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    typeof local.onMouseEnter === "function" && local.onMouseEnter?.(event);
    !local.readOnly && setOutside(false);
  };

  const handleMouseMove = (event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    typeof local.onMouseMove === "function" && local.onMouseMove?.(event);

    if (local.readOnly) {
      return;
    }

    const rounded = getRatingFromCoordinates(event.clientX);

    setHovered(rounded);
    rounded !== hovered() && local.onHover?.(rounded);
  };

  const handleMouseLeave = (event: MouseEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    typeof local.onMouseLeave === "function" && local.onMouseLeave?.(event);

    if (local.readOnly) {
      return;
    }

    setHovered(-1);
    setOutside(true);
    hovered() !== -1 && local.onHover?.(-1);
  };

  const handleTouchStart = (event: TouchEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    const { touches } = event;
    if (touches.length !== 1) {
      return;
    }

    if (!local.readOnly) {
      const touch = touches[0];
      setValue(getRatingFromCoordinates(touch.clientX));
    }

    typeof local.onTouchStart === "function" && local.onTouchStart?.(event);
  };

  const handleTouchEnd = (event: TouchEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    event.preventDefault();

    typeof local.onTouchEnd === "function" && local.onTouchEnd?.(event);
  };

  const handleItemBlur = () => isOutside() && setHovered(-1);

  const handleInputChange = (event: Event | number) => {
    if (!local.readOnly) {
      if (typeof event === 'number') {
        setHovered(event);
      } else {
        setHovered(parseFloat((event.target as HTMLInputElement).value));
      }
    }
  };

  const handleChange = (event: Event | number) => {
    if (!local.readOnly) {
      if (typeof event === 'number') {
        setValue(event);
      } else {
        setValue(parseFloat((event.target as HTMLInputElement).value));
      }
    }
  };

  return (
    <RatingProvider value={{ getStyles }}>
      <Box
        ref={useMergedRef(local.ref, setRootRef)}
        {...getStyles('root')}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        variant={local.variant}
        size={local.size}
        id={_id}
        {...others}
      >
        <Index each={Array(_count).fill(0)}>
          {(_, index) => {
            const integerValue = index + 1;
            const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions));
            const isGroupActive = createMemo(() => !local.readOnly && Math.ceil(hovered()) === integerValue);

            return (
              <div
                data-active={isGroupActive() ? true : undefined}
                {...getStyles('symbolGroup')}
              >
                <Index each={fractionItems}>
                  {(_, fractionIndex) => {
                    const fractionValue = createMemo(() => decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1));
                    const symbolValue = createMemo(() => roundValueTo(integerValue - 1 + fractionValue(), decimalUnit));

                    return (
                      <RatingItem
                        getSymbolLabel={local.getSymbolLabel}
                        emptyIcon={local.emptySymbol}
                        fullIcon={local.fullSymbol}
                        full={
                          local.highlightSelectedOnly ? symbolValue() === finalValue() : symbolValue() <= finalValue()
                        }
                        active={symbolValue() === finalValue()}
                        checked={symbolValue() === stableValueRounded()}
                        readOnly={local.readOnly}
                        fractionValue={fractionValue()}
                        value={symbolValue()}
                        name={_name}
                        onChange={handleChange}
                        onBlur={handleItemBlur}
                        onInputChange={handleInputChange}
                        id={`${_id}-${index}-${fractionIndex}`}
                      />
                    )
                  }}
                </Index>
              </div>
            )
          }}
        </Index>
      </Box>
    </RatingProvider>
  );
});

Rating.classes = classes;
Rating.displayName = '@empoleon/core/Rating';
