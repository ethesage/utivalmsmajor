FROM node:latest as build

ARG APP_SECRET
ARG DATABASE_URL
ARG SKIP_PREFLIGHT_CHECK
ARG whiteList

RUN echo "Variables => ${DATABASE_URL}"

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_SECRET=${APP_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
ENV SKIP_PREFLIGHT_CHECK=${SKIP_PREFLIGHT_CHECK}
ENV whiteList=${whiteList}

RUN npm run build

CMD [ "npm", "start" ]