ARG NODE_VERSION=alpine3.23
ARG NGINX_VERSION=alpine3.23

FROM node:${NODE_VERSION} AS builder

WORKDIR /crypto-tracker-vue3-vite

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest AS runner

COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /crypto-tracker-vue3-vite/dist /usr/share/nginx/html/crypto-tracker-vue3-vite/dist
COPY --chown=nginx:nginx --from=builder /crypto-tracker-vue3-vite/dist/index.html /usr/share/nginx/html/index.html

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]