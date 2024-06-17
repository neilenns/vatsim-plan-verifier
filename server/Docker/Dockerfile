# Use a Node.js base image with a specific version
FROM node:20.13.1-alpine3.18 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ./package.json ./
COPY ./package-lock.json ./

# Install app dependencies
RUN npm ci

# Copy the source code to the working directory
COPY ./tsconfig.json ./
COPY ./src ./src

# Build the TypeScript app
RUN npm run build

# Use a lightweight base image
FROM node:18-alpine

# Install curl for the healthcheck
RUN apk --no-cache add curl

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built distribution files from the previous build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port on which your Express.js app listens
EXPOSE 4001

# Pull the version from the github build environment
ARG VERSION
ENV VERSION=${VERSION:-dev}
RUN echo $VERSION

# Create the default cache folder
RUN mkdir /cache

# Set the entrypoint file
CMD ["node", "dist/main.mjs"]