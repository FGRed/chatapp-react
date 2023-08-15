#Docker file

FROM node:14.15.1 as builder
WORKDIR /app
COPY package.json .
RUN npm cache verify
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
COPY . .
EXPOSE 3000
RUN npm build
CMD ["npm", "start"]