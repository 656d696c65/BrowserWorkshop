#!/usr/bin/env bash
# ==============================================================================
# package — bootstrap, build, package, and optionally deploy the website
#            to OVH via FTPS.
#
# Usage:
#   .workflows/build/package.sh             # build + package only
#   .workflows/build/package.sh --upload    # build + package + upload
#
# Output: dist/browserworkshop-{VERSION}.tar.gz
#
# When run from a GitHub Action, set FTP_PASSWORD as a repo secret.
# Locally, with --upload, the script prompts for the password.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
VERSION="$(cat "$REPO_ROOT/VERSION" 2>/dev/null || echo "0.0.0")"
OUT_DIR="$REPO_ROOT/dist"

FTP_HOST="ftp.cluster129.hosting.ovh.net"
FTP_USER="browseh"
FTP_PORT="21"

echo "=============================================="
echo "  browserworkshop v$VERSION — $0"
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

echo "  Installing dependencies..."
if [[ -f "pnpm-lock.yaml" ]]; then
    pnpm install --frozen-lockfile
else
    pnpm install --no-frozen-lockfile
fi

# ---------------------------------------------------------------------------
# Build and package
# ---------------------------------------------------------------------------
echo "  Building..."
pnpm build

# Package the static build output
mkdir -p "$OUT_DIR"
OUTPUT="$OUT_DIR/browserworkshop-$VERSION.tar.gz"
tar -czf "$OUTPUT" -C packages/website/build .

echo ""
echo "  Output: $OUTPUT"
echo "  Size:   $(du -h "$OUTPUT" | cut -f1)"

if [[ "${1:-}" != "--upload" ]]; then
    echo ""
    echo "  To also upload to OVH, re-run with:"
    echo "    .workflows/build/package.sh --upload"
    echo ""
    exit 0
fi

# ---------------------------------------------------------------------------
# Upload
# ---------------------------------------------------------------------------
echo ""
echo "=============================================="
echo "  Uploading to $FTP_HOST"
echo "=============================================="

FTP_PASSWORD="${FTP_PASSWORD:-}"
if [[ -z "$FTP_PASSWORD" ]]; then
    read -r -s -p "  FTP password for $FTP_USER: " FTP_PASSWORD
    echo ""
fi

# Install lftp if missing
if ! command -v lftp &>/dev/null; then
    echo "  Installing lftp..."
    if command -v apt-get &>/dev/null; then
        sudo apt-get update -qq && sudo apt-get install -y -qq lftp
    elif command -v brew &>/dev/null; then
        brew install lftp
    elif command -v apk &>/dev/null; then
        apk add lftp
    else
        echo "Error: cannot install lftp automatically" >&2
        exit 1
    fi
fi

echo "  Uploading files..."
lftp -c "
    set ftp:ssl-force true
    set ssl:verify-certificate no
    open -u $FTP_USER,$FTP_PASSWORD -p $FTP_PORT $FTP_HOST
    lcd $REPO_ROOT/packages/website/build
    mirror -R --delete . /
    quit
"

echo ""
echo "  Deployed to $FTP_HOST/"
echo ""
