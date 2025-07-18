import { TimeValue } from './TimeValue';

export default { title: 'TimeValue' };

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TimeValue value="12:30" withSeconds />
    </div>
  );
}
