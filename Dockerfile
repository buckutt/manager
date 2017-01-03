FROM mhart/alpine-node:latest

RUN apk update && \
    apk add --no-cache git openssh make gcc g++ python && \
    mkdir -p /usr/src/buckless-manager

WORKDIR /usr/src/buckless-manager

COPY . /usr/src/buckless-manager/

RUN npm install && \
    npm build

EXPOSE 8083
CMD ["npm", "run", "serve"]
