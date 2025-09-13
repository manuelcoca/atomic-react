import { type FC, type ReactElement } from 'react';
import { type StoreApi, type UseBoundStore } from 'zustand';

export type AtomicDefinition<TState, TFunctions, TStateActions> = {
  state: TState;
  stateActions: (
    set: (partial: Partial<TState & TStateActions>) => void,
    get: () => TState & TStateActions,
    functions: TFunctions,
  ) => TStateActions;
  functions: TFunctions;
  component: (props: TState & TStateActions & TFunctions) => ReactElement;
};

export type AtomicReturn<TState, TStateActions, TFunctions> = {
  useStore: () => TState & TStateActions;
  Atomic: FC<Partial<TState & TStateActions>>;
  select: <TSelected>(
    selector: (state: (TState & TStateActions) & TFunctions) => TSelected,
  ) => () => TSelected;
};

export type SelectorFunction<TState, TSelected> = (state: TState) => TSelected;

export type SelectorHook<TSelected> = () => TSelected;

export type ZustandStore<TState> = UseBoundStore<StoreApi<TState>>;
