FROM node:12.22.8-alpine As base
ARG NEXT_PUBLIC_APP_ENV=development
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV NODE_ENV=development
LABEL maintainer="Moses Idowu <lakeside763@gmail.com>"


FROM base AS build
WORKDIR /www
COPY ./package.json ./yarn.lock ./
RUN yarn install

FROM base
WORKDIR /www
COPY --from=build /www/node_modules ./node_modules
COPY . .
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]


