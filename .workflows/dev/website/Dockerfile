# ==============================================================================
# Dashboard Development Dockerfile
# ==============================================================================
# Minimal Node.js container for running the dashboard dev server.
# The application source is bind-mounted from the host at runtime.
# Dependencies are installed inside the container on startup (CMD).
# ==============================================================================

ARG NODE_VERSION="22.16.0"
ARG PNPM_VERSION="10.12.1"

FROM node:${NODE_VERSION}-bookworm-slim

ARG PNPM_VERSION

# Install PNPM
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Set working directory (application is bind-mounted here)
WORKDIR /workspace

# Install dependencies on container start
CMD ["sh", "-c", "pnpm --filter='./packages/website' dev -- --host 0.0.0.0"]
