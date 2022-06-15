FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

EXPOSE 3333

CMD ["yarn", "dev"]

COPY . .