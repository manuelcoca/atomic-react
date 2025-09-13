# Contributing to Atomic React

## Philosophy

**Atomic Design First** - Every change should maintain complete decoupling between UI, state, and business logic. Components must remain truly atomic and universally reusable.

**Keep it Simple** - The goal is making React components reusable without complexity. If a change makes the API harder to understand or breaks the atomic principles, it's not worth it.

## Build with

- ⚛️ **[React](https://react.dev/)** - UI library
- 🐻 **[Zustand](https://github.com/pmndrs/zustand)** - State management
- ⚡ **[Vite](https://vitejs.dev/)** - Frontend tooling
- 📦 **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- 🔷 **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- 📝 **[ESLint](https://eslint.org/)** - Code linting
- 💅 **[Prettier](https://prettier.io/)** - Code formatting
- 📦 **[Verdaccio](https://verdaccio.org/)** - Local package registry

## Getting Started

### Prerequisites

- Node.js v22.12.0
- pnpm v10.15.0

### Setup

```bash
git clone git@github.com:manuelcoca/atomic-react.git
cd atomic-react
pnpm install
```

### Development

Build the library:

```bash
pnpm build
```

Watch for changes during development:

```bash
pnpm dev
```

## Making Changes

### Code Style

- Use TypeScript for everything
- Keep functions small and focused
- Follow existing naming conventions

### Testing Changes

Currently we don't have automated tests, but manually test your changes by:

1. Building the library: `pnpm build`
2. Creating a simple test component
3. Verifying it works in different contexts

### Submitting Changes

1. Clone the repo directly (no forking needed)
2. Create a feature branch using our naming convention
3. Make your changes
4. Ensure code builds: `pnpm build`
5. Commit with clear messages
6. Push branch and create a PR to main

### Branching Strategy

Use these prefixes for branch names:

- `feat/` - New features (e.g., `feat/add-selector-hooks`)
- `fix/` - Bug fixes (e.g., `fix/memory-leak-in-store`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-types`)
- `test/` - Adding or updating tests (e.g., `test/atomic-component-tests`)
- `cicd/` - CI/CD improvements (e.g., `cicd/add-automated-tests`)

## What We're Looking For

### Good Contributions

- Bug fixes with clear reproduction steps
- Performance improvements
- Better TypeScript types
- Documentation improvements
- Real-world usage examples

### Not So Good

- Breaking changes without discussion
- Changes that make the API more complex

## Questions?

- Check existing issues first
- Create an issue for bugs or feature requests
- Keep discussions focused on the problem being solved

## Local Testing with Verdaccio

We use Verdaccio for local package testing:

```bash
# Start local registry
pnpm verdaccio

# Publish locally
pnpm libs:publish

# Test in another project
npm install atomic-react --registry http://localhost:4873
```

This lets you test changes before publishing to npm.
