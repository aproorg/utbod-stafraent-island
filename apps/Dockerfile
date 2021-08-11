# Base
FROM node:16-alpine3.14 as base

WORKDIR /code

ARG APP_PATH
ADD ${APP_PATH}/. .

RUN yarn install --frozen-lockfile --prod


# Builder
FROM base as builder

RUN yarn install --frozen-lockfile

RUN yarn build


# Runner
FROM base as runner

COPY --from=builder /code/dist /code/dist

CMD [ "yarn", "start:prod" ]
