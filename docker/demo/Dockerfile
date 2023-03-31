# Use an existing docker image as a base
FROM alpine

WORKDIR /app

# Copy the application files
RUN apk update && apk add nodejs npm
COPY ../../package.json ./
# Install dependencies
RUN npm install

COPY ../../frontEnd/client ./frontEnd/client
COPY ../../frontEnd/display ./frontEnd/dispaly
COPY ../../shared ./shared
COPY ../../server ./server
COPY ../../.env ./
COPY ../../tsconfig.json ./


# Start the application
CMD ["npm","run","dev"]


EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 8080


# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-demo -f docker/demo/Dockerfile ."