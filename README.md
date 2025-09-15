# Atomic React

> **Write once, compose anywhere.** True component reusability through atomic design.

## The Problem

React lacks built-in support for type-safe dependency injection and factory patterns. This forces developers into prop drilling, context complexity, or tightly coupled components where UI, state, and business logic become entangled. The result: "Whack-A-Mole" states where one change breaks another feature.

## Why Atomic?

Atomic React solves this through type-safe dependency injection and factory patterns for React components:

- ✅ **Type-Safe DI** - Inject state and business logic with full TypeScript support
- ✅ **Factory Pattern** - Create reusable component factories with isolated dependencies
- ✅ **Zero Coupling** - UI, state, and business logic completely separated
- ✅ **No Prop Drilling** - Dependencies injected directly into components

## How It Works

Factory pattern with dependency injection across three layers:

1. **UI** - Pure components receive dependencies as props
2. **State** - Independent Zustand stores injected into each "atom"; all other atoms can access the Zustand stores
3. **Business** - Functions and services injected

## Installation

```bash
npm install atomic-react zustand
```

## Examples

### `atomic({ state, stateActions, functions, component })`

```tsx
interface SearchState {
  searchTerm: string;
}

interface SearchActions {
  setSearchTerm: (term: string) => void;
  clear: () => void;
}

interface SearchFunctions {
  validateSearchTerm: (term: string) => boolean;
  formatSearchTerm: (term: string) => string;
}

const searchFunctions: SearchFunctions = {
  validateSearchTerm: (term: string) => term.length > 0,
  formatSearchTerm: (term: string) => term.trim(),
};

export type SearchComponentProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  validateSearchTerm: (searchTerm: string) => boolean;
  formatSearchTerm: (searchTerm: string) => string;
};

export function SearchComponent({
  searchTerm,
  setSearchTerm,
  validateSearchTerm,
  formatSearchTerm,
}: SearchComponentProps) {
  useEffect(() => {
    if (searchTerm && validateSearchTerm(searchTerm)) {
      console.log('searchTerm', searchTerm);
    }
  }, [searchTerm, validateSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSearchTerm(e.target.value);
    setSearchTerm(formatted);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
}

const SearchAtom = atomic<SearchState, SearchFunctions, SearchActions>({
  state: {
    searchTerm: '',
  },
  stateActions: (set, _, functions) => ({
    setSearchTerm: (term: string) => {
      if (functions.validateSearchTerm(term)) {
        set({ searchTerm: term });
      }
    },
    clear: () => {
      set({ searchTerm: '' });
    },
  }),
  functions: searchFunctions,
  component: SearchComponent,
});
```

Returns: `{ useStore, Atomic, select }`

### `createSelector(useStore, selector)`

```tsx
const useSearchTerm = createSelector(
  SearchAtom.useStore,
  (state) => state.searchTerm,
);
```

### `SearchAtom.select(selector)`

```tsx
const useSearchTerm = SearchAtom.select((state) => state.searchTerm);
```

## License

MIT © Manuel Coca
