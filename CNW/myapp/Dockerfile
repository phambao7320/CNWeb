FROM node:14.17.0-alpine

WORKDIR /workdir

COPY package*.json /workdir

RUN npm install

COPY . .

CMD ["npm", "start"]