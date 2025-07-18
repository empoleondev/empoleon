import { JSX } from 'solid-js';
import { AngleSlider } from './AngleSlider';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'AngleSlider',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <AngleSlider size={100} formatLabel={(value) => `${value}°`} />
    </div>
  );
}

export function WithMarks() {
  return (
    <div style={{ 'padding': '40px' }}>
      <AngleSlider
        size={100}
        formatLabel={(value) => `${value}°`}
        marks={[
          { value: 0 },
          { value: 45 },
          { value: 90 },
          { value: 135 },
          { value: 180 },
          { value: 225 },
          { value: 270 },
          { value: 315 },
        ]}
        restrictToMarks
      />
    </div>
  );
}

export function RestrictToMarks() {
  return (
    <div style={{ 'padding': '40px' }}>
      <AngleSlider
        size={100}
        formatLabel={(value) => `${value}°`}
        marks={[
          { value: 0, label: '0°' },
          { value: 45, label: '45°' },
          { value: 90, label: '90°' },
          { value: 135, label: '135°' },
          { value: 180, label: '180°' },
          { value: 225, label: '225°' },
          { value: 270, label: '270°' },
          { value: 315, label: '315°' },
        ]}
        restrictToMarks
      />
    </div>
  );
}
