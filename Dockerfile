# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install pm2 globally BEFORE switching to non-root user
RUN npm install -g pm2

# Copy files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Switch to non-root user
USER node

EXPOSE 3000

# Use pm2-runtime to keep container alive
CMD ["pm2-runtime", "src/index.js", "--name", "unma2025-backend"]
