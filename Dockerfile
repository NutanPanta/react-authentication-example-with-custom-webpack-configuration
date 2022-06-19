FROM node:17-alpine3.14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

RUN npm install yarn 

RUN yarn install

COPY . .

EXPOSE 8080

CMD sh -c "/bin/sh start.sh"
