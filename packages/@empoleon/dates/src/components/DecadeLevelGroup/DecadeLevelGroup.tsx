import { createEffect, For, JSX, splitProps } from 'solid-js';
import dayjs from 'dayjs';
import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '@empoleon/core';
import { DateStringValue } from '../../types';
import { handleControlKeyDown } from '../../utils';
import { DecadeLevel, DecadeLevelSettings, DecadeLevelStylesNames } from '../DecadeLevel';
import { LevelsGroup, LevelsGroupStylesNames } from '../LevelsGroup';

export type DecadeLevelGroupStylesNames = LevelsGroupStylesNames | DecadeLevelStylesNames;

export interface DecadeLevelGroupProps
  extends BoxProps,
    Omit<StylesApiProps<DecadeLevelGroupFactory>, 'classNames' | 'styles'>,
    Omit<
      DecadeLevelSettings,
      'withPrevious' | 'withNext' | '__onControlKeyDown' | '__getControlRef'
    >,
    ElementProps<'div'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;

  /** Number of columns to display next to each other */
  numberOfColumns?: number;

  /** Displayed decade */
  decade: DateStringValue;

  /** Function that returns level control `aria-label` based on year date */
  levelControlAriaLabel?: ((decade: DateStringValue) => string) | string;
}

export type DecadeLevelGroupFactory = Factory<{
  props: DecadeLevelGroupProps;
  ref: HTMLDivElement;
  stylesNames: DecadeLevelGroupStylesNames;
}>;

const defaultProps: Partial<DecadeLevelGroupProps> = {
  numberOfColumns: 1,
};

export const DecadeLevelGroup = factory<DecadeLevelGroupFactory>(_props  => {
  const props = useProps('DecadeLevelGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    // DecadeLevel settings
    'decade',
    'locale',
    'minDate',
    'maxDate',
    'yearsListFormat',
    'getYearControlProps',
    '__onControlClick',
    '__onControlMouseEnter',
    'withCellSpacing',

    // CalendarHeader settings
    '__preventFocus',
    'nextIcon',
    'previousIcon',
    'nextLabel',
    'previousLabel',
    'onNext',
    'onPrevious',
    'nextDisabled',
    'previousDisabled',

    // Other settings
    'classNames',
    'styles',
    'unstyled',
    '__staticSelector',
    '__stopPropagation',
    'numberOfColumns',
    'levelControlAriaLabel',
    'decadeLabelFormat',
    'size',
    'vars',
    'attributes',
    'ref'
  ]);

  let controlsRef: HTMLButtonElement[][][] = [];

  return (
    <LevelsGroup
      classNames={local.classNames}
      styles={local.styles}
      __staticSelector={local.__staticSelector || 'DecadeLevelGroup'}
      ref={local.ref}
      size={local.size}
      unstyled={local.unstyled}
      attributes={local.attributes}
      {...others}
    >
      <For each={Array(local.numberOfColumns).fill(0).map((_, index) => index)}>
        {(decadeIndex) => {
          const currentDecade = () => dayjs(local.decade)
            .add(decadeIndex * 10, 'years')
            .format('YYYY-MM-DD');

          return (
            <DecadeLevel
              size={local.size}
              yearsListFormat={local.yearsListFormat}
              decade={currentDecade()}
              withNext={decadeIndex === local.numberOfColumns! - 1}
              withPrevious={decadeIndex === 0}
              decadeLabelFormat={local.decadeLabelFormat}
              __onControlClick={local.__onControlClick}
              __onControlMouseEnter={local.__onControlMouseEnter}
              __onControlKeyDown={(event, payload) =>
                handleControlKeyDown({
                  levelIndex: decadeIndex,
                  rowIndex: payload.rowIndex,
                  cellIndex: payload.cellIndex,
                  event: event,
                  controlsRef,
                })
              }
              __getControlRef={(rowIndex, cellIndex, node) => {
                if (!Array.isArray(controlsRef[decadeIndex])) {
                  controlsRef[decadeIndex] = [];
                }

                if (!Array.isArray(controlsRef[decadeIndex][rowIndex])) {
                  controlsRef[decadeIndex][rowIndex] = [];
                }

                controlsRef[decadeIndex][rowIndex][cellIndex] = node;
              }}
              levelControlAriaLabel={
                typeof local.levelControlAriaLabel === 'function'
                  ? local.levelControlAriaLabel(currentDecade())
                  : local.levelControlAriaLabel
              }
              locale={local.locale}
              minDate={local.minDate}
              maxDate={local.maxDate}
              __preventFocus={local.__preventFocus}
              __stopPropagation={local.__stopPropagation}
              nextIcon={local.nextIcon}
              previousIcon={local.previousIcon}
              nextLabel={local.nextLabel}
              previousLabel={local.previousLabel}
              onNext={local.onNext}
              onPrevious={local.onPrevious}
              nextDisabled={local.nextDisabled}
              previousDisabled={local.previousDisabled}
              getYearControlProps={local.getYearControlProps}
              __staticSelector={local.__staticSelector || 'DecadeLevelGroup'}
              classNames={local.classNames}
              styles={local.styles}
              unstyled={local.unstyled}
              withCellSpacing={local.withCellSpacing}
              attributes={local.attributes}
            />
          );
        }}
      </For>
    </LevelsGroup>
  );
});

DecadeLevelGroup.classes = { ...LevelsGroup.classes, ...DecadeLevel.classes };
DecadeLevelGroup.displayName = '@empoleon/dates/DecadeLevelGroup';
