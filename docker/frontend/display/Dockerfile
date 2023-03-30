# Use an existing docker image as a base
FROM alpine

WORKDIR /app

# Copy the application files
RUN apk update && apk add nodejs npm
COPY ../../package.json ./
# Install dependencies
RUN npm install

COPY ../../frontEnd/display ./frontEnd/display
COPY ../../shared ./shared
COPY ../../.env ./
COPY ../../tsconfig.json ./


# Start the application
CMD ["npm","run","dev_display"]

EXPOSE 3002

# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-display -f docker/frontend/display/Dockerfile ."