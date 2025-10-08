import { useResizeObserver } from './use-resize-observer';

export default { title: 'use-resize-observer' };

export function Usage() {
  const [ref, rect] = useResizeObserver();
  return (
    <div>
      <div
        ref={ref}
        style={{
          border: '1px solid black',
          width: '80%',
          'max-height': '300px',
          display: 'flex',
          'writing-mode': 'vertical-lr',
        }}
      >
        <div
          style={{
            'border-color': 'rgba(0, 0, 255, 0.2)',
            border: '3px solid blue',
            margin: '10px',
            flex: 1,
          }}
        >
          1
        </div>
        <div
          style={{
            'border-color': 'rgba(0, 0, 255, 0.2)',
            border: '3px solid blue',
            margin: '10px',
            flex: 1,
          }}
        >
          2
        </div>
        <div
          style={{
            'border-color': 'rgba(0, 0, 255, 0.2)',
            border: '3px solid blue',
            margin: '10px',
            flex: 1,
          }}
        >
          3
        </div>
        <div
          style={{
            'border-color': 'rgba(0, 0, 255, 0.2)',
            border: '3px solid blue',
            margin: '10px',
            flex: 1,
          }}
        >
          4
        </div>
      </div>
      <div style={{ 'margin-top': '20px' }}>
        <div>Width: {rect().width}</div>
        <div>Height: {rect().height}</div>
      </div>
    </div>
  );
}
