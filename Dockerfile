# Use official Node image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy everything from the current folder into the container
COPY . .

# Set working directory for backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Install cookie-extractor dependencies separately
WORKDIR /app/cookie-extractor
RUN npm install

# Set default working directory back to backend
WORKDIR /app/backend

# Expose the port your app runs on
EXPOSE 3000

# Start the backend server
CMD ["node", "app.js"]
