#!/bin/sh
set -e

echo "🔍 Pre-commit: Running code quality checks..."

# Get staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# Run ESLint on staged TS/JS files
LINTABLE_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -n "$LINTABLE_FILES" ]; then
  echo "🔎 Linting with ESLint (no warnings allowed)..."
  bunx eslint --max-warnings 0 --fix $LINTABLE_FILES || {
    echo "❌ ESLint failed. Commit aborted."
    exit 1
  }
fi

# Run Prettier on staged files
PRETTIER_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx|json|css|md)$' || true)

if [ -n "$PRETTIER_FILES" ]; then
  echo "💅 Formatting with Prettier..."
  bunx prettier --write $PRETTIER_FILES
fi

# Run TypeScript type check
echo "🔐 Type-checking with TypeScript..."
bunx tsc --noEmit || {
  echo "❌ TypeScript type check failed. Commit aborted."
  exit 1
}

# Run tests (optional if you use Vitest or Jest)
echo "🧪 Running unit tests..."
bunx vitest run --passWithNoTests || {
  echo "❌ Tests failed. Commit aborted."
  exit 1
}

echo "✅ All checks passed. Proceeding with commit."
