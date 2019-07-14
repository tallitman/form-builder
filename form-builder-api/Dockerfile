FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

ENV MONGODB_URI=mongodb://mongo:27017/wix
EXPOSE 4000
CMD [ "npm", "start" ]