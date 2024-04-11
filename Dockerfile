FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install

WORKDIR /app

EXPOSE 8080
EXPOSE 3000


CMD [ "npm", "run", "dev" ]