# Atomic React

> **Write once, compose anywhere.** True component reusability through atomic design.

## The Problem

In every project, we experience "Whack-A-Mole" states - one change leads to another bug or breaks another feature. This happens because UI, state, and business logic are rarely completely isolated, especially in larger projects. Existing tools and conventions don't solve this problem. It's about software design.

## Why Atomic?

Atomic React provides a design template and convention. It builds a small wrapper around function components to separate and inject state and business logic:

- ✅ **True Reusability** - Same component works everywhere
- ✅ **Zero Coupling** - UI, state, and business logic completely separated
- ✅ **No Prop Drilling** - Components access their own state

## How It Works

Three decoupled layers:

1. **UI** - Pure components (no business logic)
2. **State** - Independent Zustand stores injected into each atom; all other atoms can access the Zustand stores
3. **Business** - Inject your business logic

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
