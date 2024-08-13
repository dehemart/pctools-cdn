FROM node:20-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY yarn.lock package*.json ./
RUN yarn install
USER node
COPY --chown=node:node ./dist/. .
COPY --chown=node:node .env .
EXPOSE 3331
CMD [ "node", "/home/node/app/index.js" ]
