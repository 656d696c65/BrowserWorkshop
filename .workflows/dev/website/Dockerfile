# ==============================================================================
# Dashboard Development Dockerfile
# ==============================================================================
# Minimal Node.js container for running the dashboard dev server.
# The application source is bind-mounted from the host at runtime.
# Dependencies are installed inside the container on startup (CMD).
# ==============================================================================

ARG NODE_VERSION
ARG PNPM_VERSION

FROM node:${NODE_VERSION}-bookworm-slim

ARG PNPM_VERSION

# Install PNPM
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Set working directory (application is bind-mounted here)
WORKDIR /workspace

# node_modules is bind-mounted from the host (installed there with the host's
# pnpm). Skip pnpm's pre-run dependency check so it does not try to purge and
# reinstall the mounted modules directory (which aborts without a TTY).
ENV npm_config_verify_deps_before_run=false

# Run the Vite dev server on container start
CMD ["sh", "-c", "pnpm --config.verify-deps-before-run=false dev -- --host 0.0.0.0"]
