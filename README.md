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
// Business logic functions (pure, no state access)
const searchFunctions = {
  validateSearchTerm: (term) => term.length >= 2,
  formatSearchTerm: (term) => term.trim().toLowerCase(),
};

// Named function component with useEffect and API integration
function SearchInputComponent({
  searchTerm,
  setSearchTerm,
  isLoading,
  setLoading,
  validateSearchTerm,
  formatSearchTerm,
}) {
  const { data: suggestions } = useQuery({
    queryKey: ['search-suggestions', searchTerm],
    queryFn: () => fetchSearchSuggestions(searchTerm),
    enabled: validateSearchTerm(searchTerm),
  });

  useEffect(() => {
    if (searchTerm && validateSearchTerm(searchTerm)) {
      setLoading(true);
      // Simulate search delay
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, setLoading, validateSearchTerm]);

  const handleChange = (e) => {
    const formatted = formatSearchTerm(e.target.value);
    setSearchTerm(formatted);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        disabled={isLoading}
      />
      {isLoading && <span>Searching...</span>}
      {suggestions && (
        <ul>
          {suggestions.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const SearchInputAtom = atomic({
  state: {
    searchTerm: '',
    isLoading: false,
  },
  stateActions: (set, get, functions) => ({
    setSearchTerm: (term) => {
      if (functions.validateSearchTerm(term)) {
        set({ searchTerm: term });
      }
    },
    setLoading: (loading) => set({ isLoading: loading }),
  }),
  functions: searchFunctions,
  component: SearchInputComponent,
});
```

Returns: `{ useStore, Atomic, select }`

### `createSelector(useStore, selector)`

```tsx
const useSearchTerm = createSelector(
  SearchInput.useStore,
  (state) => state.searchTerm,
);
```

### `SearchInput.select(selector)`

```tsx
const useSearchTerm = SearchInput.select((state) => state.searchTerm);
```

## License

MIT © Manuel Coca
