FROM node:carbon
WORKDIR /usr/KonataBot
COPY package.json yarn.lock my_app/
RUN yarn install
COPY . .
RUN ["node", "src/Konata.js"]
