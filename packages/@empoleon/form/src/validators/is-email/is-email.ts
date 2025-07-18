import { JSX } from 'solid-js';
import { matches } from '../matches/matches';

export function isEmail(error?: JSX.Element) {
  return matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, error);
}
