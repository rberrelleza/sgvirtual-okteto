FROM node:14

WORKDIR /usr/app/src

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
CMD ["yarn", "start"]