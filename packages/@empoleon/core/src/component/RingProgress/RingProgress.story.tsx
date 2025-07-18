import { JSX } from 'solid-js';
import { RingProgress } from './RingProgress';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'RingProgress',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function ColorsIndex() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        label="Hello"
        sections={[
          {
            value: 10,
            color: 'blue.4',
          },
          {
            value: 10,
            color: 'red.1',
          },
          {
            value: 10,
            color: 'orange.9',
          },
        ]}
      />
    </div>
  );
}

export function ThicknessOverlap() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        size={60}
        thickness={22}
        sections={[
          {
            value: 10,
            color: 'blue.4',
          },
          {
            value: 40,
            color: 'red.1',
          },
          {
            value: 30,
            color: 'orange.9',
          },
        ]}
      />
    </div>
  );
}

export function WithTooltips() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        sections={[
          { value: 40, color: 'cyan', tooltip: 'Hello' },
          { value: 20, color: 'blue', tooltip: 'There' },
          { value: 15, color: 'indigo', tooltip: 'You' },
        ]}
      />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        unstyled
        sections={[
          { value: 40, color: 'cyan', tooltip: 'Hello' },
          { value: 20, color: 'blue', tooltip: 'There' },
          { value: 15, color: 'indigo', tooltip: 'You' },
        ]}
      />
    </div>
  );
}

export function WithSectionProps() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        sections={[
          { value: 40, color: 'cyan', onClick: () => console.log('1') },
          { value: 20, color: 'blue', onClick: () => console.log('2') },
          { value: 15, color: 'indigo', onClick: () => console.log('3') },
        ]}
      />
    </div>
  );
}

export function WithRootColor() {
  return (
    <div style={{ 'padding': '40px' }}>
      <RingProgress
        sections={[
          { value: 40, color: 'cyan' },
          { value: 20, color: 'blue' },
          { value: 15, color: 'indigo' },
        ]}
        rootColor="red"
      />
    </div>
  );
}
