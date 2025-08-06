#!/bin/sh

echo "🔧 Setting up Git hooks..."
HOOK_PATH=".git/hooks/pre-commit"
SCRIPT_PATH="./scripts/precommit.sh"

if [ -f "$HOOK_PATH" ]; then
  echo "⚠️ Pre-commit hook already exists. Overwriting..."
fi

cp "$SCRIPT_PATH" "$HOOK_PATH"
chmod +x "$HOOK_PATH"

echo "✅ Git pre-commit hook is set up!"
