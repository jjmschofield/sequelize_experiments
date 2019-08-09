FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "start" ]
