# Base image
FROM node:12-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Expose the port
EXPOSE 4200

# Start the application
CMD ["npm", "run", "start"]

