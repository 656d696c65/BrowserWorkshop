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
#   - browserworkshop-website: production Docker image
#
# Usage:
#   just build image     - Build the website image tagged with VERSION
#   just build start     - Start the built image locally

build cmd:
    @just build-{{cmd}}

# Build the website production image
build-image:
    @echo "=============================================="
    @echo "  browserworkshop Website Image Build"
    @echo "=============================================="
    @echo ""
    VERSION=$(cat VERSION) \
    VITE_WEBSITE_BASE_URL=http://localhost:3001 \
    {{COMPOSE_BUILD}} --progress=plain build --no-cache browserworkshop-website
    @echo ""
    @echo "=============================================="
    @echo "  Image built: browserworkshop-website ($(cat VERSION))"
    @echo "=============================================="

# Start the built production image locally to check for startup errors
# Requires image to be built first: just build image
# Stops the dev environment first to free ports, then starts the image
build-start:
    @echo "=============================================="
    @echo "  Starting production image (version: $(cat VERSION))"
    @echo "  Press Ctrl+C to stop"
    @echo "=============================================="
    @echo ""
    -./.workflows/dev/down.sh 2>/dev/null || true
    -VERSION=$(cat VERSION) {{COMPOSE_BUILD}} down --remove-orphans 2>/dev/null || true
    VERSION=$(cat VERSION) {{COMPOSE_BUILD}} up --force-recreate --remove-orphans
