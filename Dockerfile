FROM mhart/alpine-node:latest

WORKDIR /usr/src/buckless-manager

EXPOSE 8083

CMD ["npm", "run", "start"]

RUN apk update && \
    apk add --no-cache git openssh make gcc g++ python && \
    mkdir -p /usr/src/buckless-manager

COPY package.json /usr/src/buckless-manager/

RUN npm install

COPY . /usr/src/buckless-manager/

RUN npm run build
