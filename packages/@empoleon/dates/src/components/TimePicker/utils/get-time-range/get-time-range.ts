import { secondsToTime, timeToSeconds } from '../time-to-seconds/time-to-seconds';

interface GetTimeRangeInput {
  startTime: string;
  endTime: string;
  interval: string;
}

export function getTimeRange(props: GetTimeRangeInput): string[] {
  const timeRange: string[] = [];
  const startInSeconds = timeToSeconds(props.startTime);
  const endInSeconds = timeToSeconds(props.endTime);
  const intervalInSeconds = timeToSeconds(props.interval);

  for (let current = startInSeconds; current <= endInSeconds; current += intervalInSeconds) {
    timeRange.push(secondsToTime(current).timeString);
  }

  return timeRange;
}
