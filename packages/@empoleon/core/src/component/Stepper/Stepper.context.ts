import { JSX } from 'solid-js';
import { createSafeContext, GetStylesApi } from '../../core';
import type { StepperFactory } from './Stepper';

interface StepperContextValue {
  getStyles: GetStylesApi<StepperFactory>;
  orientation: 'horizontal' | 'vertical' | undefined;
  iconPosition: 'left' | 'right' | undefined;
  registerStep: () => number;
  activeIndex: () => number;
  onStepClick?: (stepIndex: number) => void;
  allowNextStepsSelect: () => boolean;
  icon: unknown;
  completedIcon: unknown;
  progressIcon: unknown;
  color: string | undefined;
  iconSize: string | number | undefined;
  wrap: () => boolean;

  stepChildren?: () => JSX.Element[];
  registerStepContent?: (idx: number, content: JSX.Element) => void;
}

export const [StepperProvider, useStepperContext] = createSafeContext<StepperContextValue>(
  'Stepper component was not found in tree'
);
