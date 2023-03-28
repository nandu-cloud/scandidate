# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /frontend-ui
WORKDIR /frontend-ui

# Copy the package.json and package-lock.json files to the container
COPY ./frontend-ui/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend-ui files to the container
COPY ./frontend-ui .

# Set the development server URL environment variable
ENV DEV_SERVER_URL='value'

# Set the UAT server URL environment variable
ENV UAT_SERVER_URL='value'

# Set the production server URL environment variable
ENV PROD_SERVER_URL='value'

# Expose port 3000 for the container
EXPOSE 3000

# Start the app with the "dev" command
CMD ["npm", "run-script", "dev"]

