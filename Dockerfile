FROM node:14.10.1
WORKDIR KonataBot
COPY package.json *
COPY . .
RUN npm install
RUN ["node", "src/Konata.js"]
