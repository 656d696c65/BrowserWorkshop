set shell := ["bash", "-cu"]

COMPOSE_BUILD := "docker compose -f .workflows/build/compose.yml"

dev cmd:
    @just dev-{{cmd}}

dev-up:
    ./.workflows/dev/up.sh

dev-down:
    ./.workflows/dev/down.sh

# ==============================================================================
# Build Pipeline
# ==============================================================================
# Uses the same compose file as CI (single source of truth):
#   - api/website/worker services: production Docker images
#
# Usage:
#   just build ci      - Build all production images (mirrors the publish GH Action)
#   just build images  - Build images tagged with VERSION from the VERSION file
#   just build start   - Start built images locally to check for startup errors

build cmd:
    @just build-{{cmd}}

# Build all production images — mirrors the publish GitHub Action
build-ci:
    @echo "=============================================="
    @echo "  browserworkshop Build (api + website + worker)"
    @echo "=============================================="
    @echo ""
    VERSION=$(cat VERSION) \
    VITE_API_BASE_URL=http://localhost:3000 \
    VITE_WEBSITE_BASE_URL=http://localhost:3001 \
    {{COMPOSE_BUILD}} --progress=plain build --no-cache browserworkshop-api browserworkshop-website browserworkshop-worker
    @echo ""
    @echo "=============================================="
    @echo "  Build succeeded"
    @echo "============================================="
    @echo "=============================================="
    @echo "  browserworkshop Image Build (api + website + worker)"
    @echo "=============================================="
    @echo ""
    VERSION=$(cat VERSION) \
    VITE_API_BASE_URL=http://localhost:3000 \
    VITE_WEBSITE_BASE_URL=http://localhost:3001 \
    {{COMPOSE_BUILD}} --progress=plain build --no-cache browserworkshop-api browserworkshop-website browserworkshop-worker
    @echo ""
    @echo "=============================================="
    @echo "  Images built: browserworkshop-api, browserworkshop-website, browserworkshop-worker ($(cat VERSION))"
    @echo "=============================================="

# Start built production images locally to check for startup errors
# Requires images to be built first: just build images
# Stops the dev environment first to free ports, then starts production images
build-start:
    @echo "=============================================="
    @echo "  Starting production images (version: $(cat VERSION))"
    @echo "  Press Ctrl+C to stop"
    @echo "=============================================="
    @echo ""
    -./.workflows/dev/down.sh 2>/dev/null || true
    -VERSION=$(cat VERSION) {{COMPOSE_BUILD}} down --remove-orphans 2>/dev/null || true
    VERSION=$(cat VERSION) {{COMPOSE_BUILD}} up --force-recreate --remove-orphans
