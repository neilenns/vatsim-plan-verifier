# General flow from https://www.howtogeek.com/devops/how-to-dockerise-a-react-app/.
FROM node:18-alpine AS build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copy the Docker image scripts
COPY ./Docker/docker-entrypoint.sh ./

# Copy the source code to the working directory
COPY ./tsconfig.json ./
COPY ./tsconfig.node.json ./
COPY ./vite.config.ts ./
COPY ./src ./src
COPY ./public ./
COPY ./index.html ./

RUN npm run build

# From https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
FROM nginx:alpine

# This is key, it's the location that nginx expects to find the source files
# for the website
WORKDIR /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./Docker/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN touch /etc/nginx/conf.d/ssl.conf

# Create the folder where the docker-entrypoint.sh file will live
RUN mkdir -p /usr/src/app

# Delete any default static HTML files that come with the image
RUN rm -rf ./*

# Copy the app
COPY --from=build /app/dist/ .
COPY --from=build /app/docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]