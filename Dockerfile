FROM node:current-alpine

WORKDIR /app

RUN apk add --no-cache alpine-sdk python3 python3-dev py3-pip
RUN npm install -g node-gyp

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "serve" ]
