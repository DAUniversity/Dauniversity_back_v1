FROM node:17.9.0-slim

COPY package.json .

RUN npm i

RUN npm install -g typescript
RUN npm install -g ts-node

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
