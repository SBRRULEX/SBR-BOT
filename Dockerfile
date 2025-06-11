# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies from backend
WORKDIR /app/backend
RUN npm install

# Use app.js directly
CMD ["node", "app.js"]
