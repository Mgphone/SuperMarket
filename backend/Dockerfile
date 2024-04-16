
FROM node:21.6.2-alpine
# FROM node:18-alpine
WORKDIR /backend
RUN npm install nodemon -g
COPY package*.json /backend/
COPY . /backend/
RUN npm install

# Expose port 5000
EXPOSE 5000

# Command to start the server using nodemon
CMD ["nodemon", "--watch", ".", "--legacy-watch", "server.js"]
# if want to want make it this in windows for nodemon CMD

