FROM node:alpine

WORKDIR /usr/src/client

COPY package.json /usr/src/client

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]