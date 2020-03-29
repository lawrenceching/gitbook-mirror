FROM node:slim

ADD yarn.lock /yarn.lock
ADD package.json /package.json

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# Copying source files
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn

EXPOSE 7001

# Running the app
CMD [ "yarn", "start-frontground" ]
