import { createContext, useContext } from 'solid-js';

const AvatarGroupContext = createContext<true | null>(null);
export const AvatarGroupProvider = AvatarGroupContext.Provider;

export function useAvatarGroupContext() {
  const ctx = useContext(AvatarGroupContext);
  return { withinGroup: !!ctx };
}
