## Overview

SomeDice is a React + TypeScript dice probability calculator with a mathematical parser engine. It calculates and visualizes probability distributions for complex dice formulas.

**Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS 4, Vitest

## Architecture

- **UI Components**: `App.tsx`, `DistributionChart.tsx`, `FormulaErrorDisplay.tsx`
- **Worker Hook**: `use-distribution-worker.ts` (heavy calculations in web worker)
- **Math Engine**: `src/math/` (tokenizer → parser → AST → distribution calculator)

## Dice Formula Syntax

- **Basic**: `1d6`, `2d20`, `3d8`
- **Keep/Drop**: `4d6kh3` (keep highest 3), `4d6kl1` (keep lowest 1)
- **Arithmetic**: `1d8 + 3`, `2d6 - 1`, `1d4 * 2`, `8 / 1d4`
- **Grouping**: `(1d4 + 2) * 3`, `-1d6 + 10`

## Code Patterns

- **TypeScript**: Strict mode, explicit types, discriminated unions
- **React**: Functional components, custom hooks, controlled inputs
- **Naming**: PascalCase (components), camelCase (functions), kebab-case (files)
- **Styling**: Tailwind dark theme (slate/zinc palette)

## Adding New Dice Features

1. Update `tokenizer.ts` (recognize tokens) → `token.ts` (types)
2. Extend `parser.ts` (syntax) → `ast.ts` (AST nodes)
3. Implement `distribution.ts` (probability math)
4. Add comprehensive tests

## Key Requirements

- **Math**: Probability distributions must sum to 1.0
- **Errors**: Use `FormulaError` with character position tracking
- **Performance**: Heavy calculations in web workers
- **Tests**: Unit tests for all math functions, edge cases
- **UI**: Maintain dark theme, responsive design, loading states
