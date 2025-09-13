import type { SelectorFunction, SelectorHook, ZustandStore } from './types.js';

export function createSelector<TState, TSelected>(
  useStore: ZustandStore<TState>,
  selector: SelectorFunction<TState, TSelected>,
): SelectorHook<TSelected> {
  return () => useStore(selector);
}
