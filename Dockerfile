FROM node:10 AS build

# Create app directory
WORKDIR /usr/src/app

# Copy App source over to docker
COPY . .

# install dependencies and build
RUN npm ci --only=production
RUN npm run build

# Serve using nginx
FROM nginx:1.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
