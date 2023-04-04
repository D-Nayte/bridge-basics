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

RUN npm run build_client


# Start the application
CMD ["npm","run","start_client"]


EXPOSE 3001

# Build commanbd from app root dir!: "docker build -t andyschunke/bridge-client -f frontend/client/Dockerfile ."