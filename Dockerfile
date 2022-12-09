FROM node:lts-buster

WORKDIR /opt/web

COPY package.json .

RUN npm i -f

COPY . .

# RUN npm run build

EXPOSE 3000

CMD npm start
