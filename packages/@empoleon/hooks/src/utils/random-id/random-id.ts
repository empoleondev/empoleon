export function randomId(prefix = 'empoleon-'): string {
  return `${prefix}${Math.random().toString(36).slice(2, 11)}`;
}
