FROM node:14.9.0
WORKDIR KonataBot
COPY package.json *
COPY . .
RUN npm install
RUN ["node", "src/Konata.js"]
