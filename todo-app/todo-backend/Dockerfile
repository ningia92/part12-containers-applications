FROM node:lts-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV=production

ENV DEBUG=todo-backend:*

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "./bin/www"]