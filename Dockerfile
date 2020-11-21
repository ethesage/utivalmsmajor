FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_SECRET=${APP_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
ENV SKIP_PREFLIGHT_CHECK=${SKIP_PREFLIGHT_CHECK}
ENV whiteList=${whiteList}

RUN npm run build

CMD [ "npm", "start" ]