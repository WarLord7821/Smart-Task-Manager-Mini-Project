# Dockerfile (in your backend/ directory)
FROM node:20-alpine
WORKDIR /app

# Step 1: Copy ONLY package.json (as package-lock.json is missing)
COPY package.json ./ 
RUN npm install --omit=dev

# Step 2: Copy the rest of the application code
COPY . .

# Expose the port the Node.js application is listening on (5000 from .env)
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]