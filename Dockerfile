FROM node:latest as build
WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

FROM node:14-alpine as release
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=build /usr/src/app/build /usr/src/app/build
EXPOSE 5001
ENTRYPOINT [ "serve",  "-s", "build", "-l", "5001"]