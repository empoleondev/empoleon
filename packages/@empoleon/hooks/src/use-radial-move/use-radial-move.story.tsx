import { createSignal } from 'solid-js';
import { useRadialMove } from './use-radial-move';

export default { title: 'Hooks/useRadialMove' };

export function Usage() {
  const [value, setValue] = createSignal(0);
  const { ref } = useRadialMove(setValue);

  return (
    <div style={{ padding: '40px' }}>
      <div
        ref={ref}
        style={{
          width: '200px',
          height: '200px',
          'border-radius': '200px',
          background: 'pink',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '200px',
            'border-radius': '20px',
            background: 'silver',
            top: 0,
            right: 0,
            bottom: 0,
            left: 'calc(50% - 10px)',
            transform: `rotate(${value}deg)`,
          }}
        />
      </div>
    </div>
  );
}
