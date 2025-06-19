FROM node:lts-bullseye-slim AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

ENV VITE_BACKEND_URL=/api

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html