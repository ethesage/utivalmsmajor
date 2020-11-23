FROM node:13.12.0

ARG APP_SECRET
ARG DATABASE_URL
ARG SKIP_PREFLIGHT_CHECK
ARG whiteList

ENV APP_SECRET=${APP_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
ENV SKIP_PREFLIGHT_CHECK=${SKIP_PREFLIGHT_CHECK}
ENV whiteList=${whiteList}

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]