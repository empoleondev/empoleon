import { JSX } from "solid-js";

export interface EmpoleonTransitionStyles {
  common?: JSX.CSSProperties;
  in: JSX.CSSProperties;
  out: JSX.CSSProperties;
  transitionProperty: JSX.CSSProperties['transition-property'];
}

export type EmpoleonTransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'skew-up'
  | 'skew-down'
  | 'rotate-right'
  | 'rotate-left'
  | 'slide-down'
  | 'slide-up'
  | 'slide-right'
  | 'slide-left'
  | 'scale-y'
  | 'scale-x'
  | 'scale'
  | 'pop'
  | 'pop-top-left'
  | 'pop-top-right'
  | 'pop-bottom-left'
  | 'pop-bottom-right';

export type EmpoleonTransition = EmpoleonTransitionName | EmpoleonTransitionStyles;

const popIn = (from: 'top' | 'bottom') => ({
  in: { opacity: 1, transform: 'scale(1)' },
  out: { opacity: 0, transform: `scale(.9) translateY(${from === 'bottom' ? 10 : -10}px)` },
  transitionProperty: 'transform, opacity',
});

export const transitions: Record<EmpoleonTransitionName, EmpoleonTransitionStyles> = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: 'opacity',
  },

  'fade-up': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(30px)' },
    transitionProperty: 'opacity, transform',
  },

  'fade-down': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(-30px)' },
    transitionProperty: 'opacity, transform',
  },

  'fade-left': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(30px)' },
    transitionProperty: 'opacity, transform',
  },

  'fade-right': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-30px)' },
    transitionProperty: 'opacity, transform',
  },

  scale: {
    in: { opacity: 1, transform: 'scale(1)' },
    out: { opacity: 0, transform: 'scale(0)' },
    common: { 'transform-origin': 'top' },
    transitionProperty: 'transform, opacity',
  },

  'scale-y': {
    in: { opacity: 1, transform: 'scaleY(1)' },
    out: { opacity: 0, transform: 'scaleY(0)' },
    common: { 'transform-origin': 'top' },
    transitionProperty: 'transform, opacity',
  },

  'scale-x': {
    in: { opacity: 1, transform: 'scaleX(1)' },
    out: { opacity: 0, transform: 'scaleX(0)' },
    common: { 'transform-origin': 'left' },
    transitionProperty: 'transform, opacity',
  },

  'skew-up': {
    in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
    out: { opacity: 0, transform: 'translateY(-20px) skew(-10deg, -5deg)' },
    common: { 'transform-origin': 'top' },
    transitionProperty: 'transform, opacity',
  },

  'skew-down': {
    in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
    out: { opacity: 0, transform: 'translateY(20px) skew(-10deg, -5deg)' },
    common: { 'transform-origin': 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'rotate-left': {
    in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
    out: { opacity: 0, transform: 'translateY(20px) rotate(-5deg)' },
    common: { 'transform-origin': 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'rotate-right': {
    in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
    out: { opacity: 0, transform: 'translateY(20px) rotate(5deg)' },
    common: { 'transform-origin': 'top' },
    transitionProperty: 'transform, opacity',
  },

  'slide-down': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(-100%)' },
    common: { 'transform-origin': 'top' },
    transitionProperty: 'transform, opacity',
  },

  'slide-up': {
    in: { opacity: 1, transform: 'translateY(0)' },
    out: { opacity: 0, transform: 'translateY(100%)' },
    common: { 'transform-origin': 'bottom' },
    transitionProperty: 'transform, opacity',
  },

  'slide-left': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(100%)' },
    common: { 'transform-origin': 'left' },
    transitionProperty: 'transform, opacity',
  },

  'slide-right': {
    in: { opacity: 1, transform: 'translateX(0)' },
    out: { opacity: 0, transform: 'translateX(-100%)' },
    common: { 'transform-origin': 'right' },
    transitionProperty: 'transform, opacity',
  },

  pop: {
    ...popIn('bottom'),
    common: { 'transform-origin': 'center center' },
  },

  'pop-bottom-left': {
    ...popIn('bottom'),
    common: { 'transform-origin': 'bottom left' },
  },

  'pop-bottom-right': {
    ...popIn('bottom'),
    common: { 'transform-origin': 'bottom right' },
  },

  'pop-top-left': {
    ...popIn('top'),
    common: { 'transform-origin': 'top left' },
  },

  'pop-top-right': {
    ...popIn('top'),
    common: { 'transform-origin': 'top right' },
  },
};
