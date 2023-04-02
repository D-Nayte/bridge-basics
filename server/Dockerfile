# Use an existing docker image as a base
FROM node:alpine

WORKDIR /app

# Copy the application files
# RUN apk update && apk add nodejs npm
COPY ../../package.json ./
# Install dependencies
RUN npm install

COPY ../../server ./server
COPY ../../shared ./shared
COPY ../../.env ./
COPY ../../tsconfig.json ./


# Start the application
CMD ["npm","run","dev_server"]

EXPOSE 8080

# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-server -f server/Dockerfile ."