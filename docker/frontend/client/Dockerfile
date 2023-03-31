# Use an existing docker image as a base
FROM alpine

WORKDIR /app

# Copy the application files
RUN apk update && apk add nodejs npm
COPY ../../package.json ./
# Install dependencies
RUN npm install

COPY ../../frontEnd/client ./frontEnd/client
COPY ../../shared ./shared
COPY ../../.env ./
COPY ../../tsconfig.json ./


# Start the application
CMD ["npm","run","dev_client"]

EXPOSE 3001

# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-client -f docker/frontend/client/Dockerfile ."