import { JSX } from "solid-js";

/** Date value used by all Empoleon components, format: `YYYY-MM-DD` */
export type DateStringValue = string;

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CalendarLevel = 'month' | 'year' | 'decade';

export interface ControlKeydownPayload {
  cellIndex: number;
  rowIndex: number;
  date: DateStringValue;
}

export type DateLabelFormat = string | ((date: DateStringValue) => JSX.Element);
