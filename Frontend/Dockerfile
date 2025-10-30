# Stage 1: Build the React application
# Uses a robust Node base image for installing dependencies and building
FROM node:20-alpine as builder
WORKDIR /app

# Copy package files and install dependencies
# This is key for caching: if package files don't change, Docker skips this step
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build the production assets
COPY . .
# The "build" script in the frontend's package.json will compile the React app
RUN npm run build

# Stage 2: Serve the application using a lightweight Nginx image
FROM nginx:alpine
# Copy the built React application files from the builder stage into Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 - Nginx's default web port
EXPOSE 80

# Command to start Nginx (default command is sufficient)
CMD ["nginx", "-g", "daemon off;"]