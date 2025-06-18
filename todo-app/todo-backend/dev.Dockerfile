FROM node:lts-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

CMD ["npm", "run", "dev"]