import { createContext, createEffect, createSignal, useContext } from 'solid-js';

export type Direction = 'ltr' | 'rtl';

export interface DirectionContextValue {
  dir: Direction;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
}

const DirectionContext = createContext<DirectionContextValue>({
  dir: 'ltr',
  toggleDirection: () => {},
  setDirection: () => {},
});

export function useDirection() {
  return useContext(DirectionContext);
}

export interface DirectionProviderProps {
  /** Your application */
  children: any;

  /** Direction set as a default value, `ltr` by default */
  initialDirection?: Direction;

  /** Determines whether direction should be updated on mount based on `dir` attribute set on root element (usually html element), `true` by default  */
  detectDirection?: boolean;
}

export function DirectionProvider(props: DirectionProviderProps) {
  const initialDirection = props.initialDirection || 'ltr';
  const detectDirection = props.detectDirection || true;

  const [dir, setDir] = createSignal<Direction>(initialDirection);

  const setDirection = (direction: Direction) => {
    setDir(direction);
    document.documentElement.setAttribute('dir', direction);
  };

  const toggleDirection = () => setDirection(dir() === 'ltr' ? 'rtl' : 'ltr');

  createEffect(() => {
    if (detectDirection) {
      const direction = document.documentElement.getAttribute('dir');
      if (direction === 'rtl' || direction === 'ltr') {
        setDirection(direction as Direction);
      }
    }
  });

  const contextValue = {
    get dir() {
      return dir();
    },
    toggleDirection,
    setDirection,
  };

  return <DirectionContext.Provider value={contextValue}>{props.children}</DirectionContext.Provider>;
}
