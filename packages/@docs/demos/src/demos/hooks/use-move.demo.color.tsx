import { useMove } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { useMove } from '@empoleon/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref } = useMove(setValue);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 300,
          height: 150,
          backgroundColor: 'red',
          position: 'relative',
        }}
      >
        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(90deg, #fff, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(0deg, #000, transparent)',
          }}
        />

        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            left: \`calc(\${value.x * 100}% - 8px)\`,
            top: \`calc(\${value.y * 100}% - 8px)\`,
            width: 16,
            height: 16,
            border: '2px solid #fff',
            borderRadius: 16,
          }}
        />
      </div>
    </div>
  );
}`;

function Demo() {
  const [value, setValue] = createSignal({ x: 0.2, y: 0.6 });
  const { ref } = useMove(setValue);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '150px',
          'background-color': 'red',
          position: 'relative',
        }}
      >
        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            'background-image': 'linear-gradient(90deg, #fff, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            'background-image': 'linear-gradient(0deg, #000, transparent)',
          }}
        />

        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${value().x * 100}% - 8px)`,
            top: `calc(${value().y * 100}% - 8px)`,
            width: '16px',
            height: '16px',
            border: '2px solid #fff',
            'border-radius': '16px',
          }}
        />
      </div>
    </div>
  );
}

export const useMoveColor: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
