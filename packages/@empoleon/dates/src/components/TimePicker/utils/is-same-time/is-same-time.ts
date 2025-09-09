import { splitTimeString } from '../split-time-string/split-time-string';

interface IsSameTimeInput {
  time: string;
  compare: string;
  withSeconds: boolean;
}

export function isSameTime(props: IsSameTimeInput) {
  const timeParts = splitTimeString(props.time);
  const compareParts = splitTimeString(props.compare);

  if (props.withSeconds) {
    return (
      timeParts.hours === compareParts.hours &&
      timeParts.minutes === compareParts.minutes &&
      timeParts.seconds === compareParts.seconds
    );
  }

  return timeParts.hours === compareParts.hours && timeParts.minutes === compareParts.minutes;
}
