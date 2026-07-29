#!/usr/bin/env bash
# ==============================================================================
# check — build + lint the project in CI (PR build check).
#
# Usage:
#   .workflows/build/check.sh
#
# Exits non-zero on any failure.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "=============================================="
echo "  browserworkshop — PR build check"
echo "=============================================="

cd "$REPO_ROOT"

# ---------------------------------------------------------------------------
# Bootstrap: ensure Node.js and pnpm
# ---------------------------------------------------------------------------
if ! command -v node &>/dev/null; then
    echo "Error: Node.js is required" >&2
    exit 1
fi

if ! command -v pnpm &>/dev/null; then
    echo "  Installing pnpm@10.12.1..."
    npm install -g "pnpm@10.12.1"
fi

if [[ ! -d "node_modules" ]]; then
    echo "  Installing dependencies..."
    pnpm install --frozen-lockfile
fi

# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------
echo "  Building..."
pnpm build

echo "  Linting..."
pnpm lint
