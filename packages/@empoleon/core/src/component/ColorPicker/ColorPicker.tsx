import { useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  getSpacing,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { ColorSwatch } from '../ColorSwatch';
import { AlphaSlider } from './AlphaSlider/AlphaSlider';
import { ColorPickerProvider } from './ColorPicker.context';
import { ColorFormat, HsvaColor } from './ColorPicker.types';
import { convertHsvaTo, isColorValid, parseColor } from './converters';
import { HueSlider } from './HueSlider/HueSlider';
import { Saturation } from './Saturation/Saturation';
import { Swatches } from './Swatches/Swatches';
import classes from './ColorPicker.module.css';
import { createEffect, createSignal, splitProps } from 'solid-js';

export type ColorPickerStylesNames =
  | 'wrapper'
  | 'preview'
  | 'body'
  | 'sliders'
  | 'slider'
  | 'sliderOverlay'
  | 'thumb'
  | 'saturation'
  | 'thumb'
  | 'saturationOverlay'
  | 'thumb'
  | 'swatches'
  | 'swatch';

export type ColorPickerCssVariables = {
  wrapper:
    | '--cp-preview-size'
    | '--cp-width'
    | '--cp-body-spacing'
    | '--cp-swatch-size'
    | '--cp-thumb-size'
    | '--cp-saturation-height';
};

export interface __ColorPickerProps {
  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Called when the user stops dragging one of the sliders or changes the value with arrow keys */
  onChangeEnd?: (value: string) => void;

  /** Color format, `'hex'` by default */
  format?: ColorFormat;

  /** Determines whether the color picker should be displayed, `true` by default */
  withPicker?: boolean;

  /** An array of colors in one of the supported formats. Used to render swatches list below the color picker. */
  swatches?: string[];

  /** Number of swatches per row, `7` by default */
  swatchesPerRow?: number;

  /** Controls size of hue, alpha and saturation sliders, `'md'` by default */
  size?: EmpoleonSize | (string & {});
}

export interface ColorPickerProps
  extends BoxProps,
    __ColorPickerProps,
    StylesApiProps<ColorPickerFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
  __staticSelector?: string;

  /** Determines whether the component should take 100% width of its container, `false` by default */
  fullWidth?: boolean;

  /** Determines whether interactive elements (sliders thumbs and swatches) should be focusable, `true` by default */
  focusable?: boolean;

  /** Saturation slider `aria-label` prop */
  saturationLabel?: string;

  /** Hue slider `aria-label` prop */
  hueLabel?: string;

  /** Alpha slider `aria-label` prop */
  alphaLabel?: string;

  /** Called when one of the color swatches is clicked */
  onColorSwatchClick?: (color: string) => void;
}

export type ColorPickerFactory = Factory<{
  props: ColorPickerProps;
  ref: HTMLDivElement;
  stylesNames: ColorPickerStylesNames;
  vars: ColorPickerCssVariables;
}>;

const defaultProps: Partial<ColorPickerProps> = {
  swatchesPerRow: 7,
  withPicker: true,
  focusable: true,
  size: 'md',
  __staticSelector: 'ColorPicker',
};

const varsResolver = createVarsResolver<ColorPickerFactory>((_, { size, swatchesPerRow }) => ({
  wrapper: {
    '--cp-preview-size': getSize(size, 'cp-preview-size'),
    '--cp-width': getSize(size, 'cp-width'),
    '--cp-body-spacing': getSpacing(size),
    '--cp-swatch-size': `${100 / swatchesPerRow!}%`,
    '--cp-thumb-size': getSize(size, 'cp-thumb-size'),
    '--cp-saturation-height': getSize(size, 'cp-saturation-height'),
  },
}));

