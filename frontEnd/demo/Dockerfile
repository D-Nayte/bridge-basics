# Use an existing docker image as a base
FROM alpine

WORKDIR /app

# Copy the application files
RUN apk update && apk add nodejs npm
COPY ../../package.json ./
# Install dependencies
RUN npm install

COPY ../../frontEnd/demo ./frontEnd/demo
COPY ../../shared ./shared
COPY ../../.env ./
COPY ../../tsconfig.json ./

RUN npm run build_demo


# Start the application
CMD ["npm","run","start_demo"]


EXPOSE 3003

# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-demo -f frontend/demo/Dockerfile ."