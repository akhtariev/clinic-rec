FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3001
CMD [ "yarn","run", "start" ]