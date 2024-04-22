# FROM node:21.6.2-alpine
FROM node:18-alpine
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
# COPY . /frontend/
COPY . .
EXPOSE 5173
CMD [ "npm","run","dev" ]
