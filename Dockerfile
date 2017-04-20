FROM node:alpine

WORKDIR /usr/src/buckless-manager

EXPOSE 8083

CMD ["yarn", "run", "start"]

RUN apk update && \
    apk add --no-cache git openssh make gcc g++ python openjdk8-jre && \
    mkdir -p /usr/src/buckless-manager

COPY package.json /usr/src/buckless-manager/
COPY yarn.lock /usr/src/buckless-manager/

RUN yarn install

COPY . /usr/src/buckless-manager/

RUN yarn run build
