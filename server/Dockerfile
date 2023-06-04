FROM node:18.16.0-alpine as builder
EXPOSE 80
EXPOSE 43
WORKDIR /app
COPY ./ ./
RUN npm install
CMD [ "npm" , "run", "dev"]