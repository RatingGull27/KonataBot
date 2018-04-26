FROM node:8
WORKDIR /usr/KonataBot
COPY package.json yarn.lock *
RUN yarn install
COPY . .
RUN ["node", "src/Konata.js"]