import { TimeInput } from './TimeInput';

export default { title: 'TimeInput' };

export function Usage() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <TimeInput />
    </div>
  );
}

export function WithSeconds() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <TimeInput withSeconds />
    </div>
  );
}

export function WithMinMaxTimes() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <TimeInput minTime="10:00" maxTime="18:00" />
    </div>
  );
}
