FROM node:14.9.0
WORKDIR /usr/KonataBot
COPY package.json *
RUN npm install
COPY . .
RUN ["node", "src/Konata.js"]