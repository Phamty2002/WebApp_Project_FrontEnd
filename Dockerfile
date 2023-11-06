# Stage 1: Build the React application
FROM node:14 AS build-stage

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the build artifacts from the build stage to the Nginx directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 (for Nginx)
EXPOSE 80

# When the container starts, Nginx will start as well
CMD ["nginx", "-g", "daemon off;"]
