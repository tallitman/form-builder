FROM node:latest
WORKDIR /user/app/client
COPY . .
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start"]