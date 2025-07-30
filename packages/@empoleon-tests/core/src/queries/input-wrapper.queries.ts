export const inputWrapperQueries = {
  getLabel: (container: HTMLElement) => container.querySelector('.empoleon-InputWrapper-label')!,
  getError: (container: HTMLElement) => container.querySelector('.empoleon-InputWrapper-error')!,
  getRequired: (container: HTMLElement) =>
    container.querySelector('.empoleon-InputWrapper-required')!,
  getDescription: (container: HTMLElement) =>
    container.querySelector('.empoleon-InputWrapper-description')!,
};
