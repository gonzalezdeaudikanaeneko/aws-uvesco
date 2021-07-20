FROM node:10.16.0-alpine as intermediario1

WORKDIR /app

COPY package*.json server.js ./ 
COPY models/ ./models
COPY routes/ ./routes
COPY validation/ ./validation
COPY config/ ./config
COPY validation/ ./validation

RUN npm install

FROM node:10.16.0-alpine as intermediario2

WORKDIR /client
COPY client/ ./

RUN npm install

FROM node:10.16.0-alpine as fusion

#Para que no use root como usuario por defecto, tira el comando con un usuario especifico de node para docker


WORKDIR /
COPY --from=intermediario1 /app .
COPY --from=intermediario2 /client ./client

#FROM node:10.16.0-alpine as final

USER node 

#EXPOSE 3000
CMD [ "npm", "run", "dev" ]
