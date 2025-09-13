import { type FC } from 'react';
import { create } from 'zustand';

import type { AtomicDefinition, AtomicReturn } from './types';

export function atomic<TState, TFunctions, TStateActions>(
  definition: AtomicDefinition<TState, TFunctions, TStateActions>,
): AtomicReturn<TState, TStateActions, TFunctions> {
  const { state, stateActions, functions, component } = definition;
  type CombinedState = TState & TStateActions;

  const useStore = create<CombinedState>(
    (set, get) =>
      ({
        ...state,
        ...stateActions(set, get, functions),
      }) as CombinedState,
  );

  const Atomic: FC<Partial<CombinedState>> = (overrides = {}) => {
    const storeState = useStore();
    const allProps = {
      ...storeState,
      ...functions, // Include functions in props
      ...overrides,
    } as CombinedState & TFunctions;

    return component(allProps);
  };

  Atomic.displayName = `Atomic(${component.name || 'Component'})`;

  const select = function <TSelected>(
    selector: (state: CombinedState & TFunctions) => TSelected,
  ) {
    return (): TSelected => {
      const state = useStore();
      const stateWithFunctions = { ...state, ...functions } as CombinedState &
        TFunctions;

      return selector(stateWithFunctions);
    };
  };

  return {
    useStore,
    Atomic: Atomic as FC<Partial<CombinedState>>,
    select,
  };
}
