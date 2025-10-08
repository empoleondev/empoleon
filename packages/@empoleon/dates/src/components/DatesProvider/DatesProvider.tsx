import { createContext, JSX } from 'solid-js';
import { DayOfWeek } from '../../types';

export interface DatesProviderValue {
  locale: string;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
  labelSeparator: string;
  consistentWeeks: boolean;
}

export type DatesProviderSettings = Partial<DatesProviderValue>;

export const DATES_PROVIDER_DEFAULT_SETTINGS: DatesProviderValue = {
  locale: 'en',
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  labelSeparator: '–',
  consistentWeeks: false,
};

export const DatesProviderContext = createContext(DATES_PROVIDER_DEFAULT_SETTINGS);

export interface DatesProviderProps {
  settings: DatesProviderSettings;
  children?: JSX.Element;
}

export function DatesProvider(props: DatesProviderProps) {
  const contextValue = { ...DATES_PROVIDER_DEFAULT_SETTINGS, ...props.settings };

  return (
    <DatesProviderContext.Provider value={contextValue}>
      {props.children}
    </DatesProviderContext.Provider>
  );
}
