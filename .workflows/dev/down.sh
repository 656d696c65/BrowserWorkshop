#!/usr/bin/env bash
# ==============================================================================
# dev-down helper — called by `just dev down`
# Stops and removes all dev containers + Docker Compose services.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/compose.yml"
PROJECT="browserworkshop-website"

docker ps -a --filter="name=browserworkshop-" -q | xargs -r docker rm -f
docker compose \
    --project-directory="$SCRIPT_DIR" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    down
