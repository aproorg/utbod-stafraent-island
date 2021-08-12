# Base
FROM node:16-alpine3.14 as base

WORKDIR /code

ARG APP_PATH
COPY ${APP_PATH}/package.json ${APP_PATH}/yarn.lock .

RUN yarn install --frozen-lockfile --prod


# Builder
FROM base as builder

ARG APP_PATH
ADD ${APP_PATH}/. .

RUN yarn install --frozen-lockfile

RUN yarn build


# Runner
FROM base as runner

COPY --from=builder /code/dist /code

CMD [ "yarn", "start:prod" ]