export const ColorPicker = factory<ColorPickerFactory>(_props => {
  const props = useProps('ColorPicker', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'format',
    'value',
    'defaultValue',
    'onChange',
    'onChangeEnd',
    'withPicker',
    'size',
    'saturationLabel',
    'hueLabel',
    'alphaLabel',
    'focusable',
    'swatches',
    'swatchesPerRow',
    'fullWidth',
    'onColorSwatchClick',
    '__staticSelector',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<ColorPickerFactory>({
    name: local.__staticSelector!,
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'wrapper',
    vars: local.vars,
    varsResolver,
  });

  const [formatRef, setFormatRef] = createSignal(local.format);
  let valueRef: string = '';
  let scrubTimeoutRef: number = -1;
  const [isScrubbingRef, setScrubbingRef] = createSignal(false);
  const withAlpha = local.format === 'hexa' || local.format === 'rgba' || local.format === 'hsla';

  const [_value, setValue, controlled] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: '#FFFFFF',
    onChange: local.onChange,
  });

  const [parsed, setParsed] = createSignal<HsvaColor>(parseColor(_value()));

  const startScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef);
    setScrubbingRef(true);
  };

  const stopScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef);
    scrubTimeoutRef = window.setTimeout(() => {
      setScrubbingRef(false);
    }, 200);
  };

  const handleChange = (color: Partial<HsvaColor>) => {
    setParsed((current) => {
      const next = { ...current, ...color };
      valueRef = convertHsvaTo(formatRef()!, next);
      return next;
    });

    setValue(valueRef!);
  };

  createEffect(() => {
    if (isColorValid(local.value!) && !isScrubbingRef()) {
      setParsed(parseColor(local.value!));
    }
  });

  createEffect(() => {
    setFormatRef(local.format);
    setValue(convertHsvaTo(local.format!, parsed()));
  });

  return (
    <ColorPickerProvider value={{ getStyles, unstyled: local.unstyled }}>
      <Box
        ref={local.ref}
        {...getStyles('wrapper')}
        size={local.size}
        mod={[{ 'full-width': local.fullWidth }, local.mod]}
        {...others}
      >
        {local.withPicker && (
          <>
            <Saturation
              value={parsed()}
              onChange={handleChange}
              onChangeEnd={({ s, v }) =>
                local.onChangeEnd?.(convertHsvaTo(formatRef()!, { ...parsed(), s: s!, v: v! }))
              }
              color={_value()}
              size={local.size!}
              focusable={local.focusable}
              saturationLabel={local.saturationLabel}
              onScrubStart={startScrubbing}
              onScrubEnd={stopScrubbing}
            />

            <div {...getStyles('body')}>
              <div {...getStyles('sliders')}>
                <HueSlider
                  value={parsed().h}
                  onChange={(h) => handleChange({ h })}
                  onChangeEnd={(h) =>
                    local.onChangeEnd?.(convertHsvaTo(formatRef()!, { ...parsed(), h }))
                  }
                  size={local.size}
                  focusable={local.focusable}
                  aria-label={local.hueLabel}
                  onScrubStart={startScrubbing}
                  onScrubEnd={stopScrubbing}
                />

                {withAlpha && (
                  <AlphaSlider
                    value={parsed().a}
                    onChange={(a) => handleChange({ a })}
                    onChangeEnd={(a) => {
                      local.onChangeEnd?.(convertHsvaTo(formatRef()!, { ...parsed(), a }));
                    }}
                    size={local.size}
                    color={convertHsvaTo('hex', parsed())}
                    focusable={local.focusable}
                    aria-label={local.alphaLabel}
                    onScrubStart={startScrubbing}
                    onScrubEnd={stopScrubbing}
                  />
                )}
              </div>

              {withAlpha && (
                <ColorSwatch
                  color={_value()}
                  radius="sm"
                  size="var(--cp-preview-size)"
                  {...getStyles('preview')}
                />
              )}
            </div>
          </>
        )}

        {Array.isArray(local.swatches) && (
          <Swatches
            data={local.swatches}
            swatchesPerRow={local.swatchesPerRow}
            focusable={local.focusable}
            setValue={setValue}
            onChangeEnd={(color) => {
              const convertedColor = convertHsvaTo(local.format!, parseColor(color));
              local.onColorSwatchClick?.(convertedColor);
              local.onChangeEnd?.(convertedColor);
              if (!controlled) {
                setParsed(parseColor(color));
              }
            }}
          />
        )}
      </Box>
    </ColorPickerProvider>
  );
});

ColorPicker.classes = classes;
ColorPicker.displayName = '@empoleon/core/ColorPicker';
